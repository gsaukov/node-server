import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

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
        //enter as already authenticated
      } else if (params['accessDenied']) {
        //must be authenticated first
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
        console.log(e)
        this.form.enable()
      }
    )
  }

}
