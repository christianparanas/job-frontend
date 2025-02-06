import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Define the structure of the User data
interface Role {
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/user';

  constructor(private http: HttpClient) {}

  // Method to get users with the "User" role
  getUsers() {
    return this.http.get<any>(`${this.apiUrl}/users`);
  }
}
