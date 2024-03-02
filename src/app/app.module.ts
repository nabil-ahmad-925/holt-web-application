import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './auth/auth.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SidenavModule } from './sidenav/sidenav.module';
import { AddNewJobModule } from './shared/add-new-job/add-new-job.module';
import { DialogService } from 'primeng/dynamicdialog';
import { ToastrModule } from 'ngx-toastr';
 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    BrowserAnimationsModule,
    AuthModule,
    DashboardModule,
    FontAwesomeModule,
    SidenavModule,
    AddNewJobModule ,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [DialogService],
  bootstrap: [AppComponent]
})
export class AppModule { }
