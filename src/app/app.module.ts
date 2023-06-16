import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Form217DetailComponent } from './form217-detail/form217-detail.component';
import { Form217ListComponent } from './form217-list/form217-list.component';

@NgModule({
  declarations: [AppComponent, Form217ListComponent, Form217DetailComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
