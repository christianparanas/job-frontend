import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../shared/services/chat.service';
import { AuthService } from '../../../core/shared/services/auth.service';

interface Chat {
  id: number;
  employerId: number;
  candidateId: number;
  lastMessage: string | null;
  timestamp: string;
  unreadEmployer: number;
  unreadCandidate: number;
  employer: { id: number; username: string };
  candidate: { id: number; username: string };
  Messages?: Message[]; // Updated to include Messages
}

interface Message {
  chatId: number;
  senderId: number;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-chats',
  imports: [CommonModule, ButtonModule, FormsModule],
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
  standalone: true,
})
export class ChatsComponent implements OnInit, OnDestroy {
  chats: Chat[] = [];
  messages: Message[] = [];
  selectedChat: Chat | null = null;
  currentUserId: number | null = null;
  newMessage: string = '';

  constructor(
    private chatService: ChatService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.currentUserId = user?.id;

    if (this.currentUserId) {
      this.chatService.getChatsByUserId(this.currentUserId).subscribe({
        next: (chats: any) => {
          this.chats = chats;
          if (chats.length > 0) {
            this.selectChat(chats[0]);
          }
        },
        error: (error: any) => {
          console.error('Error fetching chats:', error);
        },
      });

      this.chatService.getMessages().subscribe((messages: any) => {
        this.messages = messages;
        this.scrollToBottom();
      });
    }
  }

  selectChat(chat: Chat): void {
    this.selectedChat = chat;
    this.chatService.joinChat(chat.id);
    this.chatService.clearMessages();

    this.chatService.getChatById(chat.id).subscribe({
      next: (chatDetails: any) => {
        this.messages = chatDetails.Messages || []; // Use Messages property
        this.scrollToBottom();
      },
      error: (error: any) => {
        console.error('Error fetching chat messages:', error);
      },
    });
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedChat) {
      this.chatService.sendMessage(this.selectedChat.id, this.newMessage);
      this.newMessage = '';
    }
  }

  getOtherUser(chat: Chat): string {
    return chat.employerId === this.currentUserId
      ? chat.candidate.username
      : chat.employer.username;
  }

  getUnreadCount(chat: Chat): number {
    return chat.employerId === this.currentUserId
      ? chat.unreadEmployer
      : chat.unreadCandidate;
  }

  isSentByUser(message: Message): boolean {
    return message.senderId === this.currentUserId;
  }

  scrollToBottom(): void {
    setTimeout(() => {
      const messagesContainer = document.querySelector('.messages-container');
      if (messagesContainer) {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.chatService.disconnect();
  }
}
