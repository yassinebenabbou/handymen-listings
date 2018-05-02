import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/startWith';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Input() services: any[];
  @Input() cities: any[];
  @Input() city: string;
  @Input() service: string;
  form;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.form = this.fb.group({
      service: ['', Validators.required],
      city: ['', Validators.required]
    });

    if (this.city && this.service) {
      this.form.patchValue({city: this.city, service: this.service});
    }
  }

  search() {
    this.router.navigate(['/search', this.city, this.service]);
  }

}
