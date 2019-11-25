import {Component, OnInit, Renderer2} from '@angular/core';
import {IUser, UserService} from '../../services/user.service';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public user: IUser;
  public isMenuVisible = true;

  constructor(private userService: UserService,
              private router: Router,
              private renderer: Renderer2) {
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.closeMenu();
      }
    });
    this.userService.getUserById().subscribe(user => {
      this.user = user;
    });
  }

  public closeMenu(): void {
    this.isMenuVisible = false;
    this.renderer.removeClass(document.body, 'side-menu-active');
  }


  public openMenu(): void {
    setTimeout(() => {
        this.isMenuVisible = true;
        this.renderer.addClass(document.body, 'side-menu-active');
    }, 0);
  }
}
