import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-user-photo-form',
  templateUrl: './upload-user-photo-form.component.html',
  styleUrls: []
})
export class UploadUserPhotoFormComponent implements OnInit {

  private tempSelectedFile: File = null;
  private isAvatarSelected: boolean = false;
  customUploadStyle = {
    clearButton: {
      "display": "none"
    }
  };

  constructor(
    private dialogRef: MatDialogRef<UploadUserPhotoFormComponent>,
  ) { }

  ngOnInit() {
  }

  uploadAvatar() {
    let formData = new FormData();
    formData.append('image', this.tempSelectedFile);
    this.dialogRef.close(formData);
  }

  onUploadFinished($event) {
    this.isAvatarSelected = true;
    this.tempSelectedFile = $event.file;
  }

  onRemoved($event) {
    this.isAvatarSelected = false;
  }
}
