
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';

// importing navbar items from constants file
import { NavItem, NavItems} from './sidenav.constants';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {

  // class state starts from here 
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile: boolean = true;
  isMenuCollapsed: boolean = true;
  navItems: NavItem[] = NavItems;
  userMenu;
  // constructor 
  constructor(private observer: BreakpointObserver, private router: Router,private authService:AuthService) { }


  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      // Check if the screen size is mobile or not
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    this.userMenu = [
      {
          label: 'Logout',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.logout();
        }
       
      },
      {
          label: 'Settings',
          icon: 'pi pi-fw pi-cog'
      }
  ];
  }

  // This function contains the logic reagrding close and open side nav
  toggleMenu() {
    if (this.isMobile) {
      this.sidenav.toggle();
      this.isMenuCollapsed = false;
    } else {
      this.sidenav.open();
      this.isMenuCollapsed = !this.isMenuCollapsed;
    }
  }


  logout(){
    this.authService.logout();
  }



 
}
