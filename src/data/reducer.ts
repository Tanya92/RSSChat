import {createActions, handleActions, Action} from "redux-actions";
import {State, Message} from './models';
import {Dispatch} from "redux";

interface AddMessagesPayload {
    messages: Message[]
}

export interface Actions {
    connect: () => Function,
    addMessages: (messages: Message[]) => Action<AddMessagesPayload>
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
    ADD_MESSAGES: (messages: Message[]):object => ({messages})
}) as unknown as Actions;

actions.connect = (): Function => (dispatch: Dispatch): void => {
    const socket = new WebSocket('ws://st-chat.shas.tel');
    socket.onopen = () => {
        console.info('connection is open')
    };

    socket.onmessage = (payload: MessageEvent) => {
        dispatch(actions.addMessages(JSON.parse(payload.data)))
    };
};

export const reducer = handleActions({
    [actions.addMessages.toString()]: (state: State, action: Action<AddMessagesPayload>) => ({
        ...state,
        messages: state.messages.concat(action.payload.messages)
    }),
}, new State(getUserName()))
