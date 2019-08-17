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

interface AddPendingMessagePayload {
    pendingMessage: SendMessage;
}

export interface Actions {
    connect: () => Function,
    addMessages: (messages: Message[]) => Action<AddMessagesPayload>,
    setConnected: (connected: boolean) => Action<SetConnectedPayload>,
    sendMessage: (from: string, message: string) => Function,
    setUserName: (userName: string) => Action<SetUserNamePayload>,
    logout: () => Action<string>,
    addPendingMessage: (pendingMessage: SendMessage) => Action<AddPendingMessagePayload>,
    clearPendingMessages: () => Action<object>
}

type GetState = () => State;

function persistUserName(userName:string):string {
    localStorage.userName = userName;
    return userName;
}

function persistPendingMessages(messages: SendMessage[]) {
    localStorage.pendingMessages = JSON.stringify(messages);
    return messages;
}

function clearUserName():string {
    localStorage.userName = '';
    return '';
}

function clearPendingMessages():Array<null> {
    localStorage.pendingMessages = "";
    return [];
}

function getUserName():string {
    if (!localStorage.userName) {
        return '';
    }
    return localStorage.userName;
}

function getPendingMessages():SendMessage[] {
    try {
        if (!localStorage.pendingMessages) {
            return [];
        }
        return JSON.parse(localStorage.pendingMessages);
    } catch(e) {
        return [];
    }
}


export const actions = createActions({
    ADD_MESSAGES: (messages: Message[]):object => ({messages}),
    SET_CONNECTED: (connected: boolean): object => ({connected}),
    SET_USER_NAME: (userName: string): object => ({userName}),
    LOGOUT: ():object => ({}),
    ADD_PENDING_MESSAGE: (pendingMessage: SendMessage):object => ({pendingMessage}),
    CLEAR_PENDING_MESSAGES: ():object => ({})
}) as unknown as Actions;

actions.connect = (): Function => (dispatch: Dispatch, getState: GetState): void => {
    if (!connection.isConnected()) {
        connection.connect();

        connection.onOpen(() => {
            const state = getState();
            state.pendingMessages.forEach(message => {
                connection.sendMessage(JSON.stringify(message))
            });
            dispatch(actions.clearPendingMessages());
            dispatch(actions.setConnected(true));
        });

        connection.onMessage((payload: MessageEvent) => {
            const messages = JSON.parse(payload.data) as Message[];
            const state = getState();
            dispatch(actions.addMessages(messages));
            if (state.userName) {
                if (messages.length > 1) {
                    notifications.notify('New notifications from RSS chat!: ' + messages.length);
                } else {
                    const message = messages[0];
                    notifications.notify(message.from + "\n" + message.message);
                }
            }
        });

        connection.onClose(() => {
            dispatch(actions.setConnected(false));
        })
    }
};

actions.sendMessage = (from: string, message: string): Function => (dispatch: Dispatch, getState: GetState): void => {
    const state = getState();
    if (state.connected) {
        connection.sendMessage(JSON.stringify({from, message} as SendMessage));
    } else {
        dispatch(actions.addPendingMessage({from, message}))
    }

};

type ActionPayloads = AddMessagesPayload | SetConnectedPayload| SetUserNamePayload| AddPendingMessagePayload;

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
        userName: clearUserName(),

    }),
    [actions.addPendingMessage.toString()]: (state: State, action: Action<AddPendingMessagePayload>) => ({
        ...state,
        pendingMessages: persistPendingMessages(state.pendingMessages.concat(action.payload.pendingMessage)),
    }),
    [actions.clearPendingMessages.toString()]: (state: State) => ({
        ...state,
        pendingMessages: clearPendingMessages()
    })
}, new State(getUserName(), getPendingMessages()));
