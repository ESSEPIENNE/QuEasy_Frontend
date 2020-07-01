import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent implements OnInit, OnDestroy {
  burgerClicked: boolean = false;
  isLoggedIn: boolean;
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user && !!user.token;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBurgerClicked() {
    this.burgerClicked = !this.burgerClicked;
  }

  onLinkClicked() {
    this.burgerClicked = false;
  }

  onLogout() {
    this.authService.logout().subscribe();
  }
}
