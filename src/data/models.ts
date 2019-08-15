export class State {
    userName: string;
    messages: Message[] = [];

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
