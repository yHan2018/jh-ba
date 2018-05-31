import { Routes } from '@angular/router';

import { errorRoute, JhiMainComponent } from './layouts';

import {
    NbAuthComponent,
    NbLoginComponent,
    NbLogoutComponent,
    NbRegisterComponent,
    NbRequestPasswordComponent,
    NbResetPasswordComponent,
  } from '@nebular/auth';
  

export const navbarRoute: Routes = [
    {
        path: '',
        component: JhiMainComponent,
    },
    
      ...errorRoute
];
