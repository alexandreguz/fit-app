import { Component, EventEmitter, OnDestroy, OnInit, output, Output } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy{
  @Output() sideNavToggle = new EventEmitter<void>

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authSubscription = this.authService.authChange.subscribe((authStatus) => {this.isAuth = authStatus})
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  onSideNavToggle() {
    this.sideNavToggle.emit();
  }
}
