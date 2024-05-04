import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  showHeader: boolean = true;
  title: string = '';
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // check if it is error page
        const isErrorPage = this.router.url === '/error';
        this.showHeader = !isErrorPage;
        let route = this.activatedRoute;
        while (route.firstChild) {
          route = route.firstChild;
        }
        this.title = route.snapshot.data['title'] || 'Welcome';
      }
    });
  }
}
