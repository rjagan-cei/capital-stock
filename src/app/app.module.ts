import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app-component/app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './shared/module/material/material.module';
import { LoginComponent } from './module/user/components/login/login.component';
import { RegistrationComponent } from './module/user/components/registration/registration.component';
import { FooterComponent } from './shared/module/common/components/footer/footer.component';
import { HeaderComponent } from './shared/module/common/components/header/header.component';
import { SideMenuComponent } from './shared/module/common/components/side-menu/side-menu.component';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { NumericDirective } from './core/directives/numeric.directive';

@NgModule({
  declarations: [
    AppComponent,
    NumericDirective,
    HeaderComponent,
    SideMenuComponent,
    FooterComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    FlexLayoutModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
