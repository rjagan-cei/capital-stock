import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from '../shared/module/material/material.module';
import { FooterComponent } from '../shared/module/common/components/footer/footer.component';
import { HeaderComponent } from '../shared/module/common/components/header/header.component';
import { SideMenuComponent } from '../shared/module/common/components/side-menu/side-menu.component';
import { MemberCreateComponent } from '../module/member/components/member-create/member-create.component';
import { MemberDetailsComponent } from '../module/member/components/member-details/member-details.component';
import { MemberListComponent } from '../module/member/components/member-list/member-list.component';
import { MemberAddComponent } from '../module/member/container/member-add/member-add.component';
import { MemberTableComponent } from '../module/member/container/member-table/member-table.component';
import { MemberUpdateComponent } from '../module/member/container/member-update/member-update.component';
import { LoginComponent } from '../module/user/components/login/login.component';
import { RegistrationComponent } from '../module/user/components/registration/registration.component';

describe('AppComponent', () => {

  beforeEach(waitForAsync( () => {
   TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        AngularMaterialModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent,
        MemberCreateComponent,
        MemberDetailsComponent,
        MemberListComponent,
        HeaderComponent,
        SideMenuComponent,
        FooterComponent,
        MemberTableComponent,
        MemberAddComponent,
        MemberUpdateComponent,
        LoginComponent,
        RegistrationComponent
      ],
    }).compileComponents();

  }));

  it('should create the app', () => {
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'capital-stock'`, () => {
    const app = TestBed.createComponent(AppComponent).debugElement.componentInstance;
    expect(app.title).toEqual('capital-stock');
  });

});
