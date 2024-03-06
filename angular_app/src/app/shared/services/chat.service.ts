import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders, HttpParams } from '@angular/common/http';
import { Location } from '@angular/common';
import { HubConnectionBuilder } from '@microsoft/signalr';
import * as signalR from '@microsoft/signalr';

var today = new Date().toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public hubConnection: signalR.HubConnection;
  public messages: string[] = [];

  constructor(private http:HttpClient , private location:Location) {
  
  }
  
  //formChat:ChatMessages = new ChatMessages();
  getAnswerChatAI(question: string): Observable<any> {
    const apiUrl = `https://localhost:44334/api/ChatAI/getanswer?question=${question}`;
    return this.http.post(apiUrl , {} );
  }  

  startConnection() {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44334/chatHub', { transport: signalR.HttpTransportType.WebSockets })
      .build();

    this.hubConnection.start().then(() => {
      console.log('Connection started');
    }).catch(err => console.error('Error while starting connection: ' + err));
  }

  sendMessageToRole(message: string) {
    return this.hubConnection.invoke('SendMessageToRole', message)
      .then(() => console.log('Message sent successfully'))
      .catch(err => console.error('Error sending message:', err));
  }


  // public replyMessage = (message: string, receiverEmail: string): void => {
  //   this.hubConnection.invoke('ReplyMessage', message, receiverEmail).catch((err) => console.error(err));
  // };

  

}
