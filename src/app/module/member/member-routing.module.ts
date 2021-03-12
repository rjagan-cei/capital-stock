import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberAddComponent } from './container/member-add/member-add.component';
import { MemberTableComponent } from './container/member-table/member-table.component';
import { MemberUpdateComponent } from './container/member-update/member-update.component';

export const routes: Routes = [
  { path: 'list-members', component: MemberTableComponent },
  { path: 'edit-member/:id', component: MemberUpdateComponent },
  { path: 'create-member', component: MemberAddComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }
