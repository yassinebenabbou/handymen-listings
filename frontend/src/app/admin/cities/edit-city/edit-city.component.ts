import { Component, OnInit } from '@angular/core';
import { CitiesService } from '../../../core/cities.service';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInOutAnimation } from '../../../animations/slide-in-out.animation';

@Component({
  selector: 'app-edit-city',
  templateUrl: './edit-city.component.html',
  styleUrls: ['./edit-city.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class EditCityComponent implements OnInit {
  city: any;
  id: number;
  pending = false;

  constructor(private citiesService: CitiesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.citiesService.getOne(this.id)
      .subscribe(city => this.city = city);
  }

  update(city) {
    this.pending = true;
    this.citiesService.update(this.id, city)
      .subscribe(() => {
        this.pending = false;
        this.router.navigate(['/admin/cities']);
      });
  }

}
