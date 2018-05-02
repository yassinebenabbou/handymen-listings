import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../../core/cities.service';
import { Router } from '@angular/router';
import { slideInOutAnimation } from '../../../animations/slide-in-out.animation';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})

export class AddCityComponent implements OnInit {
  pending = false;

  constructor(private citiesService: CitiesService, private router: Router) { }

  ngOnInit() {
  }

  create(city) {
    this.pending = true;
    this.citiesService.create(city)
      .subscribe(() => {
        this.pending = false;
        this.router.navigate(['/admin/cities']);
      });
  }

}
