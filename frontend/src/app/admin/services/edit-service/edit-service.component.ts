import { Component, OnInit } from '@angular/core';
import { slideInOutAnimation } from '../../../animations/slide-in-out.animation';
import { ServicesService } from '../../../core/services.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})

export class EditServiceComponent implements OnInit {
  service: any;
  id: number;
  pending = false;

  constructor(private servicesService: ServicesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.servicesService.getOne(this.id)
      .subscribe(service => this.service = service);
  }


  update(service) {
    this.pending = true;
    this.servicesService.update(this.id, service)
      .subscribe(() => {
        this.pending = false;
        this.router.navigate(['/admin/services']);
      });
  }

}
