import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  
  user: User;
  loading :boolean = false;
  returnUrl: string;
  constructor(private _authService:AuthService, private _router:Router) { }

  ngOnInit() {
    this.user = new User();
    this.user.CustomerId='Test01';
    this.user.erpUserId='erplite';
    this.user.erpPassword='Premier1';
    // get return url from route parameters or default to '/'
    this.returnUrl = '/';
  }

  login() {
    this.loading = true;
    this._authService.login(this.user)
        .subscribe(
            data => {
                this._router.navigate([this.returnUrl]);
            },
            error => {
                console.log(error);
                this.loading = false;
            });
}



}
