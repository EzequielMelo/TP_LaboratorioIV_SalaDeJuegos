import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { QuizResponse } from '../../models/quiz-response.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  http = inject(HttpClient);

  apiGithubUrl = 'https://api.github.com/users/';
  apiSpanishWordsUrl =
    'https://clientes.api.greenborn.com.ar/public-random-word?c=1';
  apiQuizUrl = 'https://api.quiz-contest.xyz/';
  apiKey = environment.apiQuiz.apiKey || '';

  getUser(usuario: string) {
    const petition = this.http.get(this.apiGithubUrl + usuario, {
      responseType: 'json',
      params: {
        ejemplo: 'labo4',
      },
    });

    return petition;
  }

  getWord() {
    const petition = this.http.get(this.apiSpanishWordsUrl, {
      responseType: 'json',
    });

    return petition;
  }

  getQuiz(
    limit: number,
    page: number,
    category: string
  ): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(this.apiQuizUrl + 'questions', {
      headers: {
        Authorization: this.apiKey,
      },
      params: {
        limit: limit.toString(),
        page: page.toString(),
        category: category,
      },
    });
  }
}
