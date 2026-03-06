// 018 3.10 recursion

export {}

// мы можем использовать typescript типы для создания рекурсивных структур

type Tree<G> = {
  value: G
  children: Tree<G>[]
}

const tree: Tree<number> = {
  value: 1,
  children: [{ value: 2, children: [] }]
}

// мы можем это использовать для рекурсивных дженериков

type MyAwaited<T> = T extends Promise<infer V> ? V : T

type Res1 = MyAwaited<Promise<Promise<Promise<number>>>>

// и для рекурсивного обхода вложенных объектов

type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>
}

type Res2 = DeepReadonly<{ value: { title: string } }>

// Но мы можем использовать это для создания конкретных таких циклов!

type Reverse<Tuple extends unknown[]> = Tuple extends [
  infer First,
  ...infer Tail,
]
  ? [...Reverse<Tail>, First]
  : []

type Ten = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
type Res4 = Reverse<Ten>

// По умолчанию глубина рекурсии 50
// @ts-expect-error
type Res5 = Reverse<[...Ten, ...Ten, ...Ten, ...Ten, ...Ten, 1]>

// На хвостовую рекурсию ограничение 1000
type CreateTuple<
  Num extends number,
  Tuple extends unknown[] = [],
> = Tuple['length'] extends Num ? Tuple : CreateTuple<Num, [...Tuple, unknown]>

type Res3 = CreateTuple<999>

// задание 1

type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<T>
}

type Res123 = DeepRequired<{
  value?: {
    title?: string
  }
}> // { value: { title: string } }

const res1: Res123 = {
  value: {
    title: 'Title'
  }
}
