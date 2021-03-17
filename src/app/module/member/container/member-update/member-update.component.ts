import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../service/member.service';

@Component({
  templateUrl: './member-update.component.html',
  styleUrls: ['./member-update.component.scss']
})
export class MemberUpdateComponent implements OnInit {

  memberForm: FormGroup;
  errorMessage: String;

  constructor(
    public formbuilder: FormBuilder,
    private memberService: MemberService,
    public route: ActivatedRoute, private ngZone: NgZone, private router: Router) {
    var id = this.route.snapshot.paramMap.get('id');
    this.memberService.getMemberById(id).subscribe(data => {
      this.memberForm = this.formbuilder.group({
        id: [data.id, [Validators.required]],
        name: [data.name, [Validators.required]],
        status: [data.status, [Validators.required]],
        totalAssets: [data.totalAssets, [Validators.required]],
        dateOfIncorporation: [data.dateOfIncorporation, [Validators.required]],
        stockMembershipDate: [data.stockMembershipDate, [Validators.required]]
      })
    })
  }

  ngOnInit(): void { }

  updateMemberForm(memberForm: FormGroup) {
    this.memberService.updateMember(memberForm.value.id, memberForm.value).subscribe(
      () => {
        this.ngZone.run(() => { this.router.navigate(['/list-members']) });
      },
      error => {
        this.errorMessage = error;
      });
  }

}
