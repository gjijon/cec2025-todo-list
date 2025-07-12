import { Component, OnInit } from '@angular/core';
import { CommonModule }      from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-reactivo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  templateUrl: './form-reactivo.component.html',
  styleUrls: ['./form-reactivo.component.css']
})
export class FormReactivoComponent implements OnInit {
  usuarioForm: FormGroup;
  usuarios: any[]         = [];
  editingId: number | null = null;
  private apiUrl = 'http://localhost:8080/api';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.usuarioForm = this.fb.group({
      usuario:  ['', Validators.required],
      nombre:   ['', Validators.required],
      apellido: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadUsuarios();
  }

  loadUsuarios(): void {
    this.http
      .get<any[]>(`${this.apiUrl}/consultaUsuarios`)
      .subscribe(data => this.usuarios = data);
  }

  onSubmit(): void {
    if (this.usuarioForm.invalid) return;

    const { usuario, nombre, apellido } = this.usuarioForm.value;

    const peticion$ = this.editingId === null
      ? this.http.put(`${this.apiUrl}/crearUsuario/${usuario}/${nombre}/${apellido}`, {})
      : this.http.post (`${this.apiUrl}/modificarUsuario/${this.editingId}/${usuario}/${nombre}/${apellido}`, {});

    peticion$.subscribe(() => {
      this.loadUsuarios();
      this.usuarioForm.reset();
      this.editingId = null;
    });
  }

  onEdit(u: any): void {
    this.editingId = u.id;
    this.usuarioForm.patchValue({
      usuario:  u.usuario,
      nombre:   u.nombre,
      apellido: u.apellido,
    });
  }

  onDelete(id: number): void {
    this.http
      .delete(`${this.apiUrl}/borrarUsuario/${id}`)
      .subscribe(() => {
        this.loadUsuarios();
        if (this.editingId === id) {
          this.editingId = null;
          this.usuarioForm.reset();
        }
      });
  }

  onCancel(): void {
    this.editingId = null;
    this.usuarioForm.reset();
  }
}
