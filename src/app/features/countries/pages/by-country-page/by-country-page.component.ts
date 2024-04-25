import {Component, Inject, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";
import {CountryDto} from "../../infrastructure/country-dto";

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
export class ByCountryPageComponent implements OnDestroy {

  countries: CountryDto[] = []

  private readonly subscription = new Subscription();

  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {}

  searchBy(term: string) {
    this.subscription.add(this.countriesRepository.searchByName(term)
      .subscribe(countries => this.countries = countries));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
