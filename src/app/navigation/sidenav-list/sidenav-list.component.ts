import { Component, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIcon } from '@angular/material/icon';
import { RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, MatIcon, RouterLink],
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.css'
})
export class SidenavListComponent implements OnInit{
  @Output() closeSideNav = new EventEmitter<void>

  isAuth = false;
  authSubscription: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe(authStatus => this.isAuth = authStatus)
  }

  onLogout() {
    this.onClose()
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe()
  }

  onClose() {
    this.closeSideNav.emit()
  }

}
