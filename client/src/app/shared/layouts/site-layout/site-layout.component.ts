import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MaterialInstance, MaterialService} from "../../classes/material.service";

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.scss']
})
export class SiteLayoutComponent implements OnInit, AfterViewInit {

  @ViewChild('sideMenu') sideMenu: ElementRef
  @ViewChild('floatingActionButton') floatingActionButton: ElementRef
  sideMenuInstance: MaterialInstance

  links = [
    {url: '/overview', name: 'Overview'},
    {url: '/analytics', name: 'Analytics'},
    {url: '/history', name: 'History'},
    {url: '/order', name: 'Add Order'},
    {url: '/categories', name: 'Categories'}
  ]

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void { //on DOM model loaded.
    this.sideMenuInstance = MaterialService.initSideMenu(this.sideMenu)
    MaterialService.initFloatingActionButton(this.floatingActionButton)
  }

  logout(event: Event): void {
    event.preventDefault();
    this.auth.logout()
    this.router.navigate(['/login'])
  }

}
