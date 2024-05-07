import {debounceTime, Subject} from "rxjs";

export class Debouncer {
  private readonly debounce = new Subject<string>();
  private constructor (private readonly delay: number) {
  }

  static build(delayInMilliseconds: number): Debouncer {
    return new Debouncer(delayInMilliseconds);
  }

  public next(value: string) {
    this.debounce.next(value);
  }

   get obs$() {
    return this.debounce.asObservable().pipe(debounceTime(this.delay));
  }
}
