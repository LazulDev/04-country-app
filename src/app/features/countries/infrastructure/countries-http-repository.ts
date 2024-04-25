import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {catchError, lastValueFrom, map, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {CountriesRepository} from "../domain/countries-repository";
import {Country} from "../domain/country";
import {CountriesMapper, CountryMapper} from "./countries-mapper";
import {CountryDto} from "./country-dto";

@Injectable()
export class CountriesHttpRepository implements CountriesRepository {

  private readonly API_URL = environment.countriesApi;
  constructor(
    private readonly httpClient: HttpClient,
    private readonly countriesMapper: CountriesMapper,
    private readonly countryMapper: CountryMapper
  ) {}

  public findByAlphaCode(code: string): Promise<Country | null> {
    const url = `${this.API_URL}/alpha/${code}`;

    return lastValueFrom(this.httpClient.get<CountryDto[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? this.countryMapper.fromDto(countries[0]) : null),
        catchError(() => of(null))
    ))
  }

  public findAllByCapital(capital: string) {
    const url = `${this.API_URL}/capital/${capital}`;

    return this.getCountries(url)
  }

  public findAllByName(name: string): Promise<Country[]> {
    const url = `${this.API_URL}/name/${name}`;

    return this.getCountries(url);
  }

  public findAllByRegion(term: string): Promise<Country[]> {
    const url = `${this.API_URL}/region/${term}`;

    return this.getCountries(url);
  }

  private getCountries(url: string): Promise<Country[]> {
    return lastValueFrom(this.httpClient.get<CountryDto[]>(url)
      .pipe(
        map(countries => this.countriesMapper.fromDto(countries)),
        catchError(() => of([]))
      ))
  }
}
