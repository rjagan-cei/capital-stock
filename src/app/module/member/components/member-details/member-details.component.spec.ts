import { TestBed, ComponentFixture } from '@angular/core/testing';

import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { empty, of } from 'rxjs';
import { MemberDetailsComponent } from './member-details.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { MemberService } from '../../service/member.service';

describe('update member form - parent/smart component', () => {
  let service: MemberService;
  let component: MemberDetailsComponent;
  let fixture: ComponentFixture<MemberDetailsComponent>;
  let route: ActivatedRoute;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [MemberDetailsComponent],
      providers: [{ provide: FormBuilder, useValue: formBuilder },
      { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => { id: 1 } } } } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberDetailsComponent);
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

  it('should render title from span tag', () => {
    const title = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(title.innerHTML).toBe('Edit Member');
  });

  it('should have called update emit', async () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(component.update, 'emit').and.callThrough();
    fixture.detectChanges();
    component.updateMemberForm();
    expect(component.update.emit).toHaveBeenCalled();
  });

  it('should not call service API on update when user clicks window cancel', async () => {
    spyOn(service, 'updateMember').and.returnValue(of(empty()));
    spyOn(window, 'confirm').and.returnValue(false);
    component.updateMemberForm();
    expect(service.updateMember).toHaveBeenCalledTimes(0);
  });

});


