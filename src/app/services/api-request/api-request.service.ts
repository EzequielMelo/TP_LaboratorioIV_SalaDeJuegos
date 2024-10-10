import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  hhtp = inject(HttpClient)

  apiGithubUrl = "https://api.github.com/users/";
  apiSpanishWordsUrl = "https://clientes.api.greenborn.com.ar/public-random-word?c=1";
  apiQuizUrl = "https://api.quiz-contest.xyz/";
  apiKey = environment.apiQuiz.apiKey || '';

  //datos: any = {};

  constructor() { }

  getUser(usuario: string) {
    const peticion = this.hhtp.get(this.apiGithubUrl + usuario, {
      responseType: "json",
      params: {
        ejemplo: 'labo4',
      },
    });

    /*Haciendo el return devolvemos la peticion sin ejecutar*/
    return peticion;

    /*Con este metodo devolvemos la peticion ejecutada*/
    /*
    peticion.subscribe((respuesta) => {
      this.datos = respuesta;
    })
    */
  }

  getWord() {
    const peticion = this.hhtp.get(this.apiSpanishWordsUrl, {
      responseType: "json",
    });

    return peticion;
  }

  getQuiz(limit: number, page: number, category: string) {
    const peticion = this.hhtp.get(this.apiQuizUrl + "questions", {
      headers: {
        'Authorization': this.apiKey,
      },
      params: {
        limit: limit.toString(), // Convertir a string
        page: page.toString(),   // Convertir a string
        category: category       // Se mantiene como string
      }
    });

    return peticion;
  }

}
