import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginPageComponent } from './core/auth/login-page/login-page.component';

export const routes: Routes = [

    {
        path: '',
        children:[
            { 
                path: '',
                loadChildren: () => import('./client/client-routing').then(m => m.routes),
                data:{title:'Home'}
            }, 
            {
                path: 'home',
                loadChildren: () => import('./client/client-routing').then(m => m.routes),
                data:{title:'Home'}
            }
            
        ]
    }, 
    {
        path:'admin',
        component: AdminComponent,
        data: {title:'Admin'}
    },
    { 
        path: 'login', 
        component: LoginPageComponent,
        data:  {title:'Login'}
    },

];
