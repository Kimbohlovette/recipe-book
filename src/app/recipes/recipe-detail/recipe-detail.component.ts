import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe!: Recipe
  id!: number

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = +params['id']
        this.recipe = this.recipeService.getRecipe(this.id)
      }
    )
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[])=>{
        this.recipe = recipes[this.id]
      }
    )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDelete(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../../'],{relativeTo: this.route})
  }

}
