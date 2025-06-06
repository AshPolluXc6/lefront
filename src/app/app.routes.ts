import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginPageComponent } from './core/auth/login-page/login-page.component';
import { ArticleComponent } from './features/article/article.component';
import { AuthGuard } from './core/guards/guard.service';
import { ArticleEditorComponent } from './features/article-editor/article-editor.component';

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
            
        ],
        canActivate:[AuthGuard]
    }, 
    {
        path:'admin',
        component: AdminComponent,
        data: {title:'Admin'},
        // canActivate:[AuthGuard]
    },
    { 
        path: 'login', 
        component: LoginPageComponent,
        data:  {title:'Login'}
    },
    { 
        path: 'article', 
        component: ArticleComponent,
        data:  {title:'Article'}
    },
    { 
        path: 'editor', 
        component: ArticleEditorComponent,
        data:  {title:'Editor'}
    },

];
