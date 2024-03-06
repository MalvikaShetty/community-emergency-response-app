import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})

export class LoginComponent implements OnInit {
  public newUser = false;
  // public user: firebase.User;
  public loginForm: FormGroup;
  public show: boolean = false
  public errorMessage: any;
  public user: any = {
    Email: '', 
    PasswordHash: ''
  };

  constructor(private authService: AuthService, private fb: FormBuilder, public router: Router) {
    this.loginForm = this.fb.group({
      email: ["Test@gmail.com", [Validators.required, Validators.email]],
      password: ["test123", Validators.required],
    });
  }

  ngOnInit() {}

  login() {
    console.log(this.user);
    this.authService.login(this.user).subscribe(
      (response) => {
        console.log('User logged in successfully:', response);
        localStorage.setItem('loggedInUserEmail', this.user.Email);
        localStorage.setItem('loggedInUserRole', this.user.Role);
        // Navigate to dashboard or other page on successful login
        this.router.navigate(["/dashboard"]);
      },
      (error) => {
        console.error('Error logging in:', error);
        // Display appropriate error message to the user
        if (error.status === 400 && error.error.message === 'Username or password is incorrect') {
          this.errorMessage = 'Invalid email or password';
        } else {
          this.errorMessage = 'An unexpected error occurred. Please try again later.';
          alert("Username or Password incorrect");
        }
      }
    );
  }
  

  showPassword(){
    this.show = !this.show
  }
}
