import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { SearchService } from '../../search/search.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: any[];

  constructor(private searchService: SearchService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams
      .switchMap(queryParams => {
        return this.searchService.search({page: queryParams['page']});
      })
      .subscribe(page => {
        console.log('page', page);
        this.users = page.data;
      });
  }

}
