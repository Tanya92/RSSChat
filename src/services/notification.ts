enum NotificationStatuses {
    NOT_SUPPORTED = 'NOT_SUPPORTED',
    GRANTED = 'GRANTED',
    DENIED = 'DENIED'
}

class Notifications {
    status: NotificationStatuses;

    constructor() {
        if (!("Notification" in window)) {
           this.status = NotificationStatuses.NOT_SUPPORTED;
        } else if (Notification.permission === "granted") {
            this.status = NotificationStatuses.GRANTED;
        } else if (Notification.permission !== "denied") {
            Notification.requestPermission().then((permission: string) => {
                if (permission === "granted") {
                    this.status = NotificationStatuses.GRANTED;
                } else {
                    this.status = NotificationStatuses.DENIED;
                }
            })
        }
    }

    notify(message: string) {
        if (this.status === NotificationStatuses.GRANTED) {
            if (document.hidden) {
                new Notification(message);
            }
        }
    }

}

export const notifications = new Notifications();
