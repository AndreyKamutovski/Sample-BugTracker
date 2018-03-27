import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-selected-project-page',
  templateUrl: './selected-project-page.component.html',
  styles: []
})
export class SelectedProjectPageComponent implements OnInit {
  prID: string;
  constructor(private _route: ActivatedRoute) { this.prID = this._route.snapshot.params['id']; }

  ngOnInit() {
  }

}
