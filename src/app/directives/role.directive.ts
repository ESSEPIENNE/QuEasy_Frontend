import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Directive({
  selector: '[appRole]',
})
export class RoleDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private vcRef: ViewContainerRef,
    private authService: AuthService
  ) {}

  hasRole: boolean = false;

  @Input() set appRole(role: string) {
    const user = this.authService.user.getValue();
    if (user && user.token && user.role === role) {
      this.vcRef.createEmbeddedView(this.templateRef);
    } else {
      this.vcRef.clear();
    }
  }
}
