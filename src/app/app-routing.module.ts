import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [{
  path: '', children: [
    { path: 'home', component: HomeComponent },
    { path: 'user', redirectTo: '/user', pathMatch: 'full' },
    { path: 'member', loadChildren: './member/member.module#MemberModule', canLoad: [AuthGuard] },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
