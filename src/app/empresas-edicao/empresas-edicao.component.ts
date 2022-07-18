import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-empresas-edicao',
  templateUrl: './empresas-edicao.component.html',
  styleUrls: ['./empresas-edicao.component.css']
})
export class EmpresasEdicaoComponent implements OnInit {

  mensagem: string = '';

  constructor(
    private httpCliente: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpCliente.get(
      environment.apiUrl + 'api/empresas/' + id)
      .subscribe({
        next: (result) => {
          this.formEdicao.patchValue(result);
        },
        error: (e) => {
          console.log(e);
        }
      })

  }

  formEdicao = new FormGroup({
    idEmpresa: new FormControl('', [Validators.required]),
    nomeFantasia: new FormControl('', [Validators.required]),
    razaoSocial: new FormControl('', [Validators.required]),
    cnpj: new FormControl('', [Validators.required])
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {
    this.httpCliente.put(
      environment.apiUrl + 'api/empresas',
      this.formEdicao.value,
      { responseType: 'text' }
    )
      .subscribe({
        next: (result) => {
          this.mensagem = result;

        },
        error: (e) => {
          this.mensagem = "Falha ao atualizar empresa.";
        }
      })

  }

}
