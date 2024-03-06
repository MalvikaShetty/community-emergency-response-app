import { Component, OnInit, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";
import { NavService } from "../../services/nav.service";
import { LayoutService } from "../../services/layout.service";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { TwilioService } from "../../services/twilio.service";

SwiperCore.use([Navigation, Pagination, Autoplay]);
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  public elem: any;
  IsVolunteer: boolean = false;
  loggedInUserEmail: string | null;
  volunteers: any[] = [];
  showPopup = false;
  location= '';

  constructor(
    public layout: LayoutService, 
    public navServices: NavService,
    private twilioService: TwilioService,
    @Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.elem = document.documentElement;
    this.IsVolunteer = JSON.parse(localStorage.getItem('IsVolunteer'));
    this.loggedInUserEmail = localStorage.getItem('loggedInUserEmail');
  }

  sidebarToggle() {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    this.navServices.megaMenu = false;
    this.navServices.levelMenu = false;
  }

  layoutToggle() {
    if ((this.layout.config.settings.layout_version = "dark-only")) {
      document.body.classList.toggle("dark-only");
    }
    document.body.remove;
  }

  searchToggle() {
    this.navServices.search = true;
  }

  languageToggle() {
    this.navServices.language = !this.navServices.language;
  }

  toggleFullScreen() {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }

  openPopup() {
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }


  sendClickedHandler() {
    const phoneNumbers : any[] =[];
    const myZipcode = this.volunteers.find(volunteer => volunteer.Email === this.loggedInUserEmail)?.zipCode;
    phoneNumbers.push(...this.volunteers
      .filter(volunteer => volunteer.zipCode === myZipcode)
      .map(volunteer => volunteer.phoneNumber)
    );    

    const message = `I'm on my way to ${this.location}`;
   // Iterate over each phone number and send the message
   phoneNumbers.forEach(phoneNumber => {
    this.twilioService.sendSMS(phoneNumber, message).subscribe(
      () => {
        alert('Message sent to volunteers successfully');
        // Add any further handling or UI updates here
      },
      error => {
        alert('Failed to alert volunteers');
        console.error(`Failed to send emergency alert to ${phoneNumber}`, error);
      }
    );
  });
}
}