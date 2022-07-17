import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, 
              private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(){
  //  ir al back end
    this.router.navigate(['./usuarios']);
  }
}
