import { Component, OnInit, Input } from '@angular/core';

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
    { title: "Проекты", tooltipTitle: "Проекты", routerLink: "app/project" }
  ];

  constructor() { }



  ngOnInit() {
  }

}
