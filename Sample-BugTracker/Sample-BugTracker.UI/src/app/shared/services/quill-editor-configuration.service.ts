import { Injectable } from '@angular/core';

@Injectable()
export class QuillEditorConfigurationService {

  private modules = {};
  public get getToolbarConfig() {
    return this.modules;
  }

  constructor() {
    this.setToolbarConfiguration();
  }

  private setToolbarConfiguration() {
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],
        [{ 'size': ['small', false, 'large', 'huge'] }],
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        [{ 'color': [] }, { 'background': [] }],
        // [{ 'font': ['Roboto'] }],
        [{ 'align': [] }],
        ['clean', 'link'],
        // ['link', 'image']
      ]
    }
  }



}
