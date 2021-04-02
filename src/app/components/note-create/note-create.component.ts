import { Component, OnInit, HostListener, ElementRef, AfterViewInit, Input, ViewChild  } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators,} from '@angular/forms';
import {NotesService} from '../../services/NotesService/notes.service';
@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export class NoteCreateComponent implements OnInit, AfterViewInit  {
  pin : boolean = false;
  fullEdit : boolean = false;


  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.fullEdit = false;
      this.createNote();
      (<HTMLInputElement>document.getElementById("note")).innerHTML = '';
    }
  }
  takeNote(){
    this.createNote();
    this.fullEdit = false;
    (<HTMLInputElement>document.getElementById("note")).innerHTML = '';
  }
  createNote(){
    let reqData={
      title :(<HTMLInputElement>document.getElementById("title"))?
       (<HTMLInputElement>document.getElementById("title")).value:'',
      text : (<HTMLInputElement>document.getElementById("note")).innerHTML.trim(),
      IsPin: this.pin
    }
    if(reqData.text != ''){
      this.NotesService.createNote(reqData).subscribe(
        (response: any) => {
        console.log(response);
      });;
    }
    this.pin = false
  }

  constructor(private eRef: ElementRef, private elRef:ElementRef, private NotesService:NotesService) {

   }
   move() {
    console.log(this.elRef.nativeElement.offsetTop);
  }
  ngAfterViewInit() {
  }

  ngOnInit(): void {
    
  }
  
  togglePin(){
    this.pin = !this.pin; 
  }
  adjustHeight(event: any){
    var target = event.target;
   target.style.height = "1px";
   target.style.height = (target.scrollHeight)+"px";
  }
  displayFull(){
    this.fullEdit = true;
  }
}
