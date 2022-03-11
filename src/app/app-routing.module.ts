//Module
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Service
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ServerResolver } from './servers/server/serve-resolver.service';

//Component
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { Page404Component } from './page404/page404.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { ErrorPageComponent } from './error-page/error-page.component';

const appRoutes : Routes =  [
  { path : '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent},
  { path : 'users', component : UsersComponent,
    children:[
      { path : ':id/:name', component : UserComponent}
    ]
  },
  { path : 'servers',
    // canActivate:[AuthGuard], 整個servers 頁面都被路由守衛限制
    canActivateChild: [AuthGuard], // 只有servers的child被限制
    component : ServersComponent,
    children:[
      { path : ':id' , component : ServerComponent, resolve : {server : ServerResolver}},
      { path : ':id/edit' , component : EditServerComponent, canDeactivate : [CanDeactivateGuard]},
    ]
  },
  { path : 'about', component : AboutComponent},
  { path : 'not-found', component : ErrorPageComponent, data : {message : 'Page not found!'}},
  { path : '**', redirectTo: '/not-found'},
];

@NgModule({
imports:[
  RouterModule.forRoot(appRoutes)
  // RouterModule.forRoot(appRoutes,{enableTracing: true})
],
exports:[RouterModule]
})

export class AppRoutingModule {
}
