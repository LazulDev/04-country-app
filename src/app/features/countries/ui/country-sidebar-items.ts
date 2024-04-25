import {Item} from "../../../shared/components/sidebar/domain/items";

export const COUNTRY_SIDEBAR_ITEMS: Item[] = [
  {
    title: 'Por capital',
    routerLink: ['countries', 'by-capital'],
  },
  {
    title: 'Por país',
    routerLink: ['countries', 'by-country'],
  },
  {
    title: 'Por región',
    routerLink: ['countries', 'by-region'],
  }
]
