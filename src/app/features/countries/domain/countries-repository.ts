import {Country} from "./country";

export interface CountriesRepository {
  findByAlphaCode(code: string): Promise<Country | null>;
  findAllByCapital(capital: string): Promise<Country[]>
  findAllByName(name: string): Promise<Country[]>
  findAllByRegion(term: string): Promise<Country[]>
}
