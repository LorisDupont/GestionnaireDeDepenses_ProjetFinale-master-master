import { Component, OnInit } from '@angular/core';
import {  Depense } from 'src/app/models/depense-model';
import { DepenseService } from 'src/app/services/depense.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {
  depenses: any = [];
  infos: any= [];
  isOpen = false;

  
url = `http://localhost:5001/api/depenses/`
items= []
item = null
newArr: string[] = []


  constructor(private http: HttpClient ,private service: DepenseService,private tokenStorage: TokenStorageService) {
    
    let idU = this.tokenStorage.getUser().id
    this.http.get(this.url).toPromise().then(data => {
      console.log(data);
      for(let d in data ){
        let idD = data[d].id
          if(data.hasOwnProperty(d) ){
            
              this.items.push(data[d])
    
              console.log(idD, idU);
              console.log(this.items.length);

      }
      }
      
      

      
    })

   }

  ngOnInit() {
    // this.service.findAll()
    // .subscribe(response => {
    //   this.infos = response;

    // });
    // console.log(this.infos);
    var uniqueArr = [...new Set(this.items)]
    console.log(uniqueArr);
    
  }

  openModal(){
    document.getElementById('modal').style.width='100%';
    document.getElementById('modal').style.height='100%';
    document.getElementById('modal').style.zIndex='3';
    document.getElementById('modal').style.color='white';
    document.getElementById('modal').style.display='flex';
  }

  closeModal(){
    document.getElementById('modal').style.width='0';
    document.getElementById('modal').style.height='0';
    document.getElementById('modal').style.zIndex='0';
    document.getElementById('modal').style.color='white';
    document.getElementById('modal').style.display='none';
  }

  openFilter(){
    document.getElementById('depenses').style.marginTop='450px';
    document.getElementById('filter').style.height='auto';
    document.getElementById('filters').style.display='none';
    document.getElementById('filtercloses').style.display='flex';
    document.getElementById('filter').style.width='100%';
  }
  closefilter(){
    document.getElementById('depenses').style.marginTop='0px';
    document.getElementById('filter').style.height='0';
    document.getElementById('filters').style.display='flex';
    document.getElementById('filter').style.width='0';
    document.getElementById('filtercloses').style.display='none';
  }

  removeItem(item) {
    this.service.delete(item.id).subscribe((res) => {
      console.log(res);
      
    })
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i] == item) {
        this.items.splice(i, 1);
      }
    }}
    async reloadPage() {
      await window.location.reload();
  
  }


}
