import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Member } from 'src/app/shared/model/member';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MemberListComponent implements OnInit, OnChanges {

  @Input() errorMessage: string;
  @Input() members: Member[];
  @Output() delete: EventEmitter<Member> = new EventEmitter();

  currentMember = null;
  currentIndex = -1;
  dataSource: MatTableDataSource<Member>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['memberID', 'memberName', 'stockMembershipDate', 'dateOfIncorporation', 'totalAssets', 'status', 'action'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.members && changes.members.currentValue) {
      this.setDataSource();
    }
  }

  ngOnInit(): void {}

  setDataSource() {
    this.dataSource = new MatTableDataSource(this.members);
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
  }

  deleteMember(index: number, e: any) {
    if (window.confirm('Are you sure you want to delete?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.delete.emit(e.id);
    }
  }

  refresh(): void {
    this.currentMember = null;
    this.currentIndex = -1;
  }

  setCurrentMember(member: any, index: any): void {
    this.currentMember = member;
    this.currentIndex = index;
  }

}
