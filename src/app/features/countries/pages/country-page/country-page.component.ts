import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {CountriesRepository} from "../../domain/countries-repository";
import {COUNTRY_REPOSITORY_TOKEN} from "../../domain/country-repository-token";
import {CountryDto} from "../../infrastructure/country-dto";

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {
  @Input('alphaCode') alphaCode = '';

  country?: CountryDto ;
  constructor(
    private readonly router: Router,
    @Inject(COUNTRY_REPOSITORY_TOKEN) private readonly countriesRepository: CountriesRepository
  ) { }

  ngOnInit(): void {
    this.countriesRepository.searchByAlphaCode(this.alphaCode)
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl('')
        } else {
          this.country = country;
        }
      });
  }


}
