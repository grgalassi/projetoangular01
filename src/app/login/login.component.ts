import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  mensagem: string = '';
 
  constructor(
    private httpClient: HttpClient
  ) { }
 
  //estrutura do formulário
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required]),
    senha: new FormControl('', [Validators.required])
  });
 
  get form(): any {
    return this.formLogin.controls;
  }
 
  ngOnInit(): void {
  }
 
  onSubmit(): void {
 
    this.httpClient.post(
      environment.apiLoginUrl + "api/login",
      this.formLogin.value,
      { responseType: 'text' })
      .subscribe({
        next: (result) => {
          
          localStorage.setItem("access_token", result);
          localStorage.setItem("email_usuario", this.formLogin.value.email as string);
          
          window.location.href = "/empresas-consulta";

        },
        error: (e) => {
          this.mensagem = e.error;
        }
      })
 
  }
 
}
