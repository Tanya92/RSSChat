
class Connection {
    socket: WebSocket;
    retries: number = 5;
    openCallbacks: EventListener[]=[];
    messageCallbacks: EventListener[]=[];
    closeCallbacks: EventListener[]=[];

    isConnected(): boolean {
        return this.socket && this.socket.readyState == WebSocket.OPEN;
    }

    connect(): void {
        if (!this.isConnected()) {
            this.socket = new WebSocket('wss://wssproxy.herokuapp.com/');
            this.socket.addEventListener('open', (event: Event) => {
                this.openCallbacks.forEach(callback => {callback(event)});
                console.info('connection is open');
            });
            this.socket.addEventListener('message', (event: Event) => {
                this.messageCallbacks.forEach(callback => {callback(event)});
            });
            this.socket.addEventListener('error', this.reConnect);
            this.socket.addEventListener('close', this.reConnect);
        }
    }

    onOpen(callback: EventListener): void {
        this.openCallbacks.push(callback);
    }

    onMessage(callback: EventListener): void {
        this.messageCallbacks.push(callback);
    }

    onClose(callback: EventListener): void {
        this.closeCallbacks.push(callback);
    }

    sendMessage(data: string): void {
        this.socket.send(data);
    }

    reConnect = (event: Event): void => {
        this.closeCallbacks.forEach(callback => callback(event));
        if (this.retries > 0) {
            this.retries--;
            this.socket = null;
            this.connect();
            console.log('Connection lost!');
        } else {
            console.log('Could not establish connection...')
        }
    }

}

export const connection = new Connection();
