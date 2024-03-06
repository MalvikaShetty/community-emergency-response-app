import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-my-account",
  templateUrl: "./my-account.component.html",
  styleUrls: ["./my-account.component.scss"],
})

export class MyAccountComponent implements OnInit {
  public userName: string;
  public profileImg: "assets/images/dashboard/profile.jpg";
  loggedInUserEmail: string | null;
  IsVolunteer : string | null;
  
  constructor(public router: Router) {
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.IsVolunteer = localStorage.getItem('IsVolunteer');
  }

  ngOnInit() {}

  logoutFunc() {
    this.router.navigateByUrl('auth/login');
  }
}
