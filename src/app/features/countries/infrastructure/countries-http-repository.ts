import {HttpClient} from "@angular/common/http";
import {Injectable} from '@angular/core';
import {catchError, delay, lastValueFrom, map, Observable, of, tap} from "rxjs";
import {environment} from "../../../environments/environment";
import {CountriesRepository} from "../domain/countries-repository";
import {Country} from "../domain/country";
import {Region} from "../domain/region";
import {CacheStorage} from "./cache-storage";
import {CountriesMapper, CountryMapper} from "./countries-mapper";
import {CountryDto} from "./country-dto";

@Injectable()
export class CountriesHttpRepository implements CountriesRepository {

  public cacheStorage: CacheStorage = {
    byCapital: {term: '', countries: []},
    byRegion: {region: '', countries: []},
    byCountry: {term: '', countries: []}
  }

  private saveToLocalStorage(cache: CacheStorage) {
    localStorage.setItem('countriesCache', JSON.stringify(cache))
  }

  private loadFromLocalStorage() {
    const cache = localStorage.getItem('countriesCache')
    if (cache === null) return
    this.cacheStorage = JSON.parse(cache)
  }

  private readonly API_URL = environment.countriesApi;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly countriesMapper: CountriesMapper,
    private readonly countryMapper: CountryMapper
  ) {
    this.loadFromLocalStorage()
  }

  public findByAlphaCode(code: string): Promise<Country | null> {
    const url = `${this.API_URL}/alpha/${code}`;

    return lastValueFrom(this.httpClient.get<CountryDto[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? this.countryMapper.fromDto(countries[0]) : null),
        catchError(() => of(null))
    ))
  }

  public findAllByCapital(term: string) {
    const url = `${this.API_URL}/capital/${term}`;

    return lastValueFrom(this.getCountries(url)
      .pipe(
        tap(countries => (this.cacheStorage.byCapital = {term, countries})),
        tap(() => this.saveToLocalStorage(this.cacheStorage))
      )
    )
  }

  public findAllByName(term: string) {
    const url = `${this.API_URL}/name/${term}`;

    return lastValueFrom(this.getCountries(url)
      .pipe(
        tap(countries => (this.cacheStorage.byCountry = {term, countries})),
        tap(() => this.saveToLocalStorage(this.cacheStorage))
      )
    )
  }

  public findAllByRegion(region: Region) {
    const url = `${this.API_URL}/region/${region}`;

    return lastValueFrom(this.getCountries(url)
      .pipe(
        tap(countries => (this.cacheStorage.byRegion = {region, countries})),
        tap(() => this.saveToLocalStorage(this.cacheStorage))
      )
    )
  }

  private getCountries(url: string): Observable<Country[]> {
    return this.httpClient.get<CountryDto[]>(url)
      .pipe(
        map(countries => this.countriesMapper.fromDto(countries)),
        catchError(() => of([])),
        delay(2000)
      )
  }
}
