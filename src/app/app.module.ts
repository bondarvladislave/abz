import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {HomePageComponent} from './pages/home-page/home-page.component';
import { FooterComponent } from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule, MatInputModule} from '@angular/material';
import {MatSelectModule} from '@angular/material/select';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TimeagoModule} from 'ngx-timeago';
import {InterceptorService} from './services/interceptor.service';
import { NgxMaskModule } from 'ngx-mask';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { NavComponent } from './components/nav/nav.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ClickOutsideDirective } from './heplers/click-outside.directive';
// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    FooterComponent,
    HeaderComponent,
    NavComponent,
    ConfirmDialogComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule,
    TimeagoModule.forRoot(),
    NgxMaskModule.forRoot(),
    MaterialFileInputModule,
    MatDialogModule
  ],
  entryComponents: [ConfirmDialogComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
