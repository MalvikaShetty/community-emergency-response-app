import { Component } from "@angular/core";
import * as chartData from "../../../../shared/data/dashboard/default";

export interface Balance {
  icon: string;
  title: string;
  count: string;
  month: string;
  colorClass: string;
  show?: boolean;
}
@Component({
  selector: "app-overall-cases",
  templateUrl: "./overall-cases.component.html",
  styleUrls: ["./overall-cases.component.scss"],
})

export class OverallCasesComponent {
  public overallCases = chartData.overallCases;

  constructor() {}

  ngOnInit(): void {}
  

  toggle(item: Balance) {
    item.show = !item.show;
  }

  public balance: Balance[] = [
    {
      icon: "income",
      title: "Highest Messages",
      count: "100",
      month: "January",
      colorClass: "danger",
    },
    {
      icon: "expense",
      title: "Lowest Messages",
      count: "20",
      month: "May",
      colorClass: "success",
    },
    {
      icon: "doller-return",
      title: "Total Count",
      count: "825",
      month: "",
      colorClass: "success",
    },
  ];
}
