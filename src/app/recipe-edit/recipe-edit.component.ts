import { Component, OnInit } from '@angular/core';
import { AbstractControl, 
          FormArray, 
          FormControl, 
          FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { Validators } from '@angular/forms';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeEditForm!: FormGroup;
  controls!: AbstractControl[];

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=>{
        this.id = params['id'];
        this.editMode = params['id'] != null;
        this.initForm()
        this.controls  = this.getControls()
        // console.log(this.editMode);
      }
    );
  }

  private initForm(){
    const recipe: Recipe = this.recipeService.getRecipe(this.id);
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      recipeName = recipe['name'];
      recipeImagePath = recipe['imagePath'];
      recipeDescription = recipe['description'];
      if(recipe['ingredients']){
        for(let ingredient of recipe['ingredients']){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }

      this.recipeEditForm = new FormGroup({
        'name': new FormControl(recipeName, Validators.required),
        'imagePath': new FormControl(recipeImagePath, Validators.required),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': recipeIngredients
    });
  }

  getControls(){
    return (this.recipeEditForm.get('ingredients')as FormArray).controls;
  }
  onSubmit(){
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeEditForm.value)
    }else{
      this.recipeService.addRecipe(this.recipeEditForm.value)
      this.recipeEditForm.reset()
    }
    this.router.navigate(['../'], {relativeTo: this.route})
  }
  onAddIngredient(){
    (this.recipeEditForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null,[Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onCancel(){
    this.recipeEditForm.reset()
    this.editMode = false;
    this.router.navigate(['../'],{relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (this.recipeEditForm.get('ingredients') as FormArray).removeAt(index)
  }
}
