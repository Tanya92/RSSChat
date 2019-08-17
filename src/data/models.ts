export class State {
    userName: string;
    messages: Message[] = [];
    connected: boolean = false;
    pendingMessages: SendMessage[] = [];

    public constructor(userName: string) {
        this.userName = userName;
    }
}

export class Message {
    from: string;
    message: string;
    id: string;
    time: number;
}

export interface SendMessage {
    from: string,
    message: string
}
