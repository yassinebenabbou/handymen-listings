import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-picture-form',
  templateUrl: './picture-form.component.html',
  styleUrls: ['./picture-form.component.css']
})
export class PictureFormComponent implements OnInit {

  form;
  pending = false;
  @ViewChild('fileInput') fileInput;
  @Input() picture;

  constructor(private userService: UserService, private fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      picture: ['', Validators.required]
    });
  }

  onFileChange() {
    this.form.get('picture').patchValue('set');
  }

  upload() {
    const fileBrowser = this.fileInput.nativeElement;
    if (fileBrowser.files && fileBrowser.files[0]) {
      const formData = new FormData();
      formData.append('picture', fileBrowser.files[0]);
      this.form.reset();
      this.pending = true;
      this.fileInput.nativeElement.value = null;
      this.userService.uploadPicture(formData).subscribe(
        picture => this.picture = picture.filename,
        null,
        () => this.pending = false
      );
    }
  }

}
