import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberCreateComponent implements OnInit {

  StatusArray = [];

  @Input() errorMessage: string;
  @Input() memberForm: FormGroup;
  @Output() submit: EventEmitter<any> = new EventEmitter();

  @ViewChild('resetMemberForm') resetForm: any;

  constructor() { }

  ngOnInit(): void {
    this.StatusArray = [{ "id": 1, "name": "Active" }, { "id": 2, "name": "Inactive" }, { "id": 3, "name": "Pending" }];
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

  submitMemberForm() {
    if (this.memberForm.valid) {
      this.submit.emit(this.memberForm);
    }
  }

}
