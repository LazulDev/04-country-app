import {Component, Inject} from '@angular/core';
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {Country} from "../../domain/country";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";

@Component({
  selector: 'app-by-region-page',
  standalone: true,
    imports: [
        CountryTableComponent,
        SearchBoxComponent
    ],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  countries: Country[] = []

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {}

  async searchBy(region: string) {
    this.countries = await this.countriesRepository.findAllByRegion(region)
  }
}
