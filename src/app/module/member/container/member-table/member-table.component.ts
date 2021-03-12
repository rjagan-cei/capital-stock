import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/shared/model/member';
import { MemberService } from '../../service/member.service';

@Component({
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss']
})

export class MemberTableComponent implements OnInit {

  members$: Observable<Member[]>;
  errorMessage: String;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.getAllMembers();
  }

  getAllMembers() {
    this.memberService.getAllMembers().subscribe(
      response => {
        this.members$ = response;
        console.log(response);
      },
      error => {
        this.errorMessage = error;
      });
  }

  deleteMember(id: any) {
    this.memberService.deleteMember(id).subscribe(response => {
      console.log(response);
    }, error => { this.errorMessage = error });
  }

}
