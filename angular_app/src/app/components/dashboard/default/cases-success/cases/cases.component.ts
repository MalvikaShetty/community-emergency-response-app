import { Component } from '@angular/core';
import * as chartData from '../../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.scss']
})

export class CasesComponent {

  public cases = chartData.cases;

}
