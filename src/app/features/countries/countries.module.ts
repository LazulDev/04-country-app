import { NgModule } from '@angular/core';
import {RouterModule} from "@angular/router";
import {countriesRoutes} from "./countries.routes";
import {COUNTRY_REPOSITORY_TOKEN} from "./domain/country-repository-token";
import {CountriesHttpRepository} from "./infrastructure/countries-http-repository";
import {ByCapitalPageComponent} from "./pages/by-capital-page/by-capital-page.component";
import {ByCountryPageComponent} from "./pages/by-country-page/by-country-page.component";
import {ByRegionPageComponent} from "./pages/by-region-page/by-region-page.component";
import {CountryPageComponent} from "./pages/country-page/country-page.component";

const PAGES = [
  ByCapitalPageComponent,
  ByCountryPageComponent,
  ByRegionPageComponent,
  CountryPageComponent
];

@NgModule({
  providers: [{
    provide: COUNTRY_REPOSITORY_TOKEN,
    useClass: CountriesHttpRepository
  }],
  imports: [
    PAGES,
    RouterModule.forChild(countriesRoutes),
  ]
})
export class CountriesModule { }
