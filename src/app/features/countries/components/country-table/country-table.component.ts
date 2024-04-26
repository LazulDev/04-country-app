import {DecimalPipe} from "@angular/common";
import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Country} from "../../domain/country";
import {CountryDto} from "../../infrastructure/country-dto";

@Component({
  selector: 'countries-country-table',
  standalone: true,
  imports: [
    DecimalPipe,
    RouterLink
  ],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  @Input()
  public countries: Country[] = []
}
