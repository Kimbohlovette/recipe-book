import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingListRoutingModule } from './shoppping-list-routing.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ShoppingListRoutingModule,
    SharedModule,
 
  ],
  exports: [],
})

export class ShoppingListModule{

}