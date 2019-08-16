export class State {
    userName: string;
    messages: Message[] = [];
    connected: boolean = false;

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
