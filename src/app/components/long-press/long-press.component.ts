import { Component, OnInit, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'long-press',
  template: '<ng-content></ng-content>'
})
export class LongPressComponent implements OnInit {
  @Input() duration: number = 500;
  @Output() longPress: EventEmitter<any> = new EventEmitter();
  @Output() longPressing: EventEmitter<any> = new EventEmitter();
  @Output() longPressEnd: EventEmitter<any> = new EventEmitter();

  private pressing: boolean;
  private isLongPressing: boolean;
  private timeout: any;
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor(private element: ElementRef) { }

  ngOnInit() {
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: { which: number; clientX: number; clientY: number; }) {
    // don't do right/middle clicks
    if(event.which !== 1) return;

    this.pressing = true;
    this.isLongPressing = false;
    this.timeout = setTimeout(() => {
      this.isLongPressing = true;
      this.longPress.emit(event);
      this.loop(event);
    }, this.duration);

    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: { clientX: number; clientY: number; }) {
    if(this.pressing && !this.isLongPressing) {
      const xThres = (event.clientX - this.mouseX) > 10;
      const yThres = (event.clientY - this.mouseY) > 10;
      if(xThres || yThres) {
        this.endPress();
      }
    }
  }

  @HostListener('mouseup')
  endPress() {
    clearTimeout(this.timeout);
    if(this.isLongPressing) {
      this.longPressEnd.emit(true);
    }
    this.isLongPressing = false;
    this.pressing = false;
  }

  loop(event: any) {
    if(this.isLongPressing) {
      this.timeout = setTimeout(() => {
        this.longPressing.emit(event);
        this.loop(event);
      }, 50);
    }
  }
}
