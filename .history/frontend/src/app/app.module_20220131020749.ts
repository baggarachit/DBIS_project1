import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PartbComponent } from './partb/partb.component';

@NgModule({
  declarations: [
    AppComponent,
    PartbComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [PartbComponent, AppComponent]
})
export class AppModule { }
