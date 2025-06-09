import { Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoginPageComponent } from './core/auth/login-page/login-page.component';
import { ArticleComponent } from './features/article/article.component';
import { AuthGuard } from './core/guards/guard.service';
import { ArticleEditorComponent } from './features/article-editor/article-editor.component';
import { BlankComponent } from './components/blank/blank';
import { ArticleReadComponent } from './features/article-read/article-read.component';

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
        path: 'admin',
        component: AdminComponent,
        children: [
            {
                path: 'articles',
                component: ArticleComponent
            },
            {
            path: 'editor/:id',
            component: ArticleEditorComponent
            }
        ]
    },
    { 
        path: 'login', 
        component: LoginPageComponent,
        data:  {title:'Login'}
    },
    { 
        path: 'editor', 
        component: ArticleEditorComponent,
        data:  {title:'Editor'}
    }, 
    { 
        path: 'read', 
        component: ArticleReadComponent,
        data:  {title:'read'}
    }, 
    {
    path: 'blank',
    component: BlankComponent 
    }
];
