import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Animal } from '../interfaces/animal.interface';

@Injectable({
  providedIn: 'root',
})
export class MyApiNodeService {
  URL = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  crearAnimal(): any {
    return this.http.post(`${this.URL}crear`, {}, { responseType: 'text' });
  }

  getAnimal(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.URL).pipe(
      map((data: any) => {
        return data.map((animal: any) => {
          return {
            tipo: animal.tipo,
            estado: animal.estado,
          };
        });
      })
    );
  }
}
