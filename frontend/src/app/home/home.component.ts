import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../core/cities.service';
import { ServicesService } from '../core/services.service';
import { fadeInAnimation } from '../animations/fade-in.animation';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' }
})

export class HomeComponent implements OnInit {

  services: any[];
  cities: any[];

  constructor(private servicesService: ServicesService, private citiesService: CitiesService) { }

  ngOnInit() {
    this.servicesService.getAll()
      .subscribe(services => this.services = services);
    this.citiesService.getAll()
      .subscribe(cities => this.cities = cities);
  }
}
