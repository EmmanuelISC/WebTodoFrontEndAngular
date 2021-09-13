import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = 'emmanuel'
  password = ''
  errorMessage = 'Invalid credetials'
  invalidLogin = false

  // Router Instance 
  // Using Dependency Injection 
  //Injection authentication Service 
  constructor(private router: Router,
    private hardcodedAuthenticationService: HardcodedAuthenticationService) { }

  ngOnInit() {
  }

  userValidation(username, password) {

    console.log('before ' +  this.hardcodedAuthenticationService.isUserLoggedIn());
    //if(this.username==="eelias" && this.password ==="123")
    if (this.hardcodedAuthenticationService.authenticate(this.username, this.password)) {
      //Redirect to Welcoe Page, passing as parameter Username
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
      console.log("Welcome " + this.username)
    }
    else
    this.invalidLogin = true
  }

  

}
