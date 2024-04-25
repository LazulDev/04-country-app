import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'shared-search-box',
  standalone: true,
  imports: [],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})
export class SearchBoxComponent {
  @Input() placeholder: string = '';
  @Output() onValue = new EventEmitter<string>();

  onKeyup(value: string) {
    this.onValue.emit(value);
  }

}
