import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//This the way to import one component into other
import { AppComponent } from '../app.component';
import { WelcomeDataService } from '../service/data/welcome-data.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  message = 'Some Welcome message'
  welcomeMessageFromService:string
  name = 'EElias'
  lastName = 'Morales'
  phone = 7221234321


  //ActivatedRoute
  constructor(private route: ActivatedRoute,
    private helloWorldBeanService: WelcomeDataService) { }

  ngOnInit() {

    console.log(this.message);
    
    this.name = this.route.snapshot.params['name'];
    
  }

  getWelcomeMessage(){
    this.helloWorldBeanService.executeHelloBeansService(this.name, this.lastName, this.phone).subscribe(
      response => this.handleSuccesfulResponse(response),
      error => this.handleErrorResponse(error)
    );

    console.log("Last line of getWelcomeMessage: ")
  }

  handleSuccesfulResponse(response){
    this.welcomeMessageFromService = response.message
    console.log(response);
    console.log(response.message);
  }

  handleErrorResponse(error){
    console.log(error.error.message);
    this.welcomeMessageFromService = error;
  }

}
