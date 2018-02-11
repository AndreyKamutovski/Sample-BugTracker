import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
{ path: "", component: LoginComponent }]

export const routing = RouterModule.forRoot(routes);