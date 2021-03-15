import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MemberService } from './service/member.service';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { MemberCreateComponent } from './components/member-create/member-create.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberListComponent } from './components/member-list/member-list.component';
import { MemberAddComponent } from './container/member-add/member-add.component';
import { MemberTableComponent } from './container/member-table/member-table.component';
import { MemberUpdateComponent } from './container/member-update/member-update.component';
import { MemberRoutingModule } from './member-routing.module';

@NgModule({
  declarations: [
    MemberCreateComponent,
    MemberDetailsComponent,
    MemberListComponent,
    MemberTableComponent,
    MemberAddComponent,
    MemberUpdateComponent
  ],
  imports: [
    MemberRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    FlexLayoutModule
  ],
  providers: [MemberService, { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MemberModule { }
