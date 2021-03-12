import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { empty, Observable, of, throwError } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { Member } from 'src/app/components/shared/model/member';
import { AngularMaterialModule } from 'src/app/material.module';
import { MemberService } from 'src/app/services/member.service';

import { MemberTableComponent } from './member-table.component';

export let mockedMember: Member[] = [{
  id: 1,
  name: 'testMember1',
  status: 'Active',
  dateOfIncorporation: new Date(2021, 1, 15),
  stockMembershipDate: new Date(2021, 2, 15),
  totalAssets: 12345678.00
}];

describe('MemberTableComponent', () => {
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
