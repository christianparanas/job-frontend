import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

// Define the structure of the User data
interface User {
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
    private apiUrl = `${environment.apiUrl}/api/user`;


  constructor(private http: HttpClient) {}

  // Method to get users with the "User" role
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}
