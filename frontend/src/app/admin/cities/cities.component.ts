import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../core/cities.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.css']
})
export class CitiesComponent implements OnInit {
  cities: any[];

  constructor(private citiesService: CitiesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.url.subscribe(() => this.initCities());
  }

  initCities() {
    this.citiesService.getAll()
      .subscribe(cities => this.cities = cities);
  }

  remove(city) {
    this.citiesService.destroy(city.id)
      .subscribe(
        () => {
          const index = this.cities.findIndex(c => c.id === city.id);
          this.cities.splice(index, 1);
        }
      );
  }

}
