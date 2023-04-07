import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';

const routes: Routes = [
    {
      path: 'main',
      loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) 
  },
    {
      path: 'contact',
      loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule) 
  },
    {
      path: 'gallery',
      loadChildren: () => import('./pages/gallery/gallery.module').then(m => m.GalleryModule),
      canActivate:[AuthGuard]
  },
    {
      path: 'routes',
      loadChildren: () => import('./pages/routes/routes.module').then(m => m.RoutesModule) 
  },
    {
      path: 'signup',
      loadChildren: () => import('./pages/signup/signup.module').then(m => m.SignupModule) 
  },
  {
    path:'',
    loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), 
    
    },
  {
      path: '**',
      loadChildren: () => import('./pages/main/main.module').then(m => m.MainModule) 
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
