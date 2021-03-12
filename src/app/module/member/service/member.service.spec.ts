import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MemberService, memberBasePath } from './member.service';
import { Member } from '../components/shared/model/member';
import { of, empty } from 'rxjs';

describe('MemberService', () => {
  let service: MemberService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MemberService, Window],
    });

    service = TestBed.get(MemberService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should create the service', () => {
    expect(service).toBeTruthy();
    expect(httpMock).toBeTruthy();
  });


  // Create member..
  it('createMember() should POST and return data', () => {

    const mockedMember: Member[] = [
      {
        id: 1,
        name: 'testMember1',
        status: 'Active',
        dateOfIncorporation: new Date(2021, 1, 15),
        stockMembershipDate: new Date(2021, 2, 15),
        totalAssets: 1234567.00
      }
    ];

    let spy = spyOn(service, 'createMember').and.returnValue(of(mockedMember)).and.callThrough();

    service.createMember({
      id: null, name: 'testMember1', status: 'Active', dateOfIncorporation: new Date(2021, 1, 15), stockMembershipDate: new Date(2021, 2, 15), totalAssets: 1234567.00
    }).subscribe((resp: Member[]) => {
      expect(resp).toEqual(mockedMember);
      expect(resp[0].id).toEqual(1);
      expect(spy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath);
    expect(req.request.method).toBe('POST');
    req.flush(mockedMember);
  });


  // Get member by id..
  it('getMemberById() should GET and return data', () => {

    const mockedMember: Member[] = [
      {
        id: 1,
        name: 'testMember1',
        status: 'Active',
        dateOfIncorporation: new Date(2021, 1, 15),
        stockMembershipDate: new Date(2021, 2, 15),
        totalAssets: 1234567.00
      }
    ];

    let spy = spyOn(service, 'getMemberById').and.returnValue(of(mockedMember)).and.callThrough();
    service.getMemberById('1').subscribe((resp: any) => {
      expect(resp.length).toBe(1);
      expect(resp).toEqual(mockedMember);
      expect(spy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath + '/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockedMember);
  });


  // Update member..
  it('updateMember() should PUT and return data', () => {

    const mockedUpdatedMember: Member[] = [
      {
        id: 1,
        name: 'testMember1Updated',
        status: 'Active',
        dateOfIncorporation: new Date(2021, 1, 15),
        stockMembershipDate: new Date(2021, 2, 15),
        totalAssets: 1234567.00
      }
    ];

    let spy = spyOn(service, 'updateMember').and.returnValue(of(mockedUpdatedMember)).and.callThrough();
    service.updateMember(1, mockedUpdatedMember).subscribe((resp: Member[]) => {
      expect(resp).toEqual(mockedUpdatedMember);
      expect(resp[0].name).toEqual('testMember1Updated');
      expect(spy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath + '/update/1');
    expect(req.request.method).toBe('PUT');
    req.flush(mockedUpdatedMember);
  });


  // Get all members..
  it('getAllMembers() should GET and return all data', () => {

    const mockedMembers: Member[] = [
      {
        id: 1,
        name: 'testMember1',
        status: 'Active',
        dateOfIncorporation: new Date(2021, 1, 15),
        stockMembershipDate: new Date(2021, 2, 15),
        totalAssets: 1234567.00
      },
      {
        id: 2,
        name: 'testMember2',
        status: 'Pending',
        dateOfIncorporation: new Date(2021, 2, 15),
        stockMembershipDate: new Date(2021, 3, 15),
        totalAssets: 2345678.00
      },
      {
        id: 3,
        name: 'testMember3',
        status: 'Inactive',
        dateOfIncorporation: new Date(2021, 3, 15),
        stockMembershipDate: new Date(2021, 4, 15),
        totalAssets: 3456789.00
      }
    ];

    let spy = spyOn(service, 'getAllMembers').and.returnValue(of(mockedMembers)).and.callThrough();
    service.getAllMembers().subscribe((resp: any) => {
      expect(resp.length).toBe(3);
      expect(resp).toEqual(mockedMembers);
      expect(resp[0].status).toEqual('Active');
      expect(spy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath);
    expect(req.request.method).toBe('GET');
    req.flush(mockedMembers);
  });


  // Delete member by id..
  it('deleteMember() should delete on click of ok and return nothing', () => {
    let spy = spyOn(service, 'deleteMember').and.returnValue(of(empty())).and.callThrough();
    spyOn(window, 'confirm').and.returnValue(true);
    service.deleteMember('1').subscribe((resp: any) => {
      expect(resp.length).toBe(0);
      expect(resp).toEqual(empty());
      expect(spy).toHaveBeenCalled();
    });

    const req = httpMock.expectOne(`http://${window.location.hostname}:8001` + memberBasePath + '/1');
    expect(req.request.method).toBe('DELETE');
  });


  it('deleteMember() should not delete on click of cancel', () => {
    let spy = spyOn(service, 'deleteMember').and.returnValue(of(empty())).and.callThrough();
    spyOn(window, 'confirm').and.returnValue(false);
    expect(spy).not.toHaveBeenCalled();
  });


  afterEach(() => {
    httpMock.verify();
  });
  
});