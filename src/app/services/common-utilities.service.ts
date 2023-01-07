import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { Constants } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class CommonUtilitiesService {
  toastrOptions = Constants.TOASTR_OPTIONS;
  private isLoadingSubject = new Subject<boolean>();

  constructor(private toastr: ToastrService) {}

  toggleLoading(isLoading: boolean) {
    this.isLoadingSubject.next(isLoading);
  }

  showLoadingSubscription(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  setToastr(toastrType: string, message: string, title: string) {
    switch (toastrType) {
      case Constants.TOASTR_TYPE.SUCCESS:
        this.toastr.success(message, title, this.toastrOptions);
        break;
      case Constants.TOASTR_TYPE.INFO:
        this.toastr.info(message, title, this.toastrOptions);
        break;
      case Constants.TOASTR_TYPE.WARNING:
        this.toastr.warning(message, title, this.toastrOptions);
        break;
      case Constants.TOASTR_TYPE.ERROR:
        this.toastr.error(message, title, this.toastrOptions);
        break;
      default:
        break;
    }
  }
}
