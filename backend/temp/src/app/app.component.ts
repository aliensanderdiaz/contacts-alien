import { NgStyle } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgStyle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  contactos: any[] = [];
  private http = inject(HttpClient);

  ngOnInit() {
    this.http.get('http://localhost:3000/contactos').subscribe({
      next: (data: any) => {
        console.log({ data })
        this.contactos = data.contactos
      },
      error: (error: any) => {
        console.log({ error })
      }
    })
  }

  guardarContacto(indice: number) {
    const contacto = {...this.contactos[indice],edited: true}
    this.http.post(`http://localhost:3000/contactos/${contacto._id}`, contacto)
      .subscribe({
        next: (data: any) => {
          this.contactos[indice].edited = true
          console.log({ data })
        },
        error: (err: any) => {
          console.error({ err })
        },
      })
  }

 eliminarContacto(indice: number) {
    const contacto = {...this.contactos[indice],deleted: true}
    this.http.delete(`http://localhost:3000/contactos/${contacto._id}`, contacto)
      .subscribe({
        next: (data: any) => {
          this.contactos[indice].deleted = true
          this.contactos.splice(indice, 1)
          console.log({ data })
        },
        error: (err: any) => {
          console.error({ err })
        },
      })
  }
}
