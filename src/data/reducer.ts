import {createActions, handleActions, Action} from "redux-actions";
import {State, Message, SendMessage} from './models';
import {Dispatch} from "redux";
import {connection} from "~/services/connection";

interface AddMessagesPayload {
    messages: Message[]
}

interface SetConnectedPayload {
    connected: boolean;
}

interface Interface {

}

export interface Actions {
    connect: () => Function,
    addMessages: (messages: Message[]) => Action<AddMessagesPayload>,
    setConnected: (connected: boolean) => Action<SetConnectedPayload>,
    sendMessage: (from: string, message: string) => Function
}

function setUserName(userName:string):void {
    localStorage.userName = userName;
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
}) as unknown as Actions;

actions.connect = (): Function => (dispatch: Dispatch): void => {
    connection.connect();

    connection.onOpen(() => {
        console.info('connection is open');
        dispatch(actions.setConnected(true));
    });

    connection.onMessage((payload: MessageEvent) => {
        dispatch(actions.addMessages(JSON.parse(payload.data)))
    });
};

actions.sendMessage = (from: string, message: string): Function => (): void => {
    connection.sendMessage(JSON.stringify({from, message} as SendMessage));
};

type ActionPayloads = AddMessagesPayload | SetConnectedPayload;

export const reducer = handleActions<State, ActionPayloads>({
    [actions.addMessages.toString()]: (state: State, action: Action<AddMessagesPayload>) => ({
        ...state,
        messages: state.messages.concat(action.payload.messages)
    }),
    [actions.setConnected.toString()]: (state: State, action: Action<SetConnectedPayload>) => ({
        ...state,
        connected: action.payload.connected
    }),
}, new State(getUserName()));
