import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { TitleService } from './shared/services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  menuTitle: string;
  private titleSubscription: Subscription;
  private routeSubscription: Subscription;
  previousURL: string;

  constructor(
    private titleSvc: TitleService,
    private router: Router
  ) { }

  ngOnDestroy(): void {
    if (this.titleSubscription && !this.titleSubscription.closed)
      this.titleSubscription.unsubscribe();
    if (this.routeSubscription && !this.routeSubscription.closed)
      this.routeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.titleSubscription = this.titleSvc.Title
      .subscribe(_title => setTimeout(() => this.menuTitle = _title, 1));
    this.subscribeToRouteChanges();
  }

  private subscribeToRouteChanges() {
    this.routeSubscription = this.router.events.pipe(
      filter(ev=> ev instanceof NavigationStart)
    )
    .subscribe((ev: any)=>{
      this.previousURL = this.router.url;
    })
  }
}
