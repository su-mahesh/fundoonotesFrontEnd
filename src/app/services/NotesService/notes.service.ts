import { Injectable } from '@angular/core';
import { HttpService } from '../HttpServices/http.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private httpService : HttpService) { }

  GetActiveNotes(){
    let headers = new HttpHeaders()
    .set('Authorization', 'Bearer '+localStorage.getItem('FunDooNotesJWT')); 
    let options = { headers: headers };
    return this.httpService.Get('Notes', options)
  }
}
