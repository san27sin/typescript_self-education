// Required Optional Readonly writable

import { IsEqual } from './026_IsEqual'

export {}

type User = {
  name: string
  value?: string
  value2: string | undefined
}

export type RequiredKeysOf<BaseType extends object> = Exclude<{
  [Key in keyof BaseType]: BaseType extends Required<{[InnerKey in Key]: BaseType[InnerKey]}> ? Key : never // ключи вернутся только для обязательных полей
}[keyof BaseType], undefined>

export type RequiredKeysOf2<BaseType extends object, Key = keyof BaseType> =
  Key extends unknown ?
    BaseType extends Record<Key, BaseType[Key]> ? Key : never
  : never

export type WritableKeysOf<T> = Exclude<
  {
    [P in keyof T]: IsEqual<
      { [Q in P]: T[P] },
      { readonly [Q in P]: T[P] }
    > extends false
      ? P
      : never
  }[keyof T],
undefined>


// Домашняя работа

type Spread<T, K> = T | K // дженерика для примера

type R = Spread<{name: string}, {name: number}> // { name: number }
type R2 = Spread<{name: string}, {name?: number}> // { name: string | number | undefined }
type R3 = Spread<{name?: string}, {name?: number}> // { name?: string | number | undefined }