import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription //control memory leak

  constructor(private auth: AuthService,
              private router: Router, //to navigate user to another page component
              private route: ActivatedRoute //gives information about initial request params/url
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)])
    })

    this.route.queryParams.subscribe((params: Params) => {
      if(params['registered']){
        MaterialService.toast('Please use your login and password to enter')
      } else if (params['accessDenied']) {
        MaterialService.toast('Please login')
      } else if (params['sessionFailed']) {
        MaterialService.toast('Session expired login again')
      }
    })
  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe() //free memory
    }
  }

  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      (t) =>
      {
        this.router.navigate(['/overview'])
      },
      (e) =>
      {
        MaterialService.toast(e.error.message)
        console.log(e)
        this.form.enable()
      }
    )
  }

}
