import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-funcionarios-edicao',
  templateUrl: './funcionarios-edicao.component.html',
  styleUrls: ['./funcionarios-edicao.component.css']
})
export class FuncionariosEdicaoComponent implements OnInit {

  empresas: any[] = [];
  mensagem: string = '';

  constructor(
    private httpClient: HttpClient,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.httpClient.get(environment.apiUrl + "api/empresas")
      .subscribe({
        next: (result) => {
          this.empresas = result as any[];
        },
        error: (e) => {
          console.log(e);
        }
      })

    const id = this.activatedRoute.snapshot.paramMap.get('id') as string;

    this.httpClient.get(environment.apiUrl + "api/funcionarios/" + id)
      .subscribe(
        {
          next: (result: any) => {
            this.formEdicao.patchValue(result);

            this.formEdicao.controls['dataAdmissao']
              .setValue(formatDate(result.dataAdmissao as Date, 'yyyy-MM-dd', 'en'));

            this.formEdicao.controls['idEmpresa'].setValue(result.empresa.idEmpresa);

          },
          error: (e) => {
            console.log(e);
          }
        }
      )
  }

  formEdicao = new FormGroup({
    idFuncionario: new FormControl('', [Validators.required]),
    nome: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required]),
    matricula: new FormControl('', [Validators.required]),
    dataAdmissao: new FormControl('', [Validators.required]),
    idEmpresa: new FormControl('', [Validators.required]),
  });

  get form(): any {
    return this.formEdicao.controls;
  }

  onSubmit(): void {
    this.httpClient.put(
      environment.apiUrl + "api/funcionarios",
      this.formEdicao.value,
      { responseType: 'text' }
    )
      .subscribe(
        {
          next: (result) => {
            this.mensagem = result;
          },
          error: (e) => {
            console.log(e);
            this.mensagem = "Falha ao atualizar Funcionário.";
          }
        }
      )
  }

}
