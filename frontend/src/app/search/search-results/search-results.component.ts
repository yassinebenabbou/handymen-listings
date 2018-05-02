import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Usergroup} from '../../shared/usergroup.enum';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnChanges {
  @Input() results;
  @Input() city;
  @Input() service;
  usergroups = Usergroup;
  pages;

  constructor() { }
  ngOnChanges() {
    const lastPage = Number(this.results.last_page);
    this.pages = Array.from(new Array(lastPage), (val, index) => index + 1);
  }

}
