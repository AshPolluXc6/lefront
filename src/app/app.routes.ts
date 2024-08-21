import { Routes } from '@angular/router';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [

    {
        path:'',
        children:[
            {
                path:'',
                component: ClientHomeComponent,
                data:{title:'Cliente'},
            },
            {
                path:'cliente',
                component: ClientHomeComponent,
                data:{title:'Cliente'},
            }
        ]
    },
    {
        path:'admin',
        component: AdminComponent,
        data: {title:'Admin'}
    }

];
