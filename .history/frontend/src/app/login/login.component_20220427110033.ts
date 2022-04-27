// import { Component, OnInit } from '@angular/core';  
// import { Router } from '@angular/router';  
// import { ILogin } from 'src/app/interfaces/login';   
// import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';  
// import { AuthService } from './api.service';
// @Component({  
//    selector: 'app-login',  
//    templateUrl: './login.component.html',  
//    styleUrls: ['./login.component.css']  
//    })  
// export class LoginComponent implements OnInit {  
//   constructor(  
//     private formBuilder: FormBuilder,  
//     private router: Router,  
//     private authService: AuthService  
//   ) {}
//    model: ILogin = { userid: "admin", password: "admin@123" }  
//   message: string;  
//   loginForm: FormGroup = this.formBuilder.group({  
//     userid: ['', Validators.required],  
//     password: ['', Validators.required]  
//   });  
//   returnUrl: string | undefined;

//    ngOnInit() {  
//       this.loginForm = this.formBuilder.group({  
//          userid: ['', Validators.required],  
//          password: ['', Validators.required]  
//       });  
//    this.returnUrl = '/home';  
//    this.authService.logout();  
//    }  
// // convenience getter for easy access to form fields  
// get f() { return this.loginForm.controls; }  
// login() {  
//   console.log("wpwppaaaaaaaaaaaaaaaw");
  
//    // stop here if form is invalid  
//    if (this.loginForm.invalid) {  
//      console.log("wtfff");
//       return;  
//    }  
//    else {  
//       if (this.f['userid'].value == this.model.userid && this.f['password'].value == this.model.password) {  
//       console.log("Login successful");  
//       //this.authService.authLogin(this.model);  
//       localStorage.setItem('isLoggedIn', "true");  
//       localStorage.setItem('token', this.f['userid'].value);  
//       this.router.navigate([this.returnUrl]);  
//       }  
//    else {  
//       this.message = "Please check your userid and password";  
//       }  
//      }  
//   }  
// }  

import { FormControl,FormGroup } from '@angular/forms';
import { Form } from './form';
import { AuthService } from './api.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ILogin } from '../interfaces/login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  data: Form | any;
  msg:any;
  empForm = new FormGroup({
    userid: new FormControl(''),
    password: new FormControl(''),
  });
  returnUrl: string = '';

  constructor(private authService: AuthService,private http:HttpClient, private router: Router ) { }
  model: ILogin = { userid: "admin", password: "admin@123" }
  ngOnInit(): void {
   this.returnUrl = '/home';  
   this.authService.logout();  
  }
  get f() { return this.empForm.controls; } 

  login(){
    console.log("wowow");
    this.authService.check(this.f['userid'].value, this.f['password'].value).subscribe(data=>{
      console.log(data);
      if(data.length!=0){
        localStorage.setItem('isLoggedIn', "true");  
        localStorage.setItem('token', data[0]['id']);  
        this.router.navigate([this.returnUrl]);  
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


