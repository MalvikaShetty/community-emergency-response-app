import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../../../shared/services/chat.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  // Chat AI
  chatText: string = '';
  messages: any[] = [];

  // Chat Volunteer
  currentMessageVolunteerChat: string;
  messagesVolunteerChat: { text: string; sender: string; }[] = [];
  chatTextVolunteer: string = '';
  loggedInUserEmail : string | null;

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {  
    this.chatService.startConnection();
    // Listen for messages from the server
    this.subscribeToIncomingMessages();
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  }

   // Function to start a new chat conversation
   startNewChat() {
    this.chatTextVolunteer = ''; // Clear the current chat text
    this.messagesVolunteerChat = []; // Clear the messages array
  }

  //SignalR Incoming Message from User to Volunteer
  subscribeToIncomingMessages() {
    this.chatService.hubConnection.on('ReceiveMessage', (message: string, senderEmail: string) => {
      const isCurrentUser = senderEmail === this.loggedInUserEmail;
      const targetArray = isCurrentUser ? this.messagesVolunteerChat : this.messages;
      targetArray.push({ text: message, sender: isCurrentUser ? 'You' : senderEmail });
    });
  }

  //Sending message from Volunteer to the User
  sendMessageToVolunteer() {
    console.log(this.currentMessageVolunteerChat, "Chattt");
    if (!this.currentMessageVolunteerChat.trim()) return;
    this.chatService.sendMessageToRole(this.currentMessageVolunteerChat).then(() => {
      this.messagesVolunteerChat.push({ text: this.currentMessageVolunteerChat, sender: 'You' });
      this.currentMessageVolunteerChat = '';
    }).catch(err => console.error('Error sending message:', err));
  }

  // Send Message to AI
  sendQuestion() {
    if (!this.chatText.trim()) return;
    this.chatService.getAnswerChatAI(this.chatText).subscribe({
      next: (response) => {
        this.messages.push({ text: this.chatText, sender: 'You' });
        this.messages.push({ text: response.answer, sender: 'AI' });
        this.chatText = '';
      },
      error: (error) => console.error('Error fetching answer:', error)
    });
  }


    
}
