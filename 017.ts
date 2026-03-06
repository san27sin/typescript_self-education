// 017 3.92 опциональность и mapped types

export {}

type Obj = {
  a: number
  b?: number
}

type JustMap<T> = {
  [K in keyof T]: T[K]
}

// 1. mapped types сохраняет опциональность
type R1 = JustMap<Obj>
// ^?type R1 = { a: number; b?: number | undefined }

// 2. Опциональность определяется на основании keyof T

type Mp<T, V> = {
  [K in keyof T]: V[K & keyof V]
}

type R2 = Mp<{ name?: string }, { name: number }>
// ^?type R2 = { name?: number | undefined }


// 3. опциональность и union с undefined
// пришпендюривается с верху после обработки значения

type Mp2<T> = {
  [K in keyof T]: Exclude<T[K], undefined>
}

type R3 = Mp2<{ name?: string }>
// ^?type R3 = { name?: string | undefined }

// 4. Мерджинг объектов с сохранением опциональности
// если мерджить обязательное поле и необязательное, то результирующее будет обязательное, а если оба необязательные то добавится undefined

type Simplify<T> = {
  [K in keyof T]: T[K]
} & {}

type R41 = Simplify<{ name: string } & { name?: string }>;
// { name: string }

type R42 = Simplify<{ name?: string } & { name?: string }>;
// { name?: string | undefined }

type R43 = Simplify<{ name: string } & { name: number }>;
// { name: never }

// решение задачи по мерджу из предыдущего урока
type Mp3<T, V> = {
  [K in keyof (T & V)]: K extends keyof V ? V[K] : T[K & keyof T]
}

type R44 = Mp3<{ name?: string }, { name?: number }>
// ^?type R44 = { name?: number | undefined }
type R45 = Mp3<{ name?: string }, { name: number }>
// ^?type R45 = { name: number }

// 5. Сохранение опциональности не работает, если мы берем union ключей
// union c undefined получается из-за обращения к опциональному полю

type Mp4<T, V> = {
  [K in keyof T | keyof V]: K extends keyof V ? V[K] : T[K & keyof T]
}

type R51 = Mp4<{ name?: string }, { value?: number }>

// 6. Мы можем этим воспользоваться,
// что бы убрать опциональность без -?. В редких кейсах это нужно

// В чем проблема -?. Оно удаляет | undefined даже если этого не нужно
type Mp51<T> = {
  [K in keyof T]-?: T[K] | undefined
}

type R61 = Mp51<{ name?: string | undefined; value: string | undefined }>
// ^? type R61 = { name: string; value: string | ...

// Попробуем воспользоваться хаком из прошлого
// не работает так как ts схлопывает union
type Mp52<T> = {
  [K in keyof T | keyof {}]: T[K & keyof T];
}

type R62 = Mp52<{ name?: string }>
// ^?type R62 = { name?: string | undefined }

// Вот так работает
type Mp53<T, O = {}> = {
  [K in keyof T | keyof O]: T[K & keyof T]
}

type R63 = Mp53<{ name?: string, value: string | undefined }>
// ^?type R63 = { name: string | undefined; valu...
