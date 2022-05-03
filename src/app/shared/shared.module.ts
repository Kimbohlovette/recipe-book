import { NgModule } from "@angular/core";
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';
import { DropdownDirective } from './dropdown.directive';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    PlaceholderDirective,
    DropdownDirective,
    LoadingSpinnerComponent,
    AlertComponent,
],
imports: [
  CommonModule
],
exports: [
  PlaceholderDirective,
  DropdownDirective,
  LoadingSpinnerComponent,
  CommonModule,
  AlertComponent,
],

entryComponents: [AlertComponent]
})

export class SharedModule {

}