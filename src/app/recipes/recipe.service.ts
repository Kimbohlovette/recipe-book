import { EventEmitter, Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable(
  {providedIn: 'root'}
)
export class RecipeService {
  recipeSelected: Subject<Recipe> = new Subject();
  recipesChanged: Subject<Recipe[]> = new Subject()

  private recipes: Recipe[] = [
    new Recipe(
      'Tasty Schnitzel',
      'A super-tasty Schnitzel - just awesome!',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]),
    new Recipe('Big Fat Burger',
      'What else you need to say?',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Buns', 2),
        new Ingredient('Meat', 1)
      ]),
    new Recipe('Endomi Sea Food', 'Some sweet Endomie sea food with matah', 'https://www.indomie.com/uploads/recipe/indomie-seafood-with-sambal-matah_detail1_093852985.png',[
      new Ingredient('Crayfish', 3),
      new Ingredient('Egg', 3),
      new Ingredient('Endomi', 2),
      new Ingredient('Onion', 1),
      new Ingredient('Lemon', 3),
      new Ingredient('Pepper', 5)
    ])
  ];

  constructor(private slService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index]
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, recipe: Recipe){
    this.recipes[index]= recipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

}
