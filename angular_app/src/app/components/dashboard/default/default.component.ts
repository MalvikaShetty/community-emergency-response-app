import { Component, OnInit } from "@angular/core";
import { NgbCalendar, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";
import * as data from "../../../shared/data/dashboard/default";
import { VolunteerService } from "src/app/shared/services/volunteers.service";

@Component({
  selector: "app-default",
  templateUrl: "./default.component.html",
  styleUrls: ["./default.component.scss"],
})
export class DefaultComponent implements OnInit {
  constructor(private calendar: NgbCalendar,private volunteerService : VolunteerService) {}
  
  volunteerCount: string ;
  loggedInUserEmail: string | null;
  ifRoleVolunteer: boolean = false;

  ngOnInit() {
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.getRoleOfUser();
  }

  public resources = data.resources
  public volunteers = data.volunteers
  public maps = data.maps
  public chat = data.chat

  getRoleOfUser(): void {
    this.volunteerService.getRoleOfUser(this.loggedInUserEmail).subscribe(
      (isVolunteer: boolean) => {
        console.log(isVolunteer, "isVolunteer");
        this.ifRoleVolunteer = isVolunteer;
        // Convert boolean to string to save in localStorage
        localStorage.setItem('IsVolunteer', JSON.stringify(isVolunteer));
      },
      error => {
        console.error('Failed to get role of user', error);
      }
    );
    
  }
  

 

  
}
