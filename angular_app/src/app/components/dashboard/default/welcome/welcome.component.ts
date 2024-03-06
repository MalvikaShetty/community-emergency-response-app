import { Component } from '@angular/core';
import { TwilioService } from '../../../../shared/services/twilio.service';
import { ReverseGeoService } from '../../../../shared/services/reverseGeo.service';
import { VolunteerService } from '../../../../shared/services/volunteers.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {
  constructor(
    private volunteerService: VolunteerService,
    private twilioService: TwilioService,
    private reverseGeoService: ReverseGeoService // Inject the ReverseGeoService
  ) { }
  currentZipcode = '';
  address = '';
  showPopup = false;
  sendClicked: boolean = false;
  latitude: any;
  longitude:any;
  volunteers: any[] = [];
  volunteerCount: any = 0;

  ngOnInit(){
    this.volunteerService.getVolunteers().subscribe(volunteers => {
      this.volunteers = volunteers; 
      this.volunteerCount = this.volunteers.length; 
      localStorage.setItem("volunteerCount", JSON.stringify(this.volunteers.length) );
    }); 
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }

  sendEmergencyAlert() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;

      
      // Use ReverseGeoService to get the address
      this.reverseGeoService.getReverseGeocoding(this.latitude, this.longitude).subscribe(
        (response) => {
          this.address = response.features[0].properties.formatted; 
          this.currentZipcode = response.features[0].properties.postcode; 
          const confirmation = true;
          if (confirmation) {
            this.openPopup();
          }
        },
        (error) => {
          console.error('Failed to get address from coordinates', error);
          // Handle error or display error message to user
        }
        
      );
    }, (error) => {
      console.error('Failed to get device location', error);
      // Handle error or display error message to user
    });
  }

  sendClickedHandler() {
    this.sendClicked = true;
    const phoneNumbers : any[] =[];
    phoneNumbers.push(...this.volunteers
      .filter(volunteer => 
        volunteer.zipCode === this.currentZipcode
        )
      .map(volunteer => volunteer.phoneNumber)
    );    

    // const phoneNumbers =["+1..."]; // Replace with recipient's phone number(Twilio verified)
    const message = `Emergency! Please take necessary actions! Location: ${this.address} (https://www.google.com/maps?q=${this.latitude},${this.longitude})`;
   // Iterate over each phone number and send the message
   phoneNumbers.forEach(phoneNumber => {
    this.twilioService.sendSMS(phoneNumber, message).subscribe(
      () => {
        alert('Emergency alert sent successfully');
        // Add any further handling or UI updates here
      },
      error => {
        alert('Failed to send emergency alert');
        console.error(`Failed to send emergency alert to ${phoneNumber}`, error);
      }
    );
  });
  
    this.closePopup();
    this.sendClicked = false;
  }
  
}
