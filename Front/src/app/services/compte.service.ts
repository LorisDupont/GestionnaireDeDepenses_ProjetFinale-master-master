import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:5001/api/comptes/';
const httpOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })

};
@Injectable({
  providedIn: 'root',
})
export class CompteService {
   isSelect = false
  constructor(private http: HttpClient) {
    
  }

  create(nom: string,  description: string, userId: any, isSelect: any,): Observable<any> {
    return this.http.post(
      AUTH_API ,
      {
        nom,
        description,
        userId,
        isSelect,
    
      },
      httpOptions,
      
    );
   
  }
  findByPk(id: any): Observable<any> {
    return this.http.post(
      AUTH_API + `:${{id}}`,
      {
        id,

      },
      httpOptions
    );
  }
  delete(id: any): Observable<any>{
    return this.http.delete(
      AUTH_API + id,

      httpOptions
    );
}
// update(id: any) : Observable<any> {
//   return this.http.put(AUTH_API  + "comptes/update/"+id , this.isSelect , httpOptions)
//   .pipe(
//     map((res) => {
//       return res || {};
//     })
//   );

// }

}

