import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { StoresComponent } from './components/stores/stores.component';
import { StoreComponent } from './components/store/store.component';
import { StoreItemComponent } from './components/stores/store-item/store-item.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RoleDirective } from './directives/role.directive';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { GestioneComponent } from './components/gestione/gestione.component';
import { GestioneStoreItemComponent } from './components/gestione/gestione-store-item/gestione-store-item.component';
import { StoreEditComponent } from './components/store-edit/store-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    StoresComponent,
    StoreComponent,
    StoreItemComponent,
    NavBarComponent,
    PageNotFoundComponent,
    RoleDirective,
    GestioneComponent,
    GestioneStoreItemComponent,
    StoreEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    ChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
