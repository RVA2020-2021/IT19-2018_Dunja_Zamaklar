import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StatusComponent } from './components/status/status.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list'
import { MatExpansionModule } from '@angular/material/expansion';
import { AboutComponent } from './components/core/about/about.component';
import { HomeComponent } from './components/core/home/home.component';
import { AuthorComponent } from './components/core/author/author.component';
import { FakultetComponent } from './components/fakultet/fakultet.component';
import { StudentComponent } from './components/student/student.component';
import { DepartmanComponent } from './components/departman/departman.component';
import { MatTableModule} from '@angular/material/table'
import {HttpClientModule} from '@angular/common/http'
import{MatToolbarModule} from '@angular/material/toolbar';
import { StatusDialogComponent } from './components/dialogs/status-dialog/status-dialog.component'
import{MatSnackBarModule} from '@angular/material/snack-bar'
import{MatDialogModule} from '@angular/material/dialog';
import { FakultetDialogComponent } from './components/dialogs/fakultet-dialog/fakultet-dialog.component'
import {FormsModule} from '@angular/forms'
import {MatFormFieldModule} from '@angular/material/form-field'



@NgModule({
  declarations: [
    AppComponent,
    StatusComponent,
    AboutComponent,
    HomeComponent,
    AuthorComponent,
    FakultetComponent,
    StudentComponent,
    DepartmanComponent,
    StatusDialogComponent,
    FakultetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatExpansionModule,
    MatTableModule,
    HttpClientModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
