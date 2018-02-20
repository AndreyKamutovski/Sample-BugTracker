import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { ProjectComponent } from "./project/project.component";

const routes: Routes = [
    {path: "", component: LoginComponent},
    {path: "app/project", component: ProjectComponent}
]

export const routing = RouterModule.forRoot(routes);