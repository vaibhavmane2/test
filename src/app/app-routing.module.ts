import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router';
import { UserComponent } from './user/user.component'
import {BrowserModule} from '@angular/platform-browser'
import { AddEdituserComponent } from './user/add-edituser/add-edituser.component';
import { MaterialModule } from './material/material.module'
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { HeaderComponent } from './header/header.component';
import {ProgressComponent} from './user/progress/progress.component'
import { DeleteComponent } from './user/delete/delete.component';

const routes: Routes = [
  {path: 'home' , component: UserComponent},
  {path: '' , component: UserComponent , pathMatch: 'full'}
]
@NgModule({
  declarations: [UserComponent,AddEdituserComponent,HeaderComponent,ProgressComponent,DeleteComponent],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule,ReactiveFormsModule,FormsModule,HeaderComponent,ProgressComponent],
  entryComponents: [AddEdituserComponent,DeleteComponent]
})
export class AppRoutingModule { }
