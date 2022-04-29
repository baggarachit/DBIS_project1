import { FormControl,FormGroup } from '@angular/forms';
import { Form } from './form';
import { AuthService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../interfaces/login';
import { Router } from '@angular/router';
import { GlobalConstants } from '../global';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: Form | any;
  msg:any;
  message: string = ""; 
  empForm = new FormGroup({
    ID: new FormControl(''),
    password: new FormControl(''),
  });
  returnUrl: string = '';

  constructor(private authService: AuthService,private http:HttpClient, private router: Router ) { }
  ngOnInit(): void {
    if(GlobalConstants.isnav){
      GlobalConstants.isnav=false;
      this.router.navigate(['/login']);
    }
   this.returnUrl = '/home';  
   this.authService.logout();  
  }
  get f() { return this.empForm.controls; } 

  login(){
    // console.log("wowow");
    const rExp : RegExp = /^[a-zA-Z]+$/;
    const rExp1 : RegExp = /^[a-zA-Z0-9]+$/g;
    if (!rExp1.test(String(this.f['password'].value))){
      this.message = "Username or Password contains unexpected characters";
      return;
    }
    this.authService.check(this.f['ID'].value, this.f['password'].value).subscribe(data=>{
      console.log(data);
      if(data.length!=0){
        localStorage.setItem('isLoggedIn', "true");  
        localStorage.setItem('token', data[0]['id']);  
        localStorage.setItem('role',data[0]['role']);
        this.router.navigate([this.returnUrl]);  
      } 
      else{
        this.message = "Username or Password is incorrect";
      }
    })
    
  }
  // onSubmit(){
  //   this.api.postreq(this.empForm.value).subscribe(res=>{
  //     console.log(res);
  //   });
  //   this.empForm.reset();
  // }

}


