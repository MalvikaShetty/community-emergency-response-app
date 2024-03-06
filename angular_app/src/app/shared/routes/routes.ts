import { Routes } from "@angular/router";

export const content: Routes = [
  {
    path: "dashboard",
    loadChildren: () => import("../../components/dashboard/dashboard.module").then((m) => m.DashboardModule),
  },
  {
    path: "ui-kits",
    loadChildren: () => import("../../components/ui-kits/ui-kits.module").then((m) => m.UiKitsModule),
  },
  {
    path: "volunteers",
    loadChildren: () => import("../../components/apps/volunteers/volunteers.module").then((m) => m.VolunteersModule),
  },
  {
    path: "",
    loadChildren: () => import("../../components/apps/volunteers/volunteers.module").then((m) => m.VolunteersModule),
  },
  {
    path: "chat",
    loadChildren: () => import("../../components/apps/chat/chat.module").then((m) => m.ChatModule),
  },
  {
    path: "resources",
    loadChildren: () => import("../../components/apps/resources/resources.module").then((m) => m.ResourcesModule),
  },
  {
    path: "user",
    loadChildren: () => import("../../components/apps/users/users.module").then((m) => m.UsersModule),
  },
  {
    path: "icons",
    loadChildren: () => import("../../components/icons/icons.module").then((m) => m.IconsModule),
  },
  {
    path: "map",
    loadChildren: () => import("../../components/apps/map/map.module").then((m) => m.MapModule),
  },
];
