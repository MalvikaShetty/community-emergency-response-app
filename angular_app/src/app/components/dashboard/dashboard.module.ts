import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { CountToModule } from "angular-count-to";
import { ChartistModule } from "ng-chartist";
import { NgChartsModule } from "ng2-charts";
import { CarouselModule } from "ngx-owl-carousel-o";
import { NgApexchartsModule } from "ng-apexcharts";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule } from "@angular/forms";
import { SharedModule } from "../../shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { GoogleMapsModule } from "@angular/google-maps";

import { DefaultComponent } from "./default/default.component";
// import { EcommerceComponent } from "./ecommerce/ecommerce.component";
import { WelcomeComponent } from "./default/welcome/welcome.component";
import { StatusComponent } from "./default/status/status.component";
import { OverallCasesComponent } from "./default/overall-cases/overall-cases.component";
import { AllLocationsComponent } from "./default/all-locations/all-locations.component";
import { ActivityComponent } from "./default/activity/activity.component";
import { RecentSalesComponent } from "./default/recent-sales/recent-sales.component";
import { TimelineComponent } from "./default/timeline/timeline.component";
import { PurchaseAccountComponent } from "./default/purchase-account/purchase-account.component";
import { TotalUsersComponent } from "./default/total-users/total-users.component";
import { FollowersGrowthComponent } from "./default/followers-growth/followers-growth.component";
import { PaperNoteComponent } from "./default/paper-note/paper-note.component";
import { SuccessCasesComponent } from "./default/cases-success/cases-success-cases.component";
import { SuccessComponent } from "./default/cases-success/success-cases/success-cases.component";
import { CasesComponent } from "./default/cases-success/cases/cases.component";
import { ProductStatusChartBoxComponent } from "./default/product-status-chart-box/product-status-chart-box.component";
@NgModule({
  declarations: [
    DefaultComponent,
    WelcomeComponent,
    StatusComponent,
    OverallCasesComponent,
    AllLocationsComponent,
    ActivityComponent,
    RecentSalesComponent,
    TimelineComponent,
    PurchaseAccountComponent,
    TotalUsersComponent,
    FollowersGrowthComponent,
    PaperNoteComponent,
    SuccessCasesComponent,
    SuccessComponent,
    CasesComponent,
    ProductStatusChartBoxComponent,
  ],
  imports: [CommonModule, ChartistModule, CarouselModule, NgChartsModule, NgApexchartsModule, SharedModule, GoogleMapsModule, CKEditorModule, CountToModule, NgbModule, FormsModule, DashboardRoutingModule],
  exports: [
    ProductStatusChartBoxComponent,
    TotalUsersComponent
  ]
})
export class DashboardModule {}
