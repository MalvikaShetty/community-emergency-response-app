import { Component, Input } from "@angular/core";
import { Router } from '@angular/router';

@Component({
  selector: "app-product-status-chart-box",
  templateUrl: "./product-status-chart-box.component.html",
  styleUrls: ["./product-status-chart-box.component.scss"],
})
export class ProductStatusChartBoxComponent {

  @Input() data: any

  constructor(private router: Router) {}

    onClickRedirect() {
        // Example of navigating to another page
        this.router.navigate(['/'+ this.data.path ]);
    }

    volunteerCount: string ;

    ngOnInit() {
      this.volunteerCount = localStorage.getItem('volunteerCount');    
    }
  
}
