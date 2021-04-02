import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.scss']
})
export class NoteDisplayComponent implements OnInit {
  @Input() childMessage: any | undefined;
  constructor() { }
  title: string = '';
  ngOnInit(): void {
    console.log(this.childMessage);
  }
}
