import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  navLinks: { title: string; path: string }[];
  showNav: boolean = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.navLinks = [
      { title: 'Employee Profile', path: '/employee-profile' },
      { title: 'Visa Status', path: '/visa-status' },
      { title: 'Hiring Management', path: '/hiring-management' },
      { title: 'Housing Management', path: '/housing-management' },
      { title: 'Log out', path: '/login' },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // check if it is error page or login page
        const isErrorPage = this.router.url === '/error';
        const isLoginPage = this.router.url === '/login';
        this.showNav = !isErrorPage && !isLoginPage;
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
      }
    });
  }
}
