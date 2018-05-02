import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import { SearchService } from './search.service';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { CitiesService } from '../core/cities.service';
import { ServicesService } from '../core/services.service';
import {Usergroup} from '../shared/usergroup.enum';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})
export class SearchComponent implements OnInit {

  service;
  city;
  services: any[];
  cities: any[];
  results;
  pending = false;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private servicesService: ServicesService, private citiesService: CitiesService) {
  }

  ngOnInit() {
    Observable.combineLatest([
      this.servicesService.getAll(),
      this.citiesService.getAll(),
      this.route.paramMap,
      this.route.queryParamMap,
    ])
      .switchMap(
        combined => {
          this.services = combined[0];
          this.cities = combined[1];

          this.city =  combined[2].get('city');
          this.service  =  combined[2].get('service');

          const page = combined[3].get('page');
          let usergroupID = null;
          if (combined[3].get('type') === 'particulier') {
            usergroupID = Usergroup.freelancer;
          } else if (combined[3].get('type') === 'societe') {
            usergroupID = Usergroup.company;
          }

          let searchService = this.service;
          let searchCity = this.city;

          if (this.services.findIndex(service => service.slug === searchService) < 0) searchService = '';
          if (this.cities.findIndex(city => city.slug === searchCity) < 0) searchCity = '';

          return this.searchService.search({
            city: searchCity,
            service: searchService,
            page: page,
            usergroup_id: usergroupID
          });
        }
      ).subscribe(
      results => {
        console.log(results);
        this.results = results;
      });
  }
}
