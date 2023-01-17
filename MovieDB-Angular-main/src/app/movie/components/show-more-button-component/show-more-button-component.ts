import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-more',
  templateUrl: './show-more-button-component.html',
  styleUrls: ['./show-more-button-component.css']
})
export class ShowMoreButtonComponent implements OnInit {

  constructor() { }
  isCollapsed = true;
  ngOnInit(): void {
  }

}
