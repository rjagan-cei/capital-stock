import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();
 
  constructor() { }
 
  ngOnInit() {
  }
 
  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }

}
