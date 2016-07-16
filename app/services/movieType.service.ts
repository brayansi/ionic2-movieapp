import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class MovieTypeService {
    
   newType: EventEmitter<string> = new EventEmitter<string>();

   createNewType(type: string) {
       this.newType.emit(type);
   }
    
}