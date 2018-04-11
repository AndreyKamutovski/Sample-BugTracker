import { Component, OnInit, Inject } from '@angular/core';
import { REST_URI, AUTH_HEADER } from '../shared/services/httpClient.service';

@Component({
  selector: 'app-upload-user-photo-form',
  templateUrl: './upload-user-photo-form.component.html',
  styleUrls: []
})
export class UploadUserPhotoFormComponent implements OnInit {

  constructor(
    @Inject(REST_URI) private uri: string,
    @Inject(AUTH_HEADER) private auth_header: string,
  ) { }

  ngOnInit() {
  }

  uploadUrl: string = `${this.uri}api/User`;
  isUploadSuccess: boolean = false;

  uploadAvatarHeaders: { [name: string]: any } = {
    'Authorization': this.auth_header
  };
  customUploadStyle = {
    clearButton: {
      "display": "none"
    }
  };


  onUploadFinished($event) {
    this.isUploadSuccess = $event.serverResponse.ok as boolean;
  }

  onUploadStateChanged($event) {
    // console.log('onUploadStateChanged:', $event);
  }
}
