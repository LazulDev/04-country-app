import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {tap} from "rxjs";
import {Debouncer} from "../../../core/utils/debouncer";

@UntilDestroy({ checkProperties: true })
@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit {
  @Input() value: string = '';
  @Input() placeholder: string = '';

  @Output() onDebounce = new EventEmitter<string>();


  private readonly debouncer = Debouncer.build(300);

  onKeyPress(value: string) {
    this.debouncer.next(value);
  }

  ngOnInit(): void {
    this.debouncer.obs$.pipe(tap(console.info)).subscribe(value => this.onDebounce.emit(value));
  }

}
