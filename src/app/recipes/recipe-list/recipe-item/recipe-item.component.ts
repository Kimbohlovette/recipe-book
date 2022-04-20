import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeItem')
  recipe!: Recipe;
  index!: number

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.index = +this.recipeService.getRecipes().indexOf(this.recipe)

  }

  onSelected() {
    this.recipeService.recipeSelected.emit(this.recipe);
  }

}
