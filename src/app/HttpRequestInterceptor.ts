// import { Injectable } from '@angular/core';
// import {
//   HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
// } from '@angular/common/http';

// import { Observable } from 'rxjs';
// import { HttpHeaders } from '@angular/common/http';

// /** Inject With Credentials into the request */
// @Injectable()
// export class HttpRequestInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler):
//     Observable<HttpEvent<any>> {
    
//       console.log("interceptor: " + req.url+" Test:"+req.headers.get('Access-Control-Allow-Origin'));
//       console.log(req.withCredentials);
      
//       req = req.clone({
//         withCredentials: true,
//         headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin':'https://pn110559.nist.gov' })
//       });
     
//       console.log("interceptor: " + req.url+"Test:"+req.headers.get('Access-Control-Allow-Origin'));
//       console.log(req.withCredentials);
//       return next.handle(req);
//   }
// }