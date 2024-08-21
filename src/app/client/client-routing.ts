import { Component } from '@angular/core';
import { Routes, Route } from '@angular/router';
import { ClientHomeComponent } from './client-home/client-home.component';



export const routes: Routes = [

    {
        path:"",
        children:[
            {
                path:"",
                component: ClientHomeComponent,
                data:{title:"Cliente"}
            },
            {
                path:"Cliente",
                component: ClientHomeComponent,
                data:{title:"Cliente"}
            }     
        ]
    }

];