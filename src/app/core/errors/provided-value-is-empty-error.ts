export class ProvidedValueIsEmptyError extends Error {
  constructor() {
    super('Provided value must not be empty.')
  }
}
