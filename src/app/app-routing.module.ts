import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberRoutingModule } from './module/member/member-routing.module';
import { LoginComponent } from './module/user/components/login/login.component';
import { RegistrationComponent } from './module/user/components/registration/registration.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  { path: "member", loadChildren: () =>
      import("./module/member/member.module").then(m => m.MemberModule)
  }
];

@NgModule({
  imports: [MemberRoutingModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
