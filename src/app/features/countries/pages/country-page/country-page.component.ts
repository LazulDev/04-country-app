import {DecimalPipe} from "@angular/common";
import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CountriesRepository} from "../../domain/countries-repository";
import {Country} from "../../domain/country";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [
    DecimalPipe
  ],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {
  @Input('alphaCode') alphaCode = '';

  country?: Country;

  constructor(
    private readonly router: Router,
    @Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository
  ) { }

  async ngOnInit() {
    const country = await this.countriesRepository.findByAlphaCode(this.alphaCode)
    if (!country) {
      this.router.navigateByUrl(''); // Redirect to home page
      return;
    }
    this.country = country;
  }
}
