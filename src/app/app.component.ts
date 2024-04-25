import {HttpClientModule} from "@angular/common/http";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {COMMON_SIDEBAR_ITEMS} from "./core/ui/sidebar-items";
import {CountriesModule} from "./features/countries/countries.module";
import {COUNTRY_SIDEBAR_ITEMS} from "./features/countries/ui/country-sidebar-items";
import {SidebarComponent} from "./shared/components/sidebar/sidebar.component";
import {AboutPageComponent} from "./shared/pages/about-page/about-page.component";
import {ContactPageComponent} from "./shared/pages/contact-page/contact-page.component";
import {HomePageComponent} from "./shared/pages/home-page/home-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    AboutPageComponent,
    ContactPageComponent,
    HomePageComponent,
    SidebarComponent,
    CountriesModule,
    HttpClientModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = '04-country-app';

  sidebarItems = [...COMMON_SIDEBAR_ITEMS, ...COUNTRY_SIDEBAR_ITEMS];
}
