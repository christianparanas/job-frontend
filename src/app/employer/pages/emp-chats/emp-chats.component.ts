import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
}

interface Message {
  sender: string;
  content: string;
  timestamp: string;
  isSentByUser: boolean;
}

@Component({
  selector: 'app-emp-chats',
  imports: [CommonModule, ButtonModule],
  templateUrl: './emp-chats.component.html',
  styleUrls: ['./emp-chats.component.css'],
  standalone: true,
})
export class EmpChatsComponent {
  chats: Chat[] = [
    { id: 1, name: 'John Doe', lastMessage: 'Looking forward to the interview!', timestamp: '10:45 AM', unread: 2 },
    { id: 2, name: 'Jane Smith', lastMessage: 'Thanks for the opportunity.', timestamp: 'Yesterday', unread: 0 },
    { id: 3, name: 'Alex Brown', lastMessage: 'Can we reschedule?', timestamp: 'Mar 6', unread: 1 },
  ];

  messages: Message[] = [
    { sender: 'John Doe', content: 'Hi, I’m excited about the Software Engineer role!', timestamp: '10:30 AM', isSentByUser: false },
    { sender: 'You', content: 'Great to hear, John! Let’s schedule an interview.', timestamp: '10:32 AM', isSentByUser: true },
    { sender: 'John Doe', content: 'Looking forward to it!', timestamp: '10:45 AM', isSentByUser: false },
  ];

  selectedChat: Chat | null = this.chats[0]; // Default to first chat

  selectChat(chat: Chat) {
    this.selectedChat = chat;
    // In a real app, fetch messages for the selected chat here
  }
}
