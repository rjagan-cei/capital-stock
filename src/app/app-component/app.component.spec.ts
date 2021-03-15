import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularMaterialModule } from '../shared/module/material/material.module';

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
        AppComponent
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
