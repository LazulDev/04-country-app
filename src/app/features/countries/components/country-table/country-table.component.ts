import {Component, Input} from '@angular/core';
import {CountryDto} from "../../infrastructure/country-dto";

@Component({
  selector: 'countries-country-table',
  standalone: true,
  imports: [],
  templateUrl: './country-table.component.html',
  styleUrl: './country-table.component.css'
})
export class CountryTableComponent {
  @Input()
  public countries: CountryDto[] = []
}
