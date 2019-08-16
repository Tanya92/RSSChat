import {createActions, handleActions, Action} from "redux-actions";
import {State, Message, SendMessage} from './models';
import {Dispatch} from "redux";
import {connection} from "~/services/connection";
import {notifications} from "~/services/notification";

interface AddMessagesPayload {
    messages: Message[]
}

interface SetConnectedPayload {
    connected: boolean;
}

interface SetUserNamePayload {
    userName: string;
}

export interface Actions {
    connect: () => Function,
    addMessages: (messages: Message[]) => Action<AddMessagesPayload>,
    setConnected: (connected: boolean) => Action<SetConnectedPayload>,
    sendMessage: (from: string, message: string) => Function,
    setUserName: (userName: string) => Action<SetUserNamePayload>,
    logout: () => Action<string>
}

function persistUserName(userName:string):string {
    localStorage.userName = userName;
    return userName;
}

function clearUserName() {
    localStorage.userName = '';
    return '';
}

function getUserName():string {
    if (!localStorage.userName) {
        return '';
    }
    return localStorage.userName;
}

export const actions = createActions({
    ADD_MESSAGES: (messages: Message[]):object => ({messages}),
    SET_CONNECTED: (connected: boolean): object => ({connected}),
    SET_USER_NAME: (userName: string): object => ({userName}),
    LOGOUT: ():object => ({})
}) as unknown as Actions;

actions.connect = (): Function => (dispatch: Dispatch): void => {
    connection.connect();

    connection.onOpen(() => {

        dispatch(actions.setConnected(true));
    });

    connection.onMessage((payload: MessageEvent) => {
        const messages = JSON.parse(payload.data) as Message[];
        dispatch(actions.addMessages(messages));
        if (messages.length > 1) {
            notifications.notify('New notifications from RSS chat!: ' + messages.length);
        } else {
            const message = messages[0];
            notifications.notify(message.from + "\n" + message.message);
        }
    });

    connection.onClose(() => {
        dispatch(actions.setConnected(false));
    })
};

actions.sendMessage = (from: string, message: string): Function => (): void => {
    connection.sendMessage(JSON.stringify({from, message} as SendMessage));
};

type ActionPayloads = AddMessagesPayload | SetConnectedPayload| SetUserNamePayload;

export const reducer = handleActions<State, ActionPayloads>({
    [actions.addMessages.toString()]: (state: State, action: Action<AddMessagesPayload>) => ({
        ...state,
        messages: state.messages.concat(action.payload.messages).sort((a: Message, b: Message) => {
            return a.time - b.time;
        })
    }),
    [actions.setConnected.toString()]: (state: State, action: Action<SetConnectedPayload>) => ({
        ...state,
        connected: action.payload.connected,
        messages: action.payload.connected ? []: state.messages
    }),
    [actions.setUserName.toString()]: (state: State, action: Action<SetUserNamePayload>) => ({
        ...state,
        userName: persistUserName(action.payload.userName)
    }),
    [actions.logout.toString()]: (state: State) => ({
        ...state,
        userName: clearUserName()
    })
}, new State(getUserName()));
