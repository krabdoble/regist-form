import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/clientservice/client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.css']
})
export class ClientListComponent implements OnInit {
  users: any[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.clientService.getAllUsers().subscribe({
      next: (data) => (this.users = data),
      error: (err) => console.error('Error al cargar usuarios', err),
    });
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.clientService.deleteUser(id).subscribe({
        next: () => {
          alert('Usuario eliminado con éxito');
          this.loadUsers();
        },
        error: (err) => console.error('Error al eliminar usuario', err),
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/lista/edit', id]);
  }
}



