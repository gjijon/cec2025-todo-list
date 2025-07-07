import { Component, OnInit }                  from '@angular/core';
import { FormBuilder, FormGroup }             from '@angular/forms';
import { ReactiveFormsModule }                from '@angular/forms';
import { CommonModule }                       from '@angular/common';

interface Item {
  campoA: string;
  campoB: string;
}

@Component({
  selector: 'app-form-reactivo',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './form-reactivo.component.html',
  styleUrl: './form-reactivo.component.css'
})
export class FormReactivoComponent implements OnInit {
  miFormulario!: FormGroup;
  items: Item[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.miFormulario = this.fb.group({
      campoA: [''],
      campoB: [''],
    });
  }

  addItem() {
    // Siempre añade lo que haya en el formulario
    this.items.push(this.miFormulario.value as Item);
    this.miFormulario.reset();
  }
}
