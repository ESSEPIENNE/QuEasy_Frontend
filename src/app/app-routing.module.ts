import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/store/store.component';
import { AuthGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { StoresResolver } from './resolvers/stores-resolver.service';
import { StoreResolver } from './resolvers/store-resolver.service';
import { StoreCodesResolver } from './resolvers/store-codes-resolver.service';
import { GestioneComponent } from './components/gestione/gestione.component';
import { StoreEditComponent } from './components/store-edit/store-edit.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  {
    path: 'managment',
    component: GestioneComponent,
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
    resolve: { stores: StoresResolver },
  },
  {
    path: 'managment/create',
    component: StoreEditComponent,
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
  },
  {
    path: 'stores',
    component: StoresComponent,
    canActivate: [AdminGuard],
    canLoad: [AdminGuard],
    resolve: { stores: StoresResolver },
  },
  {
    path: 'stores/:id',
    component: StoreComponent,
    canActivate: [LoggedInGuard],
    canLoad: [LoggedInGuard],
    resolve: { store: StoreResolver, codes: StoreCodesResolver },
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
