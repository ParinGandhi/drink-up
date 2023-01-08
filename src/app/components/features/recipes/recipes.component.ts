import { Component } from '@angular/core';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss'],
})
export class RecipesComponent {
  recipes = [
    {
      name: 'Old fashion',
      id: 'old-fasion',
      age: '5 days',
    },
    {
      name: 'Long island ice tea',
      id: 'long-island-ice-tea',
      age: '7 days',
    },
    {
      name: 'Pina colada',
      id: 'pina-colada',
      age: '3 days',
    },
  ];
}
