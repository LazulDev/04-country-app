import {JsonPipe} from "@angular/common";
import {Component, Inject} from '@angular/core';
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
    CountryTableComponent
  ],
  providers: [],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  countries: Country[] = []

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {}

  async searchByTerm(term: string) {
    this.countries = await this.countriesRepository.findAllByCapital(term)
  }

}
