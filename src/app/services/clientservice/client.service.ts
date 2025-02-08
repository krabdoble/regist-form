
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = 'http://localhost:8080/api/usersdata';
  

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl);
  }

   
   getUserById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/${id}`);
  }

  saveUser(client: Client, file: File): Observable<Client> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(client)], { type: 'application/json' }));
    formData.append('file', file);
    return this.http.post<Client>(this.apiUrl, formData);
  }

  updateUser(id: number, client: Client, file?: File): Observable<Client> {
    const formData = new FormData();
    formData.append('user', new Blob([JSON.stringify(client)], { type: 'application/json' }));
    if (file) formData.append('file', file);
    return this.http.put<Client>(`${this.apiUrl}/${id}`, formData);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

