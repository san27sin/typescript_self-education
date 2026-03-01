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

// 