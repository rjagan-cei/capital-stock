import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { empty, of, throwError } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { MemberService } from '../../service/member.service';
import { MemberTableComponent } from './member-table.component';
import { mockedMember } from 'src/app/shared/model/member';

describe('list members - child/presentation component', () => {
  let service: MemberService;
  let component: MemberTableComponent;
  let fixture: ComponentFixture<MemberTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule, RouterTestingModule.withRoutes(routes)],
      declarations: [MemberTableComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberTableComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MemberService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should get all the members from service', async () => {
    spyOn(service, 'getAllMembers').and.returnValue(of({ mockedMember }))
    component.getAllMembers();
    expect(service.getAllMembers).toHaveBeenCalled();
    expect(service.getAllMembers).toHaveBeenCalledTimes(1);
  });

  it('assume service call to API throws Error on get all the members', async () => {
    spyOn(service, 'getAllMembers').and.returnValue(throwError('API Error'))
    component.getAllMembers();
    expect(service.getAllMembers).toHaveBeenCalled();
    expect(component.errorMessage).toBe('API Error');
  });

  it('should call service API to delete', async () => {
    spyOn(service, 'deleteMember').and.returnValue(of(empty()));
    component.deleteMember(1);
    expect(service.deleteMember).toHaveBeenCalledTimes(1);
  });

  it('assume service call to API throws Error on delete', async () => {
    spyOn(service, 'deleteMember').and.returnValue(throwError('API Error'))
    component.deleteMember(1);
    expect(service.deleteMember).toHaveBeenCalled();
    expect(component.errorMessage).toEqual('API Error');
  });
  
});
