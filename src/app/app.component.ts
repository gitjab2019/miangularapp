import { Component, NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MyApiNodeService } from './services/my-api-node.service';
import { CommonModule } from '@angular/common';
import { Animal } from './interfaces/animal.interface';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'miangularapp';
  URL = 'http://localhost:3000/';
  animales: Animal[] = [];

  constructor(private myAnimalService: MyApiNodeService) {
    console.log('AppComponent initialized');
  }

  crearAnimal(): void {
    this.myAnimalService.crearAnimal().subscribe((data: any) => {
      console.log(data);
    });
    console.log('Animal created!');
  }

  cargarAnimales(): void {
    this.myAnimalService.getAnimal().subscribe({
      next: (data: Animal[]) => {
        this.animales = data;
      },
      error: (error) => console.error('Error fetching animals:', error),
    });
    console.log('Animal listed!');
  }
}
