import { Component, OnInit, Input, HostListener, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<boolean>();
  noteclick: boolean = false;
  @Input() childMessage: any | undefined;

  constructor() { }

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
  // @HostListener('mouseenter') 
  // onMouseEnter() {
  //   console.log(this.noteHover);
  // }

  // @HostListener('document:mouseover', ['$event']) 
  // click() {
  //   console.log(this.noteHover);
  // }
}
