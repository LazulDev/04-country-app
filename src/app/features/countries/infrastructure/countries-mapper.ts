import {Injectable} from "@angular/core";
import {ReadMapper} from "../../../core/read-mapper";
import {Country} from "../domain/country";
import {CountryDto} from "./country-dto";

@Injectable()
export class CountriesMapper implements ReadMapper<CountryDto[], Country[]>{

  constructor(private readonly countryMapper: CountryMapper) {}
  fromDto(dtoList: CountryDto[]) {
    return dtoList.map(dto => this.countryMapper.fromDto(dto))
  }

}

@Injectable()
export class CountryMapper implements ReadMapper<CountryDto, Country>{
  fromDto(dto: CountryDto) {
    return {
      flagEmoji: dto.flag,
      flagImage: {url: dto.flags.svg, alt: dto.name.common},
      name: dto.name.common,
      capital: dto.capital?.at(0) ?? '-',
      population: dto.population
    }
  }
}
