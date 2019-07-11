import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ReportsService } from '../service/reports.service';
import { Report } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  report$: Observable<Report>;
  constructor(private reportService: ReportsService, private route: ActivatedRoute) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('rptId');
    this.report$ = this.reportService.getReport(+id);
  }

}
