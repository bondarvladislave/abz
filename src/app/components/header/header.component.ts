import {Component, OnInit} from '@angular/core';
import {IUser, UserService} from '../../services/user.service';

interface IMenu {
  route: string;
  text: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  private menuConfig: IMenu[] = [
    {
      route: 'index',
      text: 'About me'
    },
    {
      route: 'relationships',
      text: 'Relationships'
    },
    {
      route: 'requirements',
      text: 'Requirements'
    },
    {
      route: 'users',
      text: 'Users'
    },
    {
      route: 'sign-up',
      text: 'Sign Up'
    },
  ];
  private user: IUser;
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getUserById().subscribe(user => {
      this.user = user;
    });
  }

}
