import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { QuillEditorConfigurationService } from '../../../../../shared/services/quill-editor-configuration.service';

@Component({
  selector: 'app-project-description-input',
  templateUrl: './project-description-input.component.html',
  styles: []
})
export class ProjectDescriptionInputComponent implements OnInit {

  @Input() public form: FormGroup;
  @Input() public initValue: string = '';

  private description: FormControl;
 
  constructor(private quillEditorConfig: QuillEditorConfigurationService) { }

  ngOnInit() {
    this.description = new FormControl(this.initValue);
    this.form.addControl('Description', this.description);
  }
}
