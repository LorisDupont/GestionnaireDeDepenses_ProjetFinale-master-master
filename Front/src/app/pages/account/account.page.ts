import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/services/compte.service';
import { DepenseService } from 'src/app/services/depense.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  url = `http://localhost:5001/api/comptes`
  items= []
  
  constructor(private http: HttpClient,private tokenStorage: TokenStorageService, public compte: CompteService) {
    let idU = this.tokenStorage.getUser().id
    this.http.get(this.url).toPromise().then(data => {
      console.log(data);
      for(let d in data){
        let idD = data[d].id
  
        if(data.hasOwnProperty(d))
          this.items.push(data[d])

        }
          

    })
   }

  ngOnInit() {
    let selection = this.compte.isSelect
    console.log(this.compte.isSelect);
    
    if(selection){
      document.getElementById('ionCard').style.border='1px solid green'
    }
  }

  removeItem(item) {
    this.compte.delete(item.id).subscribe((res) => {
      console.log(res);
      
    })
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] == item) {
        this.items.splice(i, 1);
      }
    }}

    select(item){
      // this.compte.update(item.id).subscribe((res) => {
      //   console.log(res);
        
      // })
   
      
    }
}
