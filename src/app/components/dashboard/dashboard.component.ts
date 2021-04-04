import { AfterViewInit, Component, ElementRef, HostListener, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import {NotesService} from '../../services/NotesService/notes.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import {NoteDisplayComponent} from '../note-display/note-display.component';
import {NoteCreateComponent} from '../note-create/note-create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {  

    updating: boolean = false;
    mobileQuery: MediaQueryList;
    value = 'Search';
    shouldRun = true;
    notes!: Array<{title:string, text:string, createdOn:Date, IsPin:boolean, noteID:boolean}>;
    title : string; 
    fillerContent : any;
    updateNote : any

  private _mobileQueryListener: () => void;

   constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private NotesService: NotesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title = 'FunDooNotes';
   
  }
  ngOnInit(): void {
    this.loadActiveNotes();
  }
  receiveMessage($event: any) {
    this.loadActiveNotes();
  }
     
  loadActiveNotes(){
    this.NotesService.GetActiveNotes().subscribe(
      (response: any) => {
      this.notes = response['notes']['result'];
      console.log(this.notes);
    });
  }

  receiveNoteMessage($event: any) {
    this.updateNote = $event
    this.updating = true;
 //   console.log(this.updateNote)
  }

  UpdateNote(){
    let reqData={
      noteID : this.updateNote['noteID'],
      title :(<HTMLInputElement>document.getElementById("up-title")).innerText.trim(),
      text : (<HTMLInputElement>document.getElementById("up-note")).innerText.trim()
    }
    if(this.updateNote != reqData){
      console.log(reqData);
      this.NotesService.updateNote(reqData).subscribe(
        (response: any) => {
        console.log(response);
        this.loadActiveNotes();
      });;
     
    }
    this.updating = false;
  } 

  ngOnDestroy(): void {
  //  this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {
  }


}
