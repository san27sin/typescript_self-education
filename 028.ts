import { UnionToIntersection } from './027'
import { IsNever } from './024_asserts'

export {}

// хак компилятора
type LastOf<T> = UnionToIntersection<T extends unknown ? () => T : never> extends () => (infer R) ? R : never

type TuplifyUnion<T, L = LastOf<T>> =
    IsNever<T> extends true ? []
    : [...TuplifyUnion<Exclude<T, L>>, L]

type abc = 'a' | 'b' | 'c'
type t = TuplifyUnion<abc> // ['a', 'b', 'c']

// Домашнее задание

type ObjectToTuple<T, U = keyof T> =
  IsNever<U> extends true ? []
    : LastOf<U> extends infer L
      ? [...ObjectToTuple<T, Exclude<U, L>>, [L, T[L & keyof T]]]
      : never

type R = ObjectToTuple<{ name: string, value: number }>
// [['name', string], ['value', number]]