import { TestBed, ComponentFixture } from '@angular/core/testing';

import { MemberService } from 'src/app/services/member.service';
import { AngularMaterialModule } from 'src/app/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, empty } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MemberListComponent } from './member-list.component';
import { By } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Member } from 'src/app/components/shared/model/member';


export let mockedMember: Member[] = [{
  id: 1,
  name: 'testMember1',
  status: 'Active',
  dateOfIncorporation: new Date(2021, 1, 15),
  stockMembershipDate: new Date(2021, 2, 15),
  totalAssets: 12345678.00
}];

describe('Members List', () => {
  let service: MemberService;
  let component: MemberListComponent;
  let fixture: ComponentFixture<MemberListComponent>;
  const dataSource = new MatTableDataSource<Member>(mockedMember) as any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NoopAnimationsModule, AngularMaterialModule],
      declarations: [MemberListComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberListComponent);
    component = fixture.componentInstance;
    service = TestBed.get(MemberService);
    fixture.detectChanges();
  });

  it('should render title from span tag', () => {
    const title = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(title.innerHTML).toBe('Members');
  });

  /* it('should delete the member by its id on window confirm', async () => {
    spyOn(component.delete, 'emit');
    spyOn(service, 'deleteMember').and.returnValue(of(empty()));
    spyOn(window, 'confirm').and.returnValue(true);
    let dataSource = new MatTableDataSource<Member>(mockedMember);
    component.deleteMember(1,1);
    expect(service.deleteMember).toHaveBeenCalled();
    expect(component.delete.emit).toHaveBeenCalled();
    expect(service.deleteMember).toHaveBeenCalledTimes(1);
  }); */

  it('should not call service API on window cancel', async () => {
    spyOn(service, 'deleteMember').and.returnValue(of(empty()));
    spyOn(component, 'setDataSource').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteMember(1,1);
    expect(service.deleteMember).toHaveBeenCalledTimes(0);
  });

});


