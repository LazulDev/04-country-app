import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";

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

  countries: Country[] = []

  private readonly subscription = new Subscription();
  constructor(private readonly countriesService: CountriesService) {}
  searchBy(term: string) {
    this.subscription.add(this.countriesService.searchCountry(term)
      .subscribe(countries => this.countries = countries));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
