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
}

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