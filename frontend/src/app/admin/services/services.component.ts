import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../core/services.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[];
  pendingServices: any[];

  constructor(private servicesService: ServicesService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.url.subscribe(() => this.initServices());
  }

  initServices() {
    Observable.combineLatest([
      this.servicesService.getPending(),
      this.servicesService.getAll()
    ]).subscribe(
      combined => {
        this.pendingServices = combined[0];
        this.services = combined[1];
      });
  }

  remove(service) {
    this.servicesService.destroy(service.id)
      .subscribe(
        () => {
          const serviceArray = service.confirmed ? 'services' : 'pendingServices';
          const index = this[serviceArray]
            .findIndex(s => s.id === service.id);
          this[serviceArray].splice(index, 1);
        }
      );
  }

}
