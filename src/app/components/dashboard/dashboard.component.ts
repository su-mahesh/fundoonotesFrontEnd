import { Component, OnInit } from '@angular/core';
import {NotesService} from '../../services/NotesService/notes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private NotesService: NotesService) { }

  ngOnInit(): void {

    this.NotesService.GetActiveNotes().subscribe(
      (response: any) => {
      console.log(response);
    });
  }
}
