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

  getUser(usuario: string) {
    const petition = this.hhtp.get(this.apiGithubUrl + usuario, {
      responseType: "json",
      params: {
        ejemplo: 'labo4',
      },
    });

    return petition;
  }

  getWord() {
    const petition = this.hhtp.get(this.apiSpanishWordsUrl, {
      responseType: "json",
    });

    return petition;
  }

  getQuiz(limit: number, page: number, category: string) {
    const petition = this.hhtp.get(this.apiQuizUrl + "questions", {
      headers: {
        'Authorization': this.apiKey,
      },
      params: {
        limit: limit.toString(),
        page: page.toString(),
        category: category
      }
    });

    return petition;
  }

}
