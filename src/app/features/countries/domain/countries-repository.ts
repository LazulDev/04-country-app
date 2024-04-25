import {Observable} from "rxjs";
import {CountryDto} from "../infrastructure/country-dto";

export interface CountriesRepository {
  searchByAlphaCode(code: string): Observable<CountryDto | null>;
  searchByCapital(capital: string): Observable<CountryDto[]>
  searchByName(name: string): Observable<CountryDto[]>
  searchByRegion(term: string): Observable<CountryDto[]>
}
