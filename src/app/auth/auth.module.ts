import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path: '', component: AuthComponent}
]
@NgModule({
  declarations: [
    AuthComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    AuthComponent,
    RouterModule
  ]
})

export class AuthModule {
}