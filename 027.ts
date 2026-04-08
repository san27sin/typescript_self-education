import { Simplify } from './025_simplify'

export type UnionToIntersection<Union> = (
    Union extends unknown
        ? (distributedUnion: Union) => void
        : never
) extends ((mergedIntersection: infer Intersection) => void)
    ? Intersection
    : never

type R = Simplify<UnionToIntersection<{ name: string } | { a: string } | { value: string }>>