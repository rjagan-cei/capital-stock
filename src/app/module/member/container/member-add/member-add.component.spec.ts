import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/material.module';
import { MemberService } from 'src/app/services/member.service';
import { mockedMember } from '../../components/member-create/member-create.component.spec';

import { MemberAddComponent } from './member-add.component';

describe('MemberAddComponent', () => {
  let service: MemberService;
  let component: MemberAddComponent;
  let fixture: ComponentFixture<MemberAddComponent>;
  const formBuilder: FormBuilder = new FormBuilder();
  let mockRouter;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ MemberAddComponent ],
      providers: [{ provide: Router, useValue: mockRouter }, { provide: FormBuilder, useValue: formBuilder }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberAddComponent);
    component = fixture.componentInstance;
    component.memberForm = formBuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalAssets: ['', [Validators.required]],
      dateOfIncorporation: ['', [Validators.required]],
      stockMembershipDate: ['', [Validators.required]]
    });

    service = TestBed.get(MemberService);
    fixture.detectChanges();

    const controls = component.memberForm.controls;
    for (const control in controls) {
      controls[control].clearValidators();
      controls[control].updateValueAndValidity({ onlySelf: true });
      component.memberForm.updateValueAndValidity();
    }
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should create a FormGroup comprised of FormControls', () => {
    component.ngOnInit();
    expect(component.memberForm instanceof FormGroup).toBe(true);
  });

  it('should navigate to `list-members` route, if member creation is successful', async () => {
    spyOn(service, 'createMember').and.returnValue(of(mockedMember))
    component.submitMemberForm(component.memberForm);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-members']);
    expect(service.createMember).toHaveBeenCalled();
  });

  it('assume service call to API throws Error while creating a member', async () => {
    spyOn(service, 'createMember').and.returnValue(throwError('API Error'));
    component.submitMemberForm(component.memberForm);
    expect(service.createMember).toHaveBeenCalled();
    expect(component.errorMessage).toBe('API Error');
  });

});
