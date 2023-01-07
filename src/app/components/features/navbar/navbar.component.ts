import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  rerouteToLogin() {
    const offCanvasMenu = document.getElementById('offcanvasDarkNavbar');
    offCanvasMenu?.classList.remove('show');
    const offCanvasBackdrop =
      document.getElementsByClassName('offcanvas-backdrop');
    Array.from(offCanvasBackdrop).forEach((element) => {
      element.classList.remove('show');
    });
    this.router.navigate(['/login']);
  }

  signOut() {
    window.sessionStorage.clear();
    // this.store.dispatch(setUserInfoAction({userInfo: new User()}));
    this.rerouteToLogin();
  }
}
