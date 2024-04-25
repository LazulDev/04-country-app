import {NgComponentOutlet} from "@angular/common";
import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Country} from "../../interfaces/country";
import {CountriesService} from "../../services/countries.service";

@Component({
  selector: 'app-country-page',
  standalone: true,
  imports: [],
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit {
  @Input('alphaCode') alphaCode ='';

  country?: Country ;
  constructor(
    private readonly router: Router,
    private readonly countryService: CountriesService
  ) { }

  ngOnInit(): void {
    this.countryService.searchCountryByAlphaCode(this.alphaCode)
      .subscribe(country => {
        if (!country) {
          this.router.navigateByUrl('')
        } else {
          this.country = country;
        }
      });
  }


}
