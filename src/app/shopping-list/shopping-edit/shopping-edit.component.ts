import {
  Component,
  OnInit,
  ElementRef,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription!: Subscription;
  editMode: boolean = false;
  editedItemIndex!: number;
  editedItem!: Ingredient;
  @ViewChild('f') slForm!:NgForm
  constructor(private slService: ShoppingListService, private router: Router) { }
  
  ngOnInit() {
    this.subscription = this.slService.startedEditing.subscribe(
      (index)=>{
        this.editMode = true;
        this.editedItemIndex = index;
        this.editedItem = this.slService.getIngredient(index)
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      }
    )
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editedItemIndex, newIngredient);
    }else{
       this.slService.addIngredient(newIngredient);
    }
    form.reset();
    this.editMode = false;
  }

  onClearForm(){
    // this.slService.clearIngredients()
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete(){
    this.slService.deleteIngredient(this.editedItemIndex);
    this.editMode = false;
    this.slForm.reset()
  }

}
