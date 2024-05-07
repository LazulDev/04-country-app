import { EmptyError, ProvidedValueIsEmptyError } from '../errors'
import { CallbackFunction } from './callback-function'

type IsValid = unknown | null | undefined | Maybe<unknown>

export class Maybe<Type> {
  private constructor(private readonly value: Type | null) {}

  static some<T>(value: T): Maybe<T> {
    if (!this.isValid(value)) {
      throw new ProvidedValueIsEmptyError()
    }
    return new Maybe(value)
  }

  static none<T>(): Maybe<T> {
    return new Maybe<T>(null)
  }

  static fromValue<T>(value: T | undefined | null): Maybe<T> {
    return this.isValid(value) ? Maybe.some(value as T) : Maybe.none<T>()
  }

  private static isValid(value: IsValid): boolean {
    if (value === undefined || value === null || this.isEmptyMaybe(value)) {
      return false
    }

    return true
  }

  private static isEmptyMaybe<R>(value: R): boolean {
    if (this.isMaybe(value)) {
      return !value.has()
    }

    return false
  }

  private static isMaybe(value: unknown | Maybe<unknown>): value is Maybe<unknown> {
    return value instanceof Maybe
  }

  has(): boolean {
    return this.value !== null
  }

  getOrElse(defaultValue: Type): Type {
    return this.value === null ? defaultValue : this.value
  }

  getOrOther<R = Type>(defaultValue: R): Type | R {
    return this.value === null ? defaultValue : this.value
  }

  getOrExecute(defaultValue: CallbackFunction<Type>): Type {
    return this.value === null ? defaultValue() : this.value
  }

  map<R>(f: (wrapped: Type) => R): Maybe<R> {
    if (this.value === null) {
      return Maybe.none<R>()
    } else {
      return Maybe.some(f(this.value))
    }
  }

  tap(f: (wrapped: Type) => void): Maybe<Type> {
    if (this.value !== null) {
      f(this.value)
    }

    return Maybe.fromValue(this.value)
  }

  flatMap<R>(f: (wrapped: Type) => Maybe<R>): Maybe<R> {
    if (this.value === null) {
      return Maybe.none<R>()
    } else {
      return f(this.value)
    }
  }

  getOrThrow(error?: Error): Type {
    return this.value === null
      ? (() => {
          if (error !== undefined) {
            throw error
          }
          throw new EmptyError()
        })()
      : this.value
  }

  orElse(value: Maybe<Type>) {
    return this.value === null ? value : this
  }
}
