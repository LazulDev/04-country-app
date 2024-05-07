import {Country} from "../domain/country";
import {Region} from "../domain/region";

export interface CacheStorage {
  byCapital: TermCountries;
  byRegion: RegionCountries;
  byCountry: TermCountries;
}
interface TermCountries {
  term: string;
  countries: Country[];
}

interface RegionCountries {
  region: Region | '';
  countries: Country[];
}
