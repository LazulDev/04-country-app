import {InjectionToken} from "@angular/core";
import {CountriesRepository} from "./countries-repository";

export const COUNTRY_REPOSITORY_TOKEN = new InjectionToken<CountriesRepository>('CountryRepository');
