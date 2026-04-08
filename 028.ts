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