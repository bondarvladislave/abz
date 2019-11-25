import {Component, OnInit} from '@angular/core';
import {IUser, UserService} from '../../services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {FileValidator} from 'ngx-material-file-input';
import {switchMap} from 'rxjs/operators';
import {MatDialog} from '@angular/material';
import {ConfirmDialogComponent} from '../../components/confirm-dialog/confirm-dialog.component';

interface IStack {
  img: string;
  caption: string;
  text: string;
}

interface IOptions {
  id: number;
  name: string;
}

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.sass']
})
export class HomePageComponent implements OnInit {

  public stackData: IStack[] = [
    {
      img: 'html.svg',
      caption: 'I\'m in love with HTML',
      text: 'Hypertext Markup Language (HTML) is the standard markup language for creating web pages and web applications.'
    },
    {
      img: 'css.svg',
      caption: 'CSS is my best friend',
      text: 'Cascading Style Sheets (CSS) is a  style sheet language used for describing the presentation of a document written in a markup language like HTML.'
    },
    {
      img: 'javascript.svg',
      caption: 'JavaScript is my passion',
      text: 'JavaScript is a high-level, interpreted programming language. It is a language which is also characterized as dynamic, weakly typed, prototype-based and multi-paradigm.'
    },
  ];

  public users: IUser[] = [];

  public positionsList: IOptions[];

  private userListPage = 1;
  private userListCount = 6;
  private currentUserListPage = 1;
  private currentUserListCount = 6;
  public isShowMoreHidden = false;

  public form: FormGroup = this.fb.group({
    name: ['',
      Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(60)]
      )],
    email: ['', Validators.compose([
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      Validators.pattern('^(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])$')
    ])],
    phone: ['', Validators.compose([
      Validators.required
    ])],
    position_id: ['', Validators.required],
    photo: ['', Validators.compose([
      FileValidator.maxContentSize(5000000),
      Validators.required
    ])]
  });

  constructor(private userService: UserService,
              private authService: AuthService,
              private fb: FormBuilder,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    this.form.controls.photo.valueChanges.subscribe(res => {
      let file;
      res &&  (file = res.files[0]);
      const _URL = window.URL;
      const pixels = 70;
      const img = new Image();
      if (file) {
        img.onload = () => {
          if (img.width < pixels || img.height < pixels) {
            this.form.controls.photo.setErrors({incorrectSize: true});
          } else {
            this.form.controls.photo.setErrors(null);
          }
        };
        img.src = _URL.createObjectURL(file);
      }
    });
    // TODO: relocate to app component
    this.authService.getToken().subscribe();
    if (window.innerWidth < 768) {
      this.userListPage = 1;
      this.userListCount = 3;
      this.currentUserListPage = 1;
      this.currentUserListCount = 3;
    }
    this.getUsers();
    this.userService.getPositions().subscribe(positionsList => {
      this.positionsList = positionsList;
    });
  }

  public showMore() {
    ++this.currentUserListPage;
    this.getUsers();
  }

  private getUsers() {
    this.userService.getUserList(this.currentUserListPage, this.currentUserListCount).subscribe((users) => this.listBuilder(users));
  }

  private listBuilder(users) {
    if (users.length < this.userListCount) {
      this.isShowMoreHidden = true;
    }
    this.users = [...this.users, ...users];
    this.userListSort();
  }

  // sorted on backend? or i must do it
  private userListSort() {
    this.users.sort((a, b) => {
      return b.registration_timestamp - a.registration_timestamp;
    });
  }


  // TODO: should i use optimistic updates and just push new person in user array?
  public createUser() {
    this.userService.createUser(this.form.value).pipe(
      switchMap(() => this.userService.getUserList(1, this.currentUserListCount))).subscribe((users) => {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
          width: '290px'
        });
        this.form.reset();
        this.currentUserListPage = this.userListPage;
        this.users = [];
        this.listBuilder(users);
    });
  }
}
