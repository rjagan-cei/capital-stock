import { Component, OnInit, ViewChild, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  StatusArray = [];

  @Input() errorMessage: string;
  @Input() memberForm: FormGroup;
  @Output() update: EventEmitter<any> = new EventEmitter();
  currentMember = null;

  @ViewChild('resetMemberForm') resetForm;

  constructor(public formbuilder: FormBuilder, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.updateForm();
    this.StatusArray = [{ "id": 1, "name": "Active" }, { "id": 2, "name": "Inactive" }, { "id": 3, "name": "Pending" }];
  }

  updateForm() {
    this.memberForm = this.formbuilder.group({
      name: ['', [Validators.required]],
      status: ['', [Validators.required]],
      totalAssets: ['', [Validators.required]],
      dateOfIncorporation: ['', [Validators.required]],
      stockMembershipDate: ['', [Validators.required]]
    })
  }

  /* Date */
  formatDate(fieldName: string | (string | number)[], e: { target: { value: string | number | Date; }; }) {
    var convertedDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.memberForm.get(fieldName).setValue(convertedDate, {
      onlyself: true
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.memberForm.controls[controlName].hasError(errorName);
  }

  updateMemberForm() {
    if (window.confirm('Are you sure you want to update?')) {
      if (this.memberForm.valid) {
        this.update.emit(this.memberForm);
      }
    }
  }

}
