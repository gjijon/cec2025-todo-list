import { Component, EventEmitter, Input, output, Output, signal } from '@angular/core';
import { Item } from './Item';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-item',
  imports: [FormsModule],
  templateUrl: './list-item.component.html',
  styleUrl: './list-item.component.css'
})
export class ListItemComponent {
  nombre = signal('');
  item = output<Item>();

  guardar() {
    const n = this.nombre;
    this.item.emit({nombre_item: n.toString()});
    this.nombre.set('');
  }
}