import { Component, OnInit } from "@angular/core";
import {
  faCoffee,
  faAd,
  faAddressBook,
  faAirFreshener,
  faAngleRight
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

  constructor() {}

  ngOnInit() {}
}
