
class Connection {
    socket: WebSocket;

    connect(): void {
        if (!this.socket) {
            this.socket = new WebSocket('ws://st-chat.shas.tel');
        }
    }

    onOpen(callback: EventListener): void {
        this.socket.addEventListener('open', callback);
    }

    onMessage(callback: EventListener): void {
        this.socket.addEventListener('message', callback);
    }

    sendMessage(data: string): void {
        this.socket.send(data);
    }
}

export const connection = new Connection();
