import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RouterModule } from '@angular/router';
import { MenuModule } from 'primeng/menu';
 
import { SvgIconService } from '../shared/svg-icon/svg-icon.service';
import { AngularSvgIconModule } from 'angular-svg-icon';


@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MenuModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule ,
    AngularSvgIconModule
  ],
  exports:[SidenavComponent],
  providers:[SvgIconService]
})
export class SidenavModule { }
