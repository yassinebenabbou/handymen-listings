import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { slideInOutAnimation } from '../../../animations/slide-in-out.animation';

@Component({
  selector: 'app-city-form',
  templateUrl: './city-form.component.html',
  styleUrls: ['./city-form.component.css']
})

export class CityFormComponent implements OnInit {
  form;
  @Input() pending;
  @Input() city;
  @Output() submitForm = new EventEmitter();

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      name_ar: ['', Validators.required],
    });

    if (this.city) this.form.patchValue(this.city);
  }

  submit() {
    this.submitForm.emit(this.form.value);
  }

}
