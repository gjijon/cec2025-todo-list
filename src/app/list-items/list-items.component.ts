import { Component, signal } from '@angular/core';
import { Item } from '../list-item/Item';
import { ListItemComponent } from "../list-item/list-item.component";

@Component({
  selector: 'app-list-items',
  imports: [ListItemComponent],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.css'
})
export class ListItemsComponent {
  private lista_items = signal<Item[]>([]);
  lista = this.lista_items;

  agregar(item: Item) {
    this.lista_items.update(listax => [...listax, item]);
  }

  terminar(item: Item) {
    this.lista_items.update(listax => listax.filter(i => i.nombre_item !== item.nombre_item));
  }
}
