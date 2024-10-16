import { RouterModule, Routes } from '@angular/router';
import { routes } from './app.routes';

import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeBodyComponent } from './home-body/home-body.component';
import { HomeAboutComponent } from './home-about/home-about.component';
import { FooterComponent } from './footer/footer.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { HomeContactComponent } from './home-contact/home-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeBodyComponent,
    HomeAboutComponent,
    FooterComponent,
    ConfirmDialogComponent,
    HomeContactComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(routes),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
