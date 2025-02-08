import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../services/clientservice/client.service';
import { Client } from '../../services/clientservice/client';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  clientForm!: FormGroup;
  isEditMode: boolean = false;
  clientId: number | null = null;
  selectedFile!: File;
    
      constructor(
        private fb: FormBuilder,
        private clientService: ClientService,
        private route: ActivatedRoute,
        private router: Router
      ) {}
    
      ngOnInit(): void {
        // Inicializar el formulario
        this.clientForm = this.fb.group({
          firstName: ['', Validators.required],
          lastName: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          phone: ['', Validators.required],
          address: ['', Validators.required],
        });
    
        // Verificar si es modo edición
        this.clientId = Number(this.route.snapshot.paramMap.get('id'));
        this.isEditMode = !!this.clientId;
    
        if (this.isEditMode) {
          // Cargar datos del usuario en modo edición
          this.clientService.getUserById(this.clientId).subscribe({
            next: (data) => this.clientForm.patchValue(data),
            error: (err) => console.error('Error al cargar usuario:', err),
          });
        }
      }
    
      // Método para manejar la selección del archivo
      onFileSelected(event: any): void {
        const file: File = event.target.files[0];
        if (file) {
          this.selectedFile = file;
        }
      }

    // Método para enviar el formulario
  onSubmit(): void {
    if (this.clientForm.valid) {
      const client: Client = this.clientForm.value;

      if (this.isEditMode && this.clientId) {
        // Actualizar usuario
        this.clientService.updateUser(this.clientId, client, this.selectedFile).subscribe({
          next: () => {
            alert('Usuario actualizado con éxito');
            this.router.navigate(['/lista']);
          },
          error: (err) => console.error('Error al actualizar usuario:', err),
        });
      } else {
        // Crear usuario
        this.clientService.saveUser(client, this.selectedFile).subscribe({
          next: () => {
            alert('Usuario registrado con éxito');
            this.router.navigate(['/lista']);
          },
          error: (err) => console.error('Error al registrar usuario:', err),
        });
      }
    } else {
      alert('Por favor, complete todos los campos requeridos.');
    }
  }
  // Método para cancelar y volver a la lista de usuarios
  cancel(): void {
    this.router.navigate(['/lista']);
  }
}
