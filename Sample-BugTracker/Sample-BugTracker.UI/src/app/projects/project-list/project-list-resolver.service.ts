import { Injectable } from '@angular/core';
import { ProjectDataSourceService } from '../services/project-data-source.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class ProjectListResolverService {

  constructor(private projectDataSource: ProjectDataSourceService) { }

  resolve(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<void> {
      return this.projectDataSource.getProjects();
    // return this.portalDataSource.Portals.length == 0
    //   ? this.portalDataSource.getUserPortals() : null;
  }
}
