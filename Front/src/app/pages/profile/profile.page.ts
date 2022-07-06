import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  currentUser: any;
  user: any  = [];
  infos:any= [];
  salaire:number;
  solde:number;

  constructor( private router: Router , private http: HttpClient ,private authService: AuthService, private token: TokenStorageService,  private users: UserService) {
    this.currentUser = this.token.getUser();

    this.user = this.users.getInfo(this.currentUser.id);
    this.users.getInfo(this.currentUser.id)
    .subscribe(response => {
      this.infos = response;
    });
    this.solde = this.infos.salaire

   }
 

  ngOnInit() {
    if (!this.currentUser.id){
      document.getElementById("logout").style.display = "none"
      document.getElementById("connect").style.display = "flex"

    }else{
      document.getElementById("logout").style.display = "flex"
      document.getElementById("connect").style.display = "none"
      
    }

    this.users.getInfo(this.currentUser.id)
    .subscribe(response => {
      this.infos = response;
      this.solde = Number(this.infos.salaire)
      this.salaire= Number(this.infos.salaire)
    });

    
    
  }



  logout(){
    this.authService.logout().subscribe({
      next: data => {
        console.log('deconnecter');

      },
      error: err => {
        console.log('error');

      }
    });
    this.token.signOut();
    this.reloadPage()


  }

  reloadPage() {
    window.location.reload();


 }

 payer(){
  this.solde += this.salaire
  console.log(this.solde, this.salaire);
  
 }
 epargnes(){
  document.getElementById('modalEpargne').style.display="flex";
  
 }




}
