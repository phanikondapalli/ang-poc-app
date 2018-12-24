import { Component } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ERP Lite';
  //Local
  //static API_END_POINT="http://localhost:9080";
  
  //IIS Server
  static API_END_POINT="http://c3cierplite01:9080";

  static httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                          'authorization':'Basic cGtvbmRhcGE6UHJlbWllcjE=',
                          'asp.net_sessionid':'gngqcye5lfh1qi4igwbdcffy;',
                          'sessionid':'C12QSQL1.EM_Test01.em_system.Medi ClickUser.2.22849.Admin.6321;' })
  };
}
