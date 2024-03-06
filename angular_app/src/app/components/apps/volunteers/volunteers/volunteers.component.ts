import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../../../shared/services/volunteers.service';
import * as data from "../../../../shared/data/dashboard/default";

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  volunteers: any[] = [];
  countsAndCitiesByZipcode: any[] = [];

  //For the information box- from default.ts
  public addvolunteer = data.addvolunteer
  public totalvolunteers = data.totalvolunteers
  public joinedpastmonthvolunteers = data.joinedpastmonthvolunteers
  public highestcountcity = data.highestcountcity;

  // Local Storage Variables
  loggedInUserEmail: string | null;
  savedPhoneNumber: string | null;
  userToVolunteer: boolean | null;

  //Table Columns
  columns: string[] = ['Name', 'City', 'Zip Code', 'Joining Date', 'Download Resume'];
  columnsSecond: string[] = ['Zip Code','City', 'Volunteer Count'];

  constructor(private volunteerService: VolunteerService) { }

  ngOnInit() {
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
    this.savedPhoneNumber = localStorage.getItem('savedPhoneNumber');
    this.checkIfRoleIsVolunteer();
   }

   getVolunteers() {
    this.volunteerService.getVolunteers().subscribe(
      (data: any[]) => {
        this.volunteers = data;
        this.getVolunteersCountByZipcode();
      },
      error => {
        console.error('Error fetching volunteers:', error);
      }
    );
  }
  getVolunteersCountByZipcode(): { zipcode: string, city: string, count: number }[] {
    this.volunteers.forEach(volunteer => {
      const zipcode = volunteer.zipCode;
      const city = volunteer.city;
      const existingEntryIndex =  this.countsAndCitiesByZipcode.findIndex(entry => entry.zipcode === zipcode);
      if (existingEntryIndex === -1) {
        this.countsAndCitiesByZipcode.push({ zipcode, city, count: 1 });
      } else {
        this.countsAndCitiesByZipcode[existingEntryIndex].count++;
      }
    });
    return  this.countsAndCitiesByZipcode;
  }
  
  onClickChangeRole(){
    this.volunteerService.removeVolunteer(this.loggedInUserEmail , this.savedPhoneNumber ).subscribe(
      response => {
        alert("Successful!");
        window.location.reload();
      },
      error => {
        console.error(error);
        alert("Please try again");
      }
    );
  }

  checkIfRoleIsVolunteer() {
    this.volunteerService.getRoleOfUser(this.loggedInUserEmail).subscribe(
      (response: boolean) => {
        if(response === true){
          localStorage.setItem('userToVolunteer', 'true');
          this.userToVolunteer = true;
        } else {
          localStorage.setItem('userToVolunteer', 'false');
        }
        this.getVolunteers();
      },
      error => {
        console.error('Error checking user role:', error);
      }
    );
  }

  downloadResume(event: MouseEvent, fileId: number) {
    event.preventDefault(); // Prevent default behavior of the anchor tag

    this.volunteerService.getFileDownloadUrl(fileId).subscribe(
      (response: Blob) => {
          // Create a blob URL for the response
          const blobUrl = URL.createObjectURL(response);
          
          // Create a link element
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = 'resume.pdf';

          // Programmatically trigger the download
          document.body.appendChild(link);
          link.click();

          // Clean up
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
      },
      error => {
          console.error('Error downloading resume:', error);
      }
  );
  
  
}




}
