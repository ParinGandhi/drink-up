import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { CommonUtilitiesService } from 'src/app/services/common-utilities.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  // loading$ = this.store.select(AppSelectors.getLoadingStatus);
  isLoading = false;
  constructor(private commonUtils: CommonUtilitiesService) {}

  ngOnInit(): void {
    this.commonUtils.showLoadingSubscription().subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }
}
