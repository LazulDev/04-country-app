import {HttpClient} from "@angular/common/http";
import {Injectable, InjectionToken} from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {CountriesRepository} from "../domain/countries-repository";
import {CountryDto} from "./country-dto";

@Injectable()
export class CountriesHttpRepository implements CountriesRepository {

  private readonly API_URL = environment.countriesApi;
  constructor(private readonly httpClient: HttpClient) { }

  public searchByAlphaCode(code: string): Observable<CountryDto | null> {
    const url = `${this.API_URL}/alpha/${code}`;

    return this.httpClient.get<CountryDto[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
    )
  }

  public searchByCapital(capital: string): Observable<CountryDto[]> {
    const url = `${this.API_URL}/capital/${capital}`;

    return this.httpClient.get<CountryDto[]>(url)
      .pipe(catchError(() => of([])))
  }

  public searchByName(name: string): Observable<CountryDto[]> {
    const url = `${this.API_URL}/name/${name}`;

    return this.httpClient.get<CountryDto[]>(url)
      .pipe(catchError(() => of([])))
  }

  public searchByRegion(term: string): Observable<CountryDto[]> {
    const url = `${this.API_URL}/region/${term}`;

    return this.httpClient.get<CountryDto[]>(url)
      .pipe(catchError(() => of([])))
  }
}
