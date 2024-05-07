import {Component, Inject} from '@angular/core';
import {LoadingSpinnerComponent} from "../../../../shared/components/loading-spinner/loading-spinner.component";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {Country} from "../../domain/country";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";

@Component({
  selector: 'app-by-country-page',
  standalone: true,
  imports: [
    CountryTableComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  isLoading = false
  term: string;
  countries: Country[]

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {
    this.term = this.countriesRepository.cacheStorage.byCountry.term;
    this.countries = this.countriesRepository.cacheStorage.byCountry.countries

  }

  async searchBy(term: string) {
    this.isLoading = true
    this.countries = await this.countriesRepository.findAllByName(term)
      .finally(() => this.isLoading = false)
  }

}
