import { Component, OnInit, Input, HostListener, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {

  @Output() messageEvent = new EventEmitter<boolean>();
  @Output() moreEvent = new EventEmitter<boolean>();
  noteclick: boolean = false;
  @Input() childMessage: any | undefined;
  @ViewChild('moremenu') element!: ElementRef;
  top: number = 0;
  left : number = 0;
  more : boolean = false;
  constructor(elRef:ElementRef) { }
  move($event: any) {
    this.more = !this.more;
    this.moreEvent.emit(this.childMessage['noteID']);
  }

   @HostListener('click', ['$event'])
   noteClick(){
   }
   sendMessage() {
    this.messageEvent.emit(this.childMessage)
  }
  updateNoteProcess(){
    this.sendMessage();
  }
  ngOnInit(): void {
  }
}
