import { Injectable } from '@angular/core';

@Injectable()
export class AttachmentPreviewService {

  constructor() { }

  private _imageFileFormats: string[] = [
    "tiff",
    "gif",
    "jpg",
    "jpeg",
    "bmp",
    "png",
    "svg"
  ];

  private _preparedFileTypeIcons: string[] = [
    "after-effects.png",
    "ai.png",
    "audition.png",
    "avi.png",
    "bridge.png",
    "css.png",
    "csv.png",
    "dbf.png",
    'doc.png',
    'docx.png',
    "dreamweaver.png",
    "dwg.png",
    "exe.png",
    "file.png",
    "filenames.txt",
    "fireworks.png",
    "fla.png",
    "flash.png",
    "html.png",
    "illustrator.png",
    "indesign.png",
    "iso.png",
    "javascript.png",
    "jpg.png",
    "json-file.png",
    "mp3.png",
    "mp4.png",
    "pdf.png",
    "photoshop.png",
    "png.png",
    "ppt.png",
    "prelude.png",
    "premiere.png",
    "psd.png",
    "rtf.png",
    "search.png",
    "svg.png",
    "txt.png",
    "xls.png",
    "xml.png",
    "zip-1.png",
    "zip.png"
  ];

  isImage(fileName: string): boolean {
    return this._imageFileFormats.indexOf(this.getFileExtension(fileName)) !== -1;
  }

  getFileExtension(fileName: string): string {
    return fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase();
  }

  getFilePreview(fileName: string): string {
    let fileExtension = this.getFileExtension(fileName);
    if (this._preparedFileTypeIcons.indexOf(`${fileExtension}.png`) !== -1) {
      return `${fileExtension}.png`;
    }
    else {
      return `file.png`;
    }
  }

  getFileSizeInKB(sizeInBytes: number): string {
    let sizeKB = sizeInBytes / 1024;
    return `${sizeKB.toFixed(0)} KB`;
  }
}
