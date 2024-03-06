import { Component, OnInit } from '@angular/core';
import { VolunteerService } from '../../../../shared/services/volunteers.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-volunteers',
  templateUrl: './add-volunteers.component.html',
  styleUrls: ['./add-volunteers.component.scss']
})
export class AddVolunteersComponent implements OnInit {
  volunteer = { name: '', city: '', phoneNumber:'', Email:'' ,zipCode: '', fileName:'', file: null };
  files: File[] = [];

  //Local Storage Variable
  loggedInUserEmail: string | null;
  
  constructor(private volunteerService: VolunteerService, private router: Router) { 
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  }

  ngOnInit() { }

  onSubmit() {
    localStorage.setItem("savedPhoneNumber", this.volunteer.phoneNumber);
    const formData = new FormData();
    formData.append('name', this.volunteer.name);
    formData.append('city', this.volunteer.city);
    formData.append('phoneNumber', this.volunteer.phoneNumber);
    formData.append('Email', this.loggedInUserEmail);
    formData.append('zipCode', this.volunteer.zipCode);
    if (this.volunteer.file) {
      formData.append('file', this.volunteer.file, this.volunteer.file.name);
    }
    
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
      });

    this.volunteerService.createVolunteer(formData).subscribe(
      response => {
        console.log(formData, "formData");
        console.log('Volunteer created successfully:', response);
        this.resetForm();
        // Navigate to a success page or display a success message
        this.router.navigate(["/volunteers"]);
        
      },
      error => {
        console.error('Error creating volunteer:', error);
        // Handle error and provide feedback
        if (error.error.Message === "Phone number already exists. Please use a different number.") {
          // Display an alert or set an error message in your component to show in the UI
          alert("A user already exists with this phone number. Please use a different number.");
        } else {
          // Handle other errors or show a generic error message
          alert("An error occurred while creating the volunteer. Please try again.");
        }
      }
    );
  }
  
  onFileSelected(event: any) {
    // Check if the event is from ngx-dropzone and has addedFiles
    if (event.addedFiles) {
      // Handle files added via ngx-dropzone
      this.files.push(...event.addedFiles);
      if (event.addedFiles.length > 0) {
        // Assuming you only care about the first file for this.volunteer.file
        this.volunteer.file = event.addedFiles[0];
        this.volunteer.fileName = event.addedFiles[0].name;
      }
    }
  }
  

  onRemove(file: File) {
    // Remove the file from the files array
    this.files = this.files.filter(f => f !== file);
    // Clear the file from the volunteer object
    this.volunteer.file = null;
  }

  resetForm() {
    this.volunteer = { name: '', city: '', phoneNumber:'',Email:'' , zipCode: '',fileName:'', file: null };
    this.files = [];
  }

  cancel() {
    // Navigate to the '/volunteers' page
    this.router.navigate(['/volunteers']);
  }
}
