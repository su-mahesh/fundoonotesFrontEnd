import { Component, OnInit } from '@angular/core';
import {NotesService} from '../../services/NotesService/notes.service';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {  
    mobileQuery: MediaQueryList;
    value = 'Search';
    shouldRun = true;
    notes!: Array<{title:string, text:string, createdOn:Date, IsPin:boolean}>;
    title : string; 
    fillerContent : any;
  
       
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
  
  loadActiveNotes(){
    this.NotesService.GetActiveNotes().subscribe(
      (response: any) => {
      this.notes = response['notes']['result']
    });
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
