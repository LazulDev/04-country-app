import {Component, Inject} from '@angular/core';
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
        SearchBoxComponent
    ],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

  countries: Country[] = []

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {}

  async searchBy(term: string) {
    this.countries = await this.countriesRepository.findAllByName(term)
  }

}
