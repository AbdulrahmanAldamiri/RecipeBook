import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEditing= new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index:number,ingredient:Ingredient){
    this.ingredients[index]=ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}