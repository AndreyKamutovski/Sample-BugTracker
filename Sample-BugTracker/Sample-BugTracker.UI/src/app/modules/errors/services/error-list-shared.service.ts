import { Injectable } from '@angular/core';

import { AuthService } from '../../../shared/services/auth.service';
import { MessageService } from '../../../shared/services/message.service';
import { Project } from '../../projects/models/project.model';
import { User } from '../../users/models/user.model';
import { ClassificationList } from '../enums/classification-list.enum';
import { PriorityList } from '../enums/priority-list.enum';
import { StatusList } from '../enums/status-list.enum';
import { SelectItem } from '../interfaces/select-item';
import { ErrorBT } from '../models/error.model';
import { ErrorService } from './error.service';

@Injectable()
export class ErrorListSharedService {

  public ProjectWorkers: User[];
  public ProjectUsers: User[];
  public Project: Project;
  public Errors: ErrorBT[];


  constructor(
    private authService: AuthService,
    private errorService: ErrorService,
    private messageService: MessageService
  ) { }

  getViewValue(selectList: SelectItem[], searchVal: number): string {
    return selectList.find(p => p.value == searchVal).viewValue;
  }

  thisTesterIsErrorAuthor(error: ErrorBT): boolean {
    let roleName = this.ProjectUsers.find(p => p.Email == this.authService.currentUser.Email).RoleName;
    if (roleName == "User") {
      return error.EmailAuthor == this.authService.currentUser.Email;
    }
    return true;
  }

  isDisabledErrorTitleAndDescription(error: ErrorBT): boolean {
    let roleName = this.ProjectUsers.find(p => p.Email == this.authService.currentUser.Email).RoleName;
    if (roleName == "User" || roleName == "Worker") {
      return error.EmailAuthor != this.authService.currentUser.Email;
    }
    return false;
  }


  // update error fields
  updateAssignee(errorId: number, email: string) {
    this.errorService.updateAssignee(errorId, email).then(e => this.messageService.showSnackBarMsg('Ответственный за ошибку успешно обновлён'));
  }

  updateDeadline(errorId: number, deadline: Date) {
    this.errorService.updateDeadline(errorId, deadline).then(e => this.messageService.showSnackBarMsg('Срок выполнения ошибки успешно обновлён'));
  }

  updateStatus(errorId: number, status: StatusList) {
    this.errorService.updateStatus(errorId, status).then(e => this.messageService.showSnackBarMsg('Статус ошибки успешно обновлён'));
  }

  updatePriority(errorId: number, priority: PriorityList) {
    this.errorService.updatePriority(errorId, priority).then(e => this.messageService.showSnackBarMsg('Приоритет ошибки успешно обновлён'));
  }

  updateClassification(errorId: number, classification: ClassificationList) {
    this.errorService.updateClassification(errorId, classification).then(e => this.messageService.showSnackBarMsg('Классификация ошибки успешно обновлена'));
  }

  updateTitle(errorId: number, title: string) {
    this.errorService.updateTitle(errorId, title).then(e => this.messageService.showSnackBarMsg('Название ошибки успешно обновлено'));
  }

  updateDescription(errorId: number, description: string) {
    this.errorService.updateDescription(errorId, description).then(e => this.messageService.showSnackBarMsg('Описание ошибки успешно обновлено'));
  }
}
