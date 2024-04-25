import {Component, Inject, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {CountriesRepository} from "../../domain/countries-repository";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";
import {CountryDto} from "../../infrastructure/country-dto";

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
export class ByRegionPageComponent implements OnDestroy {

  countries: CountryDto[] = []

  private readonly subscription = new Subscription();
  constructor(@Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository) {}
  searchBy(region: string) {
    this.subscription.add(this.countriesRepository.searchByRegion(region)
      .subscribe(countries => this.countries = countries));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
