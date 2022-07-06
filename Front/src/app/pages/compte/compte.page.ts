import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/services/compte.service';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.page.html',
  styleUrls: ['./compte.page.scss'],
})
export class ComptePage implements OnInit {
  id : any
  form: any = {
    nom: null,
    description: null
  };
  constructor(private compteService: CompteService, private tokenStorage : TokenStorageService) {

    this.id = this.tokenStorage.getUser().id
    console.log(this.id);
    
   }

  ngOnInit() {
   
  }

  onSubmit(){
    const { nom, description } = this.form;
    const id = this.id
    const isSelect= false

    // console.log(id);
    
     this.compteService.create(nom, description, id, isSelect).subscribe({

      next: data => {


        console.log(data);
        
      },
      error: err => {
        console.log('error');

      }
    });
    this.reloadPage()
  }
  async reloadPage() {
    await window.location.reload();

}
delete(){
  const id = this.id

  // console.log(id);
  
   this.compteService.delete( id).subscribe({

    next: data => {


      console.log(data);
      
    },
    error: err => {
      console.log('error');

    }
  });
  this.reloadPage()
}

}
