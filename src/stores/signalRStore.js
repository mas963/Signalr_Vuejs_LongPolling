import {defineStore} from 'pinia';
import * as signalR from '@microsoft/signalr';

export const useSignalRStore = defineStore("signalR", {
    state: () => ({
        connection: null,
        messages: [],
    }),

    actions: {
        initializeSignalR() {
            const connection = new signalR.HubConnectionBuilder()
                .withUrl("http://localhost:5123/TestHub", {
                    transport: signalR.HttpTransportType.LongPolling,
                })
                .build();

            connection.start()
                .then(() => {
                    console.log('SignalR bağlantısı kuruldu');
                    this.connection = connection;

                    connection.on('ReceiveMessage', (user, message) => {
                        this.messages.push({user, message});
                    });
                })
                .catch(err => console.error('SignalR bağlantı hatası:', err));
        },
        sendMessage(user, message) {
            if (this.connection) {
                this.connection.invoke('SendMessage', user, message)
                    .catch(err => console.error('Mesaj gönderme hatası:', err));
            }
        }
    },
})