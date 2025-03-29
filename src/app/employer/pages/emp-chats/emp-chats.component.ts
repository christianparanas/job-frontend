import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { ChatService } from '../../../seeker/shared/services/chat.service';
import { AuthService } from '../../../core/shared/services/auth.service';

interface Chat {
  id: number;
  employerId: number;
  candidateId: number;
  lastMessage: string | null;
  timestamp: string;
  unreadEmployer: number;
  unreadCandidate: number;
  employer: { id: number; name: string };
  candidate: {
    id: number;
    firstname: string;
    lastname: string;
    image?: string;
  }; // Add image for candidate
  Messages?: Message[];
}

interface Message {
  chatId: number;
  senderId: number;
  content: string;
  timestamp: string;
}

@Component({
  selector: 'app-emp-chats',
  imports: [CommonModule, ButtonModule, FormsModule, RouterModule],
  templateUrl: './emp-chats.component.html',
  styleUrls: ['./emp-chats.component.scss'],
  standalone: true,
})
export class EmpChatsComponent implements OnInit, OnDestroy {
  chats: Chat[] = [];
  messages: Message[] = [];
  selectedChat: Chat | null = null;
  currentUserId: number | null = null;
  newMessage: string = '';
  isLoaded: boolean = false;

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUser();
    this.currentUserId = user?.id;

    if (this.currentUserId) {
      this.chatService.getChatsByUserId(this.currentUserId).subscribe({
        next: (chats: any) => {
          this.chats = chats.filter(
            (chat: { employerId: number | null }) =>
              chat.employerId === this.currentUserId
          );
          this.route.queryParams.subscribe((params) => {
            const applicantId = +params['id']; // Convert to number
            if (applicantId) {
              this.initializeConversation(applicantId);
            }
          });
        },
        error: (error: any) => {
          console.error('Error fetching chats:', error);
        },
      });

      this.isLoaded = true;

      // Subscribe to incoming messages
      this.chatService.getMessages().subscribe((messages: any) => {
        this.messages = messages;
        this.scrollToBottom();
      });
    }
  }

  initializeConversation(applicantId: number): void {
    const existingChat = this.chats.find(
      (chat) => chat.candidateId === applicantId
    );

    if (existingChat) {
      this.selectChat(existingChat);
      this.isLoaded = true;
    } else {
      this.chatService.createChat(this.currentUserId!, applicantId).subscribe({
        next: (newChat: any) => {
          this.chats = [newChat, ...this.chats];
          this.selectChat(newChat);
          this.isLoaded = true;
        },
        error: (error: any) => {
          console.error('Error creating chat:', error);
          this.isLoaded = true;
          this.router.navigate(['/employer/chats']);
        },
      });
    }
  }

  unselectChat() {
    this.router.navigate(['/employer/chats']);

    this.messages = [];
    this.scrollToBottom();

    this.selectChat(null);
  }

  selectChat(chat: Chat | null): void {
    this.selectedChat = chat;

    this.router.navigate(['/employer/chats'], {
      queryParams: { id: this.selectedChat?.candidateId },
    });

    if (chat) {
      this.chatService.joinChat(chat.id);
      this.chatService.clearMessages();

      // Fetch messages for the selected chat
      this.chatService.getChatById(chat.id).subscribe({
        next: (chatDetails: any) => {
          this.messages = chatDetails.Messages || [];
          this.scrollToBottom();
          this.isLoaded = true;
        },
        error: (error: any) => {
          console.error('Error fetching chat messages:', error);
          this.isLoaded = true;
        },
      });
    }
  }

  sendMessage(): void {
    if (this.newMessage.trim() && this.selectedChat) {
      this.chatService.sendMessage(this.selectedChat.id, this.newMessage);
      this.newMessage = '';
    }
  }

  getOtherUser(chat: Chat): string {
    if (Object.keys(chat).length == 5) {
      return 'User';
    }

    return chat.candidate.firstname + ' ' + chat.candidate.lastname;
  }

  getUserImage(chat: Chat): string {
    return (
      // chat.candidate.image ||
      'https://static.vecteezy.com/system/resources/previews/036/594/092/non_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg'
    ); // Fallback image
  }

  getUnreadCount(chat: Chat): number {
    return chat.unreadCandidate;
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
