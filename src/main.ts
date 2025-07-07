import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ListItemsComponent } from './app/list-items/list-items.component';
import { FormReactivoComponent } from './app/form-reactivo/form-reactivo.component';

const routes: Routes = [
  { path: '',        redirectTo: 'uno', pathMatch: 'full' },
  { path: 'formulario_normal',     component: ListItemsComponent },
  { path: 'formulario_reactivo',     component: FormReactivoComponent },
  { path: '**',      redirectTo: 'formulario_normal' }
];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes)    // ← esto inyecta el Router con tus rutas
  ]
})
.catch(err => console.error(err));
