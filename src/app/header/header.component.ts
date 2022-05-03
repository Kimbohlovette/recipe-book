import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthenticated:boolean = false;
  userSubs!: Subscription;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService){}
  ngOnInit(): void {
      this.userSubs = this.authService.user.subscribe(user=>{
        this.isAuthenticated = !!user;
      })
  }
  ngOnDestroy(): void {
      
  }
  onSaveData(){
    this.dataStorageService.storeRecipes();
  }

  onFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLockout(){
    this.authService.logout();
  }
}
