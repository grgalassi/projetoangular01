import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { subscribeOn } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-cadastro',
  templateUrl: './empresas-cadastro.component.html',
  styleUrls: ['./empresas-cadastro.component.css']
})
export class EmpresasCadastroComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit(): void {
  }

  formCadastro = new FormGroup({
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formCadastro.controls;
  }

  onSubmit(): void {
    this.httpClient.post(
      environment.apiUrl + 'api/empresas',
      this.formCadastro.value, 
      { responseType: 'text' }
    )
      .subscribe({
        next: (result) => {
          this.mensagem = result;
          this.formCadastro.reset();
        },
        error: (e) => {
          this.mensagem = "Falha ao cadastrar empresa.";
        }
      })

  }

}
