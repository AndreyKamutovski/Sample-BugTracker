import { AfterViewInit, Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appInputAutofocus]'
})
export class InputAutofocusDirective implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit() {
    this.elementRef.nativeElement.focus();
}
}
