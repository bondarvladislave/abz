import { Component, OnInit } from '@angular/core';

interface ILinkList {
  route: string;
  text: string;
}

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.sass']
})
export class FooterComponent implements OnInit {

  public linkList: ILinkList[][] = [
    [
      {
        route: '',
        text: 'News'
      },
      {
        route: '',
        text: 'Blog'
      },
      {
        route: '',
        text: 'Partners'
      },
      {
        route: '',
        text: 'Shop'
      },
    ],
    [
      {
        route: '',
        text: 'Overview'
      },
      {
        route: '',
        text: 'Design'
      },
      {
        route: '',
        text: 'Overview'
      },
      {
        route: '',
        text: 'Design'
      },
    ],
    [
      {
        route: '',
        text: 'Overview'
      },
      {
        route: '',
        text: 'Design'
      },
      {
        route: '',
        text: 'Overview'
      },
      {
        route: '',
        text: 'Design'
      },
    ],
    [
      {
        route: '',
        text: 'Overview'
      },
      {
        route: '',
        text: 'Design'
      },
      {
        route: '',
        text: 'Overview'
      },
      {
        route: '',
        text: 'Design'
      },
    ]
  ];

  constructor() { }

  ngOnInit() {
  }

}
