import { Table, TableModule, ContextMenuRow } from 'primeng/table';

import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import {
    MatDialog, MatPaginator, MatPaginatorIntl, MatSnackBar, MatSort, MatTable, MatTableDataSource
} from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import {
    WarningDialogComponent
} from '../../../shared/components/warning-dialog/warning-dialog.component';
import { AuthService } from '../../../shared/services/auth.service';
import { ProjectService } from '../../../shared/services/project.service';
import { Project } from '../../models/project.model';
import { AddProjectFormComponent } from '../add-project-form/add-project-form.component';
import {
    ConfirmDeletingProjectComponent
} from '../confirm-deleting-project/confirm-deleting-project.component';
import { EditProjectFormComponent } from '../edit-project-form/edit-project-form.component';
import { MenuItem } from 'primeng/components/common/menuitem';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {

  // @ViewChild('projectTable') private projectTable: MatTable<Project>;
  // @ViewChild('projectPaginator') private projectPaginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  // private displayedColumns = ['Title', 'countError', 'DateStart', 'DateEnd', 'select'];
  // private dataSource: MatTableDataSource<Project> = new MatTableDataSource<Project>();
  // private russianMatPaginatorIntl: MatPaginatorIntl = new MatPaginatorIntl();
  // private selection = new SelectionModel<Project>(false, []);


  projects: Project[];
  cols: any[];
  items: MenuItem[];
  selectedProject: Project;

  constructor(
    public projectService: ProjectService,
    public _router: Router,
    public _route: ActivatedRoute,
    public authService: AuthService,
    public dialog: MatDialog,
    public changeDetectorRefs: ChangeDetectorRef,
    public snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.projects = this._route.snapshot.data.projectList;
    console.log(this.projects);
    this.cols = [
      { field: 'Title', header: 'Проект' },
      { field: 'ErrorStatistics.ProgressPercentage', header: 'Процент завершения' },
      { field: 'DateStart', header: 'Начало' },
      { field: 'DateEnd', header: 'Окончание' },
    ];

    this.items = [
      { label: 'Редактировать',  command: (event) => this.openEditProjectDialog(this.selectedProject) },
      { label: 'Удалить', command: (event) => this.openDeleteProjectDialog(this.selectedProject) }
  ];
  }

  formatLabel(value: number | null) {
    return `${value}%`;
  }

  ngAfterViewInit() {
  }

  onRowSelect(event) {
    sessionStorage.setItem('projectID', event.data.ProjectId);
    // this._router.navigateByUrl('/app/project/dashboard');
    this._router.navigate([event.data.ProjectId, "dashboard"], {relativeTo: this._route});
  }

  openAddProjectDialog(): void {
    let dialogRef = this.dialog.open(AddProjectFormComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(this.afterClosedAddProjectDialog.bind(this));
  };

  afterClosedAddProjectDialog(res: any) {
    if (res != undefined && res != null) {
      if (res.hasOwnProperty('projectData')) {
        this.projectService.addProject(res.projectData).toPromise().then(newProject => {
          let projcs = [...this.projects];
          projcs.push(newProject);
          this.projects = projcs;
          this.snackBar.open("Проект успешно создан", '', { duration: 2000 });
        });
      }
    }
  }

  openEditProjectDialog(project: Project): void {
    // event.stopPropagation();
    let dialogRef = this.dialog.open(EditProjectFormComponent, {
      width: '50%',
      data: { 'editedProject': project }
    });

    dialogRef.afterClosed().subscribe(this.afterClosedEditProjectDialog.bind(this));
  };

  afterClosedEditProjectDialog(res: any) {
    if (res != undefined && res != null) {
      this.projectService.updateProject(res.projectData.ProjectId, res.projectData).toPromise().then(updateProject => {
        let projcs = [...this.projects];
        let idx = projcs.findIndex(p => p.ProjectId == updateProject.ProjectId);
        projcs[idx] = updateProject;
        this.projects = projcs;
        this.snackBar.open("Проект успешно обновлён", '', { duration: 2000 });
      });
    }
  }

   openDeleteProjectDialog(delProject: Project): void {
    // event.stopPropagation();    
    // let delDialogRef = this.dialog.open(ConfirmDeletingProjectComponent, {
    //   width: '30%',
    //   data: { 'projectTitle': delProject.Title }
    // });
    let confirmDeletionDialog = this.dialog.open(WarningDialogComponent, {
      width: '50%',
      data: { 'dialogBody': `Вы действительно хотите удалить проект?` }
    });
    confirmDeletionDialog.afterClosed().toPromise().then(userChoice => {
      if (userChoice) {
        this.projects.splice(this.projects.indexOf(delProject), 1);
        this.projectService.deleteProject(delProject.ProjectId).toPromise().then(res => {
          this.snackBar.open("Проект успешно удалён", '', { duration: 2000 });
        });  
      }
    });
  }




  // filtering
  selectedProjectProgressFilterMode: string;
  showFilterPanelProjectProgress: boolean;
  @ViewChild("projectsTable") projectsTable: Table;
  filterModes = [
    {value: "equals", viewValue: "Равно", checked: true},
    {value: "gt", viewValue: "Больше", checked: false},
    {value: "lt", viewValue: "Меньше", checked: false}
  ];

  runFiltering(value: any, colField: string, mode: string) {

    // this.projectsTable.filter(value, colField, mode); 
    // alert('пип');
  }
}
