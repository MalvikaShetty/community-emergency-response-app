import { Component, Input } from "@angular/core";
import * as chartData from '../../../../../shared/data/dashboard/default'

@Component({
  selector: "app-success-cases",
  templateUrl: "./success-cases.component.html",
  styleUrls: ["./success-cases.component.scss"],
})
export class SuccessComponent {

  public success = chartData.success

  constructor() {}
  
}
