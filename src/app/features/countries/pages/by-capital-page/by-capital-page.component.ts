import {JsonPipe} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {Component, OnDestroy} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";

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

  countries: Country[] = []

  private readonly subscription = new Subscription();
  constructor(private readonly countriesService: CountriesService) {}
  searchBy(term: string) {
    this.subscription.add(this.countriesService.searchCapital(term)
      .subscribe(countries => this.countries = countries));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
