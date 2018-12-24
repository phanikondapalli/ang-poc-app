import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { User } from './user.model';
import 'rxjs/add/operator/map';
import {AppComponent} from "./app.component";
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  
  constructor(public http: HttpClient) { }

  canActivate() {
    console.log('AuthService#canActivate called');
    return true;
  }

  public login(user: User){

    var base64Credential: string = btoa( user.userId+ ':' + user.password);
    let reqHeaders = new HttpHeaders({ 'Content-Type': 'application/json',
    'authorization':'Basic '+base64Credential
      });    
    
    let loginPayLoad:any = { 
                         "action": "SignOn","tableName": "","viewName": "","obmName": "","useSystemDB": "False",
                         "useCtxAppSysDB": "False","confirmation": "","auditReason":"",
                         "row": {"id": "0","mode": "","copiedFromID": "0",
                         "fields": {"customerID": "Test01","UserID": "SoapUI","appCode": "EM","password": "Premier1a"}}
                       }
    let jsonLoginPayload:any = JSON.parse(JSON.stringify(loginPayLoad));
    jsonLoginPayload.row.fields.customerID = user.CustomerId;
    jsonLoginPayload.row.fields.userId = user.erpUserId;
    jsonLoginPayload.row.fields.password = user.erpPassword;
    loginPayLoad = JSON.stringify(jsonLoginPayload);
    
    return this.http.post(AppComponent.API_END_POINT+"/signon" , loginPayLoad, {headers:reqHeaders})
      .map((response) => {
      // login successful if there's global context in the response
      console.log(response);
      /*if (user) {
        // store user details  in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
      }*/
    });
  }

  logOut() {
    // remove user from local storage to log user out
    return this.http.post(AppComponent.API_END_POINT+"logout",{})
      .map((response: Response) => {
        localStorage.removeItem('currentUser');
      });

  }
}