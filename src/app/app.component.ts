import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usuarioAutenticado: boolean = false;
  usuarioEmail: string = '';

  constructor() {

    if (localStorage.getItem("access_token") != null) {
      this.usuarioAutenticado = true;
      this.usuarioEmail = localStorage.getItem("email_usuario") as string;

    }

  }

  logout(): void {
    if(window.confirm('Deseja realmente sair do sistema?')){
      localStorage.removeItem('access_token');
      localStorage.removeItem('email_usuario'),

      window.location.href = "/login";
      
    }
  }

}
