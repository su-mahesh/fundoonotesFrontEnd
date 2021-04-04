import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import {NotesService} from '../../services/NotesService/notes.service';

@Component({
  selector: 'app-note-update',
  templateUrl: './note-update.component.html',
  styleUrls: ['./note-update.component.scss']
})
export class NoteUpdateComponent implements OnInit {
  @Input() updateNote: any;
  constructor(private eRef:ElementRef, private NotesService:NotesService) { }


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target) ) {
      this.UpdateNote();
    }
  }
  UpdateNote(){
    let reqData={
      noteID : this.updateNote['noteID'],
      title :(<HTMLInputElement>document.getElementById("up-title")).innerText.trim(),
      text : (<HTMLInputElement>document.getElementById("up-note")).innerText.trim()
    }
    if(this.updateNote != reqData){
      console.log(reqData);
    //  this.NotesService.updateNote(reqData);
    }
  } 
  
  ngOnInit(): void {
  }

}
