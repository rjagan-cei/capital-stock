import { TestBed, async, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

//importing routes
import { routes } from './app-routing.module';

//importing components and services
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app-component/app.component';
import { MemberCreateComponent } from './module/member/components/member-create/member-create.component';
import { MemberDetailsComponent } from './module/member/components/member-details/member-details.component';
import { MemberListComponent } from './module/member/components/member-list/member-list.component';
import { MemberAddComponent } from './module/member/container/member-add/member-add.component';
import { MemberTableComponent } from './module/member/container/member-table/member-table.component';
import { MemberUpdateComponent } from './module/member/container/member-update/member-update.component';
import { MemberService } from './module/member/service/member.service';
import { LoginComponent } from './module/user/components/login/login.component';
import { RegistrationComponent } from './module/user/components/registration/registration.component';
import { FooterComponent } from './shared/module/common/components/footer/footer.component';
import { HeaderComponent } from './shared/module/common/components/header/header.component';
import { AngularMaterialModule } from './shared/module/material/material.module';
import { SideMenuComponent } from './shared/module/common/components/side-menu/side-menu.component';
import { MemberRoutingModule } from './module/member/member-routing.module';


describe('Verify All App Routes', () => {
    let router: Router;
    let fixture: ComponentFixture<AppComponent>;
    let location: Location;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule.withRoutes(routes), MemberRoutingModule,
                HttpClientTestingModule,
                AngularMaterialModule,
                BrowserAnimationsModule
            ],
            declarations: [
                AppComponent,
                MemberListComponent,
                MemberDetailsComponent,
                MemberCreateComponent,
                HeaderComponent,
                SideMenuComponent,
                FooterComponent,
                MemberTableComponent,
                MemberAddComponent,
                MemberUpdateComponent,
                LoginComponent,
                RegistrationComponent
            ],
            providers: [MemberService]
        }).compileComponents();
    }));

    beforeEach(() => {
        router = TestBed.get(Router);
        location = TestBed.get(Location);
        fixture = TestBed.createComponent(AppComponent);
        router.initialNavigation();
    });

    it('should navigate to "" redirects you to `/login`', fakeAsync(() => {
        router.navigate(['']);
        tick();
        expect(location.path()).toBe('/login');
    }));

    it('should navigate to `/register` takes you to /register', fakeAsync(() => {
        router.navigate(['register']);
        tick();
        expect(location.path()).toBe('/register');
    }));

    it('should navigate to `/create-member` takes you to /create-member', fakeAsync(() => {
        router.navigate(['create-member']);
        tick();
        expect(location.path()).toBe('/create-member');
    }));

    it('should navigate to `/edit-member/:id` takes you to /edit-member', fakeAsync(() => {
        router.navigate(['edit-member/1']);
        tick();
        expect(location.path()).toBe('/edit-member/1');
    }));

    it('should test component with Activated Route', fakeAsync(() => {
        fixture.detectChanges();
        router.navigate(['list-members']);
        tick();
        expect(location.path()).toBe('/list-members');
    }));

});