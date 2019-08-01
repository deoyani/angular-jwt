
import {Component, OnInit} from '@angular/core';
 import {HttpClient} from "@angular/common/http";
import {HttpErrorResponse} from "@angular/common/http";
import {HttpClientModule} from '@angular/common/http';
import {ApiToken} from "./ApiToken";
// import { t } from '@angular/core/src/render3';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Test Authentication';


  apiToken: string;

  userId: string;

  showUnauthorizedMessage: boolean;

  apiResult;

  logoutSuccess: boolean

  testToken : ApiToken;

  constructor(private httpClient: HttpClient) {
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'https://pn110559.nist.gov' }),
    withCredentials: true,
  };

  ngOnInit(): void {
    console.log("We are here!!");
     this.httpClient.get('https://pn110559.nist.gov/saml-sp/auth/token', this.httpOptions)
    .subscribe(
        r => {
          console.log("token:"+r);
          this.handleTokenSuccess(r as ApiToken)},
        error =>{ 
         
          this.handleTokenError(error)}
      );
      // console.log("Try Again!!");
      // this.httpClient.get('/service/saml-sp/auth/token', { headers: new HttpHeaders({ 'Content-Type': 'application/json' }),withCredentials: true})
      // .subscribe(
      //     r => this.handleTokenSuccess(r as ApiToken),
      //     error =>{ 
           
      //       this.handleTokenError(error)}
      //   );

       var baseUrl = 'https://pn110559.nist.gov/saml-sp/auth/token';

   
// var xhr = new XMLHttpRequest();
// if ("withCredentials" in xhr) {
//     xhr.onerror = function() {
//       alert('Invalid URL or Cross-Origin Request Blocked.  You must explicitly add this site (' + window.location.origin + ') to the list of allowed websites in the administrator UI');
//     }
//     xhr.onload = function() {
//         //alert(this.responseText);
//         console.log(this.responseText);
//     };
//     xhr.open('GET', baseUrl, true);
//     xhr.withCredentials = true;
//     xhr.send();
// } else {
//     alert("CORS is not supported for this browser!!!")
// }

// alert("xhr here: "+xhr.responseText);
  }

  handleTokenSuccess(apiToken: ApiToken) {
    console.log("Success !!"+apiToken.token); 
    this.apiToken = apiToken.token;
    this.userId = apiToken.userId;
    localStorage.setItem("apiToken", apiToken.token);
    this.callApi();
  }

  handleTokenError(error: HttpErrorResponse) {

    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
   
    // console.log(error.status);
    // console.log(error.message);
    if (error.status === 401) {
      console.log(error.status);
      this.showUnauthorizedMessage = true;
      setTimeout(() => window.location.replace('https://pn110559.nist.gov/saml-sp/saml/login'), 4000);
    }
  }

  callApi() {
    const apiToken = localStorage.getItem("apiToken");
    
    this.httpClient.get('https://pn110559.nist.gov/saml-sp/api/mycontroller', {
      headers: {
        "Authorization": "Bearer "+apiToken,
        "userId": this.userId
      }
    }).subscribe(
      r =>{ this.apiResult = JSON.stringify(r);
        //alert("apiResult:"+this.apiResult); 
      });
  }

  logout() {
    console.log('logout');
    localStorage.removeItem('apiToken');
    this.httpClient.get('https://pn110559.nist.gov/saml-sp/saml/logout').subscribe(() => this.logoutSuccess = true);
  }
}
