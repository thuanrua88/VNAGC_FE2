import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './views/client/pages/authen/register/register.component';
import { BaseComponent } from './views/client/component/base/base.component';
import { LoginComponent } from './views/client/pages/authen/login/login.component';
import { CheckoutComponent } from './views/client/pages/checkout/checkout.component';
import { HomeComponent } from './views/client/pages/home/home.component';
import { ProductDetailComponent } from './views/client/pages/product-detail/product-detail.component';
import { ActiveAccountComponent } from './views/client/pages/authen/active-account/active-account.component';
import { CartComponent } from './views/client/pages/cart/cart.component';
import { ShopComponent } from './views/client/pages/shop/shop.component';
import { AuthenGuard } from './core/guard/authen.guard';
import { UserGuard } from './core/guard/user.guard';
import { testComponent } from './views/client/pages/testComponent.component';

const routes: Routes = [
  {
    canActivate: [AuthenGuard],
    path: '',
    loadChildren: () => import('./views/admin/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'test',
        component: testComponent
      },
      {
        path: 'product-detail',
        component: ProductDetailComponent
      },
      {
        canActivate: [UserGuard],
        path: 'checkout',
        component: CheckoutComponent
      },
      {
        path: 'shop',
        component: ShopComponent
      },
      {
        path: 'blogs',
        loadChildren: () => import('./views/client/pages/blogs/blogs.module').then(m => m.BlogsModule),
      },
      // {
      //   canActivate: [UserGuard],
      //   path: 'profile',
      //   loadChildren: () => import('./views/client/pages/profile/profile.module').then(m => m.ProfileModule),
      // },
      {
        canActivate: [UserGuard],
        path: 'cart',
        component: CartComponent
      },
      {
        path: 'login',
        component: LoginComponent
      }, {
        path: 'register',
        component: RegisterComponent
      }, {
        path: 'activeAccount/:id',
        component: ActiveAccountComponent
      }
    ]
  },
  {
    path: 'admin',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '**',
    loadChildren: () => import('./views/client/pages/err-page/err-page.module').then(m => m.ErrPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
