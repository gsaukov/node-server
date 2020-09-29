import { Component, OnInit } from '@angular/core';
import {AnalyticsService} from "../shared/services/analytics.service";
import {Observable} from "rxjs";
import {OverviewPage} from "../shared/services/interfaces";

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html'
})
export class OverviewPageComponent implements OnInit {

  data$: Observable<OverviewPage>

  constructor(private service: AnalyticsService) { }

  ngOnInit(): void {
    this.data$ = this.service.getOverview()
  }

}
