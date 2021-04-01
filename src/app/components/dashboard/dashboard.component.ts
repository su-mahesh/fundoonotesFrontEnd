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
//  fillerNav = Array.from({length: 5}, (_, i) => `Nav Item ${i + 1}`);
title : string; 
  fillerContent = Array.from({length: 5}, () =>
      ``);

       
  private _mobileQueryListener: () => void;

   constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private NotesService: NotesService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.title = 'FunDooNotes';
  }
  ngOnInit(): void {

    this.NotesService.GetActiveNotes().subscribe(
      (response: any) => {
      console.log(response);
    });
  }
  
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
}
