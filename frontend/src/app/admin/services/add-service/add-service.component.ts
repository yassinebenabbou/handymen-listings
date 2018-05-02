import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../../animations/slide-in-out.animation';
import { ServicesService } from '../../../core/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})
export class AddServiceComponent implements OnInit {
  pending = false;

  constructor(private servicesService: ServicesService, private router: Router) { }

  ngOnInit() {
  }

  create(service) {
    this.pending = true;
    this.servicesService.create(service)
      .subscribe(() => {
        this.pending = false;
        this.router.navigate(['/admin/services']);
      });
  }
}
