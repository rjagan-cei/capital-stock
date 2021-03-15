import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, empty } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MemberListComponent } from './member-list.component';
import { By } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { Member, mockedMember } from 'src/app/shared/model/member';
import { AngularMaterialModule } from 'src/app/shared/module/material/material.module';
import { MemberService } from '../../service/member.service';

describe('list members - parent/smart component', () => {
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

  it('should not call service API on delete when user clicks window cancel', async () => {
    spyOn(service, 'deleteMember').and.returnValue(of(empty()));
    spyOn(component, 'setDataSource').and.callThrough();
    spyOn(window, 'confirm').and.returnValue(false);
    component.deleteMember(1,1);
    expect(service.deleteMember).toHaveBeenCalledTimes(0);
  });

});


