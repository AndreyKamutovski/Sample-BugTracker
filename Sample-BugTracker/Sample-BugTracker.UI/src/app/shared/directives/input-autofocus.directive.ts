import { Directive, ElementRef, AfterViewInit } from '@angular/core';
import { MatInput } from '@angular/material';

@Directive({
    selector: 'input[inputAutofocus]'
})
export class InputAutofocusDirective implements AfterViewInit {

    constructor(private elementRef: ElementRef) {};

    ngAfterViewInit(): void {
       // this.elementRef as MatInput;
        //this.elementRef.nativeElement.focus();
    }
}