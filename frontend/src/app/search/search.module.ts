import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchService } from './search.service';
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './search.component';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultsComponent } from './search-results/search-results.component';

const searchRoutes: Routes = [
  { path: 'search/:city/:service', component: SearchComponent },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(searchRoutes)
  ],
  declarations: [SearchFormComponent, SearchComponent, SearchResultsComponent],
  exports: [ SearchComponent, RouterModule, SearchFormComponent ],
  providers: [
    SearchService
  ]
})
export class SearchModule { }
