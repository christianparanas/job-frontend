import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
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
  candidate: { id: number; username: string; image?: string }; // Add image for candidate
  Messages?: Message[];
}
interface Message {
  chatId: number;
  senderId: number;
  content: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private apiUrl = `${environment.apiUrl}/api/chat`;
  private socket: Socket;
  private messagesSubject = new BehaviorSubject<Message[]>([]);
  public messages$ = this.messagesSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    // Initialize Socket.IO connection with authentication token
    this.socket = io(environment.apiUrl, {
      auth: {
        token: this.authService.getToken(), // Send JWT token for authentication
      },
    });

    // Handle connection errors
    this.socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error.message);
    });

    // Listen for incoming messages
    this.socket.on('receiveMessage', (message: Message) => {
      const currentMessages = this.messagesSubject.getValue();
      this.messagesSubject.next([...currentMessages, message]);
    });

    // Handle errors from the server
    this.socket.on('error', (error: { message: string }) => {
      console.error('Socket error:', error.message);
    });
  }

  // Join a chat room
  joinChat(chatId: number): void {
    this.socket.emit('joinChat', chatId);
  }

  // Send a message
  sendMessage(chatId: number, content: string): void {
    const senderId = this.authService.getUser()?.id; // Get senderId from AuthService
    if (senderId && content.trim()) {
      this.socket.emit('sendMessage', { chatId, senderId, content });
    } else {
      console.error('Sender ID or content missing');
    }
  }

  // Fetch all chats for a user
  getChatsByUserId(userId: number): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}/user/${userId}`);
  }

  // Fetch a specific chat by ID
  getChatById(chatId: number): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiUrl}/${chatId}`);
  }

  // Create a new chat
  createChat(employerId: number, candidateId: number): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}`, { employerId, candidateId });
  }

  // Add a message (REST fallback, though we'll primarily use Socket.IO)
  addMessage(chatId: number, content: string): Observable<Message> {
    const senderId = this.authService.getUser()?.id;
    return this.http.post<Message>(`${this.apiUrl}/${chatId}/message`, {
      senderId,
      content,
    });
  }

  // Get messages observable
  getMessages(): Observable<Message[]> {
    return this.messages$;
  }

  // Clear messages (e.g., when leaving a chat)
  clearMessages(): void {
    this.messagesSubject.next([]);
  }

  // Disconnect socket (optional, for cleanup)
  disconnect(): void {
    this.socket.disconnect();
  }
}
