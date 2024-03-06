import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  public show: boolean = false;
  public user: any = {
    FirstName: '',
    LastName: '',
    Email: '', 
    PasswordHash: '', 
    Role: 'User' 
  };
  public errorMessage: string | null = null; 

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {}

  showPassword() {
    this.show = !this.show;
  }

  register() {
    this.authService.register(this.user).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.router.navigate(["/auth/login"]);
      },
      (error) => {
        console.error('Error registering user:', error);
        this.errorMessage = error; // Set the error message
      }
    );
  }
}
