import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {

  private _opened = false;


  constructor() { }

  ngOnInit() {
  }

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
