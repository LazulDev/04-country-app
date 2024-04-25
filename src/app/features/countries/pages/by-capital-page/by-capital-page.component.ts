import {JsonPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Component, Inject, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";
import {CountryDto} from "../../infrastructure/country-dto";

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [
    SearchBoxComponent,
    JsonPipe,
    CountryTableComponent
  ],
  providers: [],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent implements OnDestroy {

  countries: CountryDto[] = []

  private readonly subscription = new Subscription();
  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {}

  searchByTerm(term: string) {
    this.subscription.add(this.countriesRepository.searchByCapital(term)
      .subscribe(countries => this.countries = countries));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
