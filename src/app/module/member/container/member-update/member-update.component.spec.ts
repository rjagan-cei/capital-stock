import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { mockedMember } from 'src/app/shared/model/member';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { MemberService } from '../../service/member.service';

import { MemberUpdateComponent } from './member-update.component';

describe('update member form - child/presentation component', () => {
  let service: MemberService;
  const formBuilder: FormBuilder = new FormBuilder();
  let component: MemberUpdateComponent;
  let fixture: ComponentFixture<MemberUpdateComponent>;
  let mockRouter;
  let route: ActivatedRoute;

  beforeEach(async () => {
    mockRouter = { navigate: jasmine.createSpy('navigate') };
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [ MemberUpdateComponent ],
      providers: [{ provide: Router, useValue: mockRouter }, { provide: FormBuilder, useValue: formBuilder },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => { id: 1 }}}}}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberUpdateComponent);
    component = fixture.componentInstance;
    component.memberForm = formBuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalAssets: ['', [Validators.required]],
      dateOfIncorporation: ['', [Validators.required]],
      stockMembershipDate: ['', [Validators.required]]
    });

    route = TestBed.get(ActivatedRoute);
    service = TestBed.get(MemberService);
    spyOn(component.route.snapshot.paramMap, 'get').and.returnValue('1');
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
    expect(component.memberForm.valid).toBeTruthy();
  });

  it('should navigate to `list-members` route, if member updation is successful', async () => {
    spyOn(service, 'updateMember').and.returnValue(of(mockedMember))
    component.updateMemberForm(component.memberForm);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/list-members']);
    expect(service.updateMember).toHaveBeenCalled();
  });

  it('assume service call to API throws Error while updating a member', async () => {
    spyOn(service, 'updateMember').and.returnValue(throwError('API Error'))
    component.updateMemberForm(component.memberForm);
    expect(service.updateMember).toHaveBeenCalled();
    expect(component.errorMessage).toBe('API Error');
  });
  
});
