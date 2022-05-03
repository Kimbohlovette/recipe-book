import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "../auth/auth.guard";
import { RecipeEditComponent } from "../recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "./recipes-resolver.service";
import { RecipesComponent } from "./recipes.component";
import { ResipeStartComponent } from "./resipe-start/resipe-start.component";


const routes: Routes = [  
  {path: '', component: RecipesComponent,
  canActivate:[AuthGuard],
  children: [
  {path: '', component: ResipeStartComponent},
  {path: 'new', component: RecipeEditComponent},
  {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService]},
  {path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService]}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule{

}