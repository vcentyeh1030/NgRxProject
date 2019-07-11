import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppConfig } from '../../share';
import { Report, Response } from '../../models';

import { BehaviorSubject } from 'rxjs';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  reports$: BehaviorSubject<Report[]>;
  constructor(private appConfig: AppConfig, private http: HttpClient) {
    this.reports$ = new BehaviorSubject([]);
    this._getReports();
  }
  getReportsFromServer(): Observable<Response> {
    return this.http.get<Response>(`${this.appConfig.apiUrl}/reports`);
  }
  _getReports() {
    this.getReportsFromServer()
        .subscribe(res => {
          if(res.success) {
            this.reports$.next(res.payload);
          } else {
            console.log('server side error');
          }
        }, (err: HttpErrorResponse) => {
          if(err.error instanceof Error) {
            console.log('client-side error');
          } else {
            console.log('server-side error');
          }
        });
  }
  getReports(): Observable<Report[]> {
    return this.reports$;
  }
  getReport(id: number): Observable<Report> {
    return this.reports$.pipe(
      map(reports => {
        return reports.filter(report => report.id === id)[0];
      })
    );
  }
}
