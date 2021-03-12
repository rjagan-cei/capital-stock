import { NgZone, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MemberService } from '../../service/member.service';

@Component({
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss']
})
export class MemberAddComponent implements OnInit, OnDestroy {

  onDestroy$ = new Subject();

  constructor(private formBuilder: FormBuilder, private memberService: MemberService, private ngZone: NgZone, private router: Router) { }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  memberForm: FormGroup;
  errorMessage: String;

  ngOnInit(): void {
    this.createMemberForm();
  }

  createMemberForm() {
    this.memberForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalAssets: ['', [Validators.required]],
      dateOfIncorporation: ['', [Validators.required]],
      stockMembershipDate: ['', [Validators.required]]
    })
  }

  submitMemberForm(memberForm: FormGroup) {
    this.memberService.createMember(memberForm.value)
      .subscribe(
        response => {
          console.log(response);
          this.ngZone.run(() => { this.router.navigate(['/list-members']) });
        },
        error => {
          this.errorMessage = error;
        });
  }

}
