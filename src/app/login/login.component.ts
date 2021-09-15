import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HardcodedAuthenticationService } from '../service/hardcoded-authentication.service';
import { BasicAuthenticationService } from '../service/basic-authentication.service';

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
    private hardcodedAuthenticationService: HardcodedAuthenticationService,
    private basicAuthService: BasicAuthenticationService) { }

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

  handleBasicAuthLogin() {

    console.log('before ' +  this.hardcodedAuthenticationService.isUserLoggedIn());
    //if(this.username==="eelias" && this.password ==="123")
    this.basicAuthService.executeAuthenticaionService(this.username, this.password)
    .subscribe( data =>{
      console.log(data)
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    },
    error => {
      console.log(error)
      this.invalidLogin = true
    })
 
   
  }

}
