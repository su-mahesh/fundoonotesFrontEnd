import { Injectable } from '@angular/core';
import { HttpService } from '../HttpServices/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  headers = new HttpHeaders()
  .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT')); 
  options = { headers: this.headers };
  constructor(private httpService : HttpService) { }
  createNote(data: any){
    return this.httpService.post('Notes/AddNote', data, this.options)
  }
  GetActiveNotes(){

    return this.httpService.Get('Notes', this.options)
  }
  updateNote(data: any ) {
 
    return this.httpService.put('Notes/Update', data, this.options);
  }
}
