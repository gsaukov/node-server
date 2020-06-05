import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/services/auth.service";
import {Subscription} from "rxjs";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

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
  }

  ngOnDestroy(): void {
    if(this.aSub){
      this.aSub.unsubscribe() //free memory
    }
  }

  onSubmit(){
    this.form.disable()
    this.aSub = this.auth.register(this.form.value).subscribe(
      (user) =>
      {
        this.router.navigate(['/login'], {queryParams: {registered: true}})
      },
      (e) =>
      {
        console.log(e)
        this.form.enable()
      }
    )
  }

}

