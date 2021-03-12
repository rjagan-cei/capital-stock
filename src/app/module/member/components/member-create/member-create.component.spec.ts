import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MemberCreateComponent } from './member-create.component';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularMaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from 'src/app/app-routing.module';
import { Member } from '../../../shared/model/member';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';

export let mockedMember: Member[] = [{
  id: 1,
  name: 'testMember1',
  status: 'Active',
  dateOfIncorporation: new Date(2021, 1, 15),
  stockMembershipDate: new Date(2021, 2, 15),
  totalAssets: 12345678.00
}];

describe('Create Member Form', () => {
  let component: MemberCreateComponent;
  let fixture: ComponentFixture<MemberCreateComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [MemberCreateComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberCreateComponent);
    component = fixture.componentInstance;
    component.memberForm = formBuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalAssets: ['', [Validators.required]],
      dateOfIncorporation: ['', [Validators.required]],
      stockMembershipDate: ['', [Validators.required]]
    });

    fixture.detectChanges();

    const controls = component.memberForm.controls;
    for (const control in controls) {
      controls[control].clearValidators();
      controls[control].updateValueAndValidity({ onlySelf: true });
      component.memberForm.updateValueAndValidity();
    }
  });

  it('should render title from span tag', () => {
    const title = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(title.innerHTML).toBe('Create Member');
  });

  it('should have called submit emit', async () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.submit, 'emit');
    fixture.detectChanges();
    component.submitMemberForm();
    expect(component.submit.emit).toHaveBeenCalled();
  });

});


