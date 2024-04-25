import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {environment} from "../../../environments/environment";
import {Country} from "../interfaces/country";

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private readonly API_URL = environment.countriesApi;
  constructor(private readonly httpClient: HttpClient) { }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.API_URL}/alpha/${code}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
    )
  }

  public searchCapital(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/capital/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(catchError(() => of([])))
  }

  public searchCountry(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/name/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(catchError(() => of([])))
  }

  public searchRegion(term: string): Observable<Country[]> {
    const url = `${this.API_URL}/region/${term}`;

    return this.httpClient.get<Country[]>(url)
      .pipe(catchError(() => of([])))
  }
}
