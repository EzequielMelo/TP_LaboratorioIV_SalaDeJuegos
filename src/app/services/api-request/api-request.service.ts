import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {
  hhtp = inject(HttpClient)

  apiUrl = "https://api.github.com/users/"

  //datos: any = {};

  constructor() { }

  getUser(usuario: string) {
    const peticion = this.hhtp.get(this.apiUrl + usuario, {
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

}
