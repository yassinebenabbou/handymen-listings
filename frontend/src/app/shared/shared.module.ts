import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  MdAutocompleteModule, MdButtonModule, MdButtonToggleModule, MdCardModule, MdCheckboxModule, MdIconModule,
  MdInputModule,
  MdRadioModule,
  MdSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { StoragePipe } from './storage.pipe';
import { StarRatingModule } from 'angular-star-rating';
import { RatingComponent } from './rating/rating.component';

@NgModule({
  imports: [
    CommonModule,
    StarRatingModule,
    TranslateModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    MdCheckboxModule,
    MdSelectModule,
    MdButtonModule,
    MdInputModule,
    MdCardModule,
    MdAutocompleteModule,
    MdRadioModule,
    MdButtonToggleModule,
    MdIconModule,
    AsyncPipe,
    BrowserAnimationsModule,
    TranslateModule,
    StoragePipe,
    StarRatingModule,
    RatingComponent
  ],
  declarations: [StoragePipe, RatingComponent],
  providers: []
})
export class SharedModule { }
