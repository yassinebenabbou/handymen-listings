import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { slideInOutAnimation } from '../../animations/slide-in-out.animation';
import { ServicesService } from '../../core/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css'],
  animations: [slideInOutAnimation],
  host: { '[@slideInOutAnimation]': '' }
})

export class ServiceFormComponent implements OnInit {

  serviceForm;
  newServiceForm;
  currentServices = [];

  services;

  constructor(private userService: UserService, private servicesService: ServicesService, private fb: FormBuilder, private router: Router) { }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === 27) {  // 27 = escape key code
      this.router.navigate(['edit-profile']);
    }
  }

  ngOnInit() {
    this.loadServices();
    this.servicesService.getAll()
      .subscribe(
        services => this.services = services
      );

    this.serviceForm = this.fb.group({
      service_id: ['', Validators.required]
    });

    this.newServiceForm = this.fb.group({
      service_name: ['', Validators.required]
    });
  }

  loadServices() {
    this.userService.getServices()
      .subscribe(
        services => this.currentServices = services
      );
  }

  trackService(index, service) {
    return service ? service.id : undefined;
  }

  listService(service) {
    if (service.confirmed) this.currentServices.unshift(service);
    else this.currentServices.push(service);
  }

  attachService() {
    if (this.currentServices.filter(item => item.id === +this.serviceForm.get('service_id').value).length > 0) {
      this.serviceForm.reset();
      return;
    }
    this.userService.attachService(this.serviceForm.get('service_id').value)
      .subscribe(
        newService => this.listService(newService)
      );
    this.serviceForm.reset();
  }

  attachNewService() {
    if (this.currentServices.filter(item => item.name.toLowerCase() === this.newServiceForm.get('service_name').value.toLowerCase()).length > 0) {
      this.newServiceForm.reset();
      return;
    }
    this.userService.attachNewService(this.newServiceForm.value)
      .subscribe(
        newService => this.listService(newService)
      );
    this.newServiceForm.reset();
  }

  detachService(service) {
    const index = this.currentServices.indexOf(service);
    this.userService.detachService(service.id)
      .subscribe(
        () => this.currentServices.splice(index, 1)
      );
  }

}
