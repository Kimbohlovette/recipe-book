import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipesService: RecipeService, private authService: AuthService){}

  storeRecipes(){
    const recipes: Recipe[] = this.recipesService.getRecipes();
    this.http.put('https://recipe-book-db-60812-default-rtdb.firebaseio.com/recipes.json', recipes)
              .subscribe(
                response=>{
                  console.log(response);
                }
              );
  }

  fetchRecipes(){
      return this.authService.user.pipe(
        take(1),
        exhaustMap(user=>{
          return this.http.get<Recipe[]>('https://recipe-book-db-60812-default-rtdb.firebaseio.com/recipes.json',{
            params: new HttpParams().set('auth',String(user?.token))
          })
        }),
        map(
        recipes =>{
          return recipes.map(
            recipe =>{
              return {...recipe, ingredients: recipe.ingredients? recipe.ingredients: []}
            }
          )
        }
      ),
      tap( recipes=>{
          this.recipesService.setRecipes(recipes);
      })
    );
  }

}