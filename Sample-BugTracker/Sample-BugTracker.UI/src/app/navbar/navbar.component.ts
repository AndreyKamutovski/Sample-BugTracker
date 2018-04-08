import { Component, Input, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';

interface NavbarElement {
  title: string,
  tooltipTitle: string;
  routerLink: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input() public titleApp: string;

  private navbarElements: NavbarElement[] = [
    { title: "Проекты", tooltipTitle: "Проекты", routerLink: "project" }
  ];

  constructor(private authService: AuthService) { }

  private logout(): void {
    this.authService.logout();
  }

  ngOnInit() {

  }

}
