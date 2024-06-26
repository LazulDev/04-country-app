import {Component, Inject} from '@angular/core';
import {LoadingSpinnerComponent} from "../../../../shared/components/loading-spinner/loading-spinner.component";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {Country} from "../../domain/country";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";
import {Region} from "../../domain/region";

@Component({
  selector: 'app-by-region-page',
  standalone: true,
  imports: [
    CountryTableComponent,
    SearchBoxComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {

  isLoading = false;
  countries: Country[] = []

  regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania']

  selectedRegion?: Region | '';

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {
    this.selectedRegion = this.countriesRepository.cacheStorage.byRegion.region;
    this.countries = this.countriesRepository.cacheStorage.byRegion.countries;
  }

  async searchBy(region: Region) {
    this.selectedRegion = region;
    this.isLoading = true
    this.countries = await this.countriesRepository.findAllByRegion(region).finally(() => this.isLoading = false)
  }
}
