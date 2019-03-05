import { Component, OnInit } from "@angular/core";
import {
  faCoffee,
  faAd,
  faAddressBook,
  faAirFreshener,
  faAngleRight,
  faBell,
  faHistory,
  faWind,
  faDatabase,
  faClock
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.css"]
})
export class WelcomeComponent implements OnInit {
  faCoffee = faCoffee;
  faAd = faAd;
  faAddressBook = faAddressBook;
  faAirFreshener = faAirFreshener;
  faAngleRight = faAngleRight;
  faBell = faBell;
  faHistory = faHistory;
  faWind = faWind;
  faDatabase = faDatabase;
  faClock = faClock;

  constructor() {}

  ngOnInit() {}
}
