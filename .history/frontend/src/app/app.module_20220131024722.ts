import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PartbComponent } from './partb/partb.component';

@NgModule({
  declarations: [
    AppComponent,
    PartbComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [PartbComponent]
})
export class AppModule { }
