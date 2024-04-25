import { Component } from '@angular/core';
import {Subscription} from "rxjs";
import {SearchBoxComponent} from "../../../../shared/components/search-box/search-box.component";
import {CountryTableComponent} from "../../components/country-table/country-table.component";
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";

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

  private readonly subscription = new Subscription();
  constructor(private readonly countriesService: CountriesService) {}
  searchBy(region: string) {
    this.subscription.add(this.countriesService.searchRegion(region)
      .subscribe(countries => this.countries = countries));
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
