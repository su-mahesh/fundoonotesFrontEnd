import { Component, OnInit, HostListener, ElementRef, AfterViewInit, Input  } from '@angular/core';

@Component({
  selector: 'app-note-create',
  templateUrl: './note-create.component.html',
  styleUrls: ['./note-create.component.scss']
})
export class NoteCreateComponent implements OnInit, AfterViewInit  {
  pin : boolean = false;
  fullEdit : boolean = true;

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.fullEdit = false;
    }
  }
  
  constructor(private eRef: ElementRef) {
   
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
