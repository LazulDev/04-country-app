import {JsonPipe} from "@angular/common";
import {Component, Inject} from '@angular/core';
import {LoadingSpinnerComponent} from "../../../../shared/components/loading-spinner/loading-spinner.component";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {Country} from "../../domain/country";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";

@Component({
  selector: 'app-by-capital-page',
  standalone: true,
  imports: [
    SearchBoxComponent,
    JsonPipe,
    CountryTableComponent,
    LoadingSpinnerComponent
  ],
  providers: [],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {
  term: string;
  countries: Country[]

  isLoading = false

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {
    this.term = this.countriesRepository.cacheStorage.byCapital.term;
    this.countries = this.countriesRepository.cacheStorage.byCapital.countries
  }

  async searchByTerm(term: string) {
    this.isLoading = true
    this.countries = await this.countriesRepository.findAllByCapital(term).finally(() => this.isLoading = false)
  }

}
