import { AfterViewInit, Component, Directive, ElementRef, HostListener, Input, OnChanges, OnInit, QueryList, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import {NotesService} from '../../services/NotesService/notes.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy, Renderer2} from '@angular/core';
import {NoteDisplayComponent} from '../note-display/note-display.component';
import {NoteCreateComponent} from '../note-create/note-create.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit, AfterViewInit, OnChanges {  

    updating: boolean = false;
    mobileQuery: MediaQueryList;
    value = 'Search';
    notes!: Array<{title:string, text:string, createdOn:Date, IsPin:boolean, noteID:boolean}>;
    title : string; 

    updateNote : any
    @ViewChild("upnote")  upNote! : ElementRef;
    top: number = 0;
    left : number = 0;
    more : boolean = false;
    private _mobileQueryListener: () => void;
    deleteNoteId: number = 0;
    prevNoteID : number = 0;

   constructor(private renderer: Renderer2, private elRef:ElementRef, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private NotesService: NotesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title = 'FunDooNotes';
  }

  @ViewChild('updateNote') set updatedNote(element: any) {
    if (element) {
      this.upNote.nativeElement.focus();
    }
  }
  
  @HostListener('click', ['$event'])
  position($event: any){
    if($event.srcElement.id=="moremenu"){
  //    console.log($event.path[3].id);
      
      this.left = $event.target.offsetLeft + $event.path[5].offsetLeft;
      this.top = $event.path[5].offsetTop + $event.path[3].clientHeight;
      if( this.prevNoteID == 0)
      {
        this.prevNoteID = this.deleteNoteId
      }
      if(this.prevNoteID == this.deleteNoteId){
        this.more = !this.more;
        this.prevNoteID = this.deleteNoteId
      }
      else{
        this.more = true;
        this.prevNoteID = this.deleteNoteId
      }
      
    }
    else{
      this.more = false;
    }    
  }

  deleteNote(){
    this.NotesService.deleteNote(this.deleteNoteId).subscribe(
      (response: any) => {
      this.loadActiveNotes();
    });;
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.updating)    
    console.log(changes)
  }
  ngOnInit(): void {
    this.loadActiveNotes();   
  }

  receiveMessage($event: any) {
    this.loadActiveNotes();
  }
     
  receiveMoreEvent($event: any) {
    this.deleteNoteId= $event;
  }

  loadActiveNotes(){
    this.NotesService.GetActiveNotes().subscribe(
      (response: any) => {
      this.notes = response['notes']['result'];
    });
  }
  
  receiveNoteMessage($event: any) {
    this.updateNote = $event
    this.updating = true;
  }
  focusNote(){
    this.upNote.nativeElement.focus();
  }

  UpdateNote(){
    
    let reqData={
      noteID : this.updateNote['noteID'],
      title :(<HTMLInputElement>document.getElementById("up-title")).innerText.trim(),
      text : (<HTMLInputElement>document.getElementById("upnote")).innerText.trim()
    }

    if(this.updateNote != reqData){
      this.NotesService.updateNote(reqData).subscribe(
        (response: any) => {
        this.loadActiveNotes();
      });;
    }
    this.updating = false;
  } 

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {

  }


}
