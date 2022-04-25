import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';
import { Subscription } from 'rxjs';
import { RecipesComponent } from '../../recipes.component';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem')
  recipe!: Recipe;
  index!: number
  subscription!: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.index = +this.recipeService.getRecipes().indexOf(this.recipe)
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[])=>{
        this.index = +recipes.indexOf(this.recipe)
      }
    )


  }

  onSelected() {
    this.recipeService.recipeSelected.next(this.recipe);
  }

}
