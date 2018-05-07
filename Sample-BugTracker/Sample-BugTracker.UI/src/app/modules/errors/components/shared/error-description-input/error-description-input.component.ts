import { Component, OnInit, Input } from '@angular/core';
import { QuillEditorConfigurationService } from '../../../../../shared/services/quill-editor-configuration.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Quill } from 'quill';

@Component({
  selector: 'app-error-description-input',
  templateUrl: './error-description-input.component.html',
  styles: []
})
export class ErrorDescriptionInputComponent implements OnInit {

  constructor(private quillEditorConfig: QuillEditorConfigurationService) { }

  @Input() public form: FormGroup;
  @Input() public initValue: string = '';

  private description: FormControl;
  private quill: Quill = new Quill('#quillEditor');

  ngOnInit() {
    this.description = new FormControl(this.initValue, [
      Validators.maxLength(5000)
    ]);
    this.form.addControl('Description', this.description);
  }
}
