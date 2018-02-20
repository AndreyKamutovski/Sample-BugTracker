"use strict";
var router_1 = require("@angular/router");
var login_component_1 = require("./login/login.component");
var project_component_1 = require("./project/project.component");
var routes = [
    { path: "", component: login_component_1.LoginComponent },
    { path: "app/project", component: project_component_1.ProjectComponent }
];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map