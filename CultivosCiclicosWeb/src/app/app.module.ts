import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ErrorPageComponent } from './shared/error-page/error-page.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { RegistroSiembraComponent } from './registro-siembra/registro-siembra.component';
import { ListadoComponent } from './registro-siembra/pages/listado/listado.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    RegistroSiembraComponent,
    ListadoComponent
  ],
  imports: [
    NgxDatatableModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDatepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
