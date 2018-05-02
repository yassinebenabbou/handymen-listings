import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-service-form',
  templateUrl: './service-form.component.html',
  styleUrls: ['./service-form.component.css']
})
export class ServiceFormComponent implements OnInit {
  form;
  @Input() pending;
  @Input() service;
  @Output() submitForm = new EventEmitter();
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      name_ar: ['', Validators.required],
      confirmed: ['']
    });

    if (this.service) this.form.patchValue(this.service);
  }

  submit() {
    this.submitForm.emit(this.form.value);
  }

}
