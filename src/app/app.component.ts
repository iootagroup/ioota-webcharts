import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ioota-webcharts';

  private _opened = false;

  private _toggleSidebar() {
    this._opened = !this._opened;
  }
}
