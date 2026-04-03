// 21 021 4.1 Встроенные утилиты

export {}

class ThenableUser {
  then(cb: (user: { name: string }) => void) {}
}

type Aw = Awaited<ThenableUser>

type C2 = Partial<{ name: string; value: string; value2: string }>

type C3 = Required<{ name?: string | undefined; value?: string; value2?: string }> // работает не рекурсивно, для рекурсивности нужен deepRequired

// ====

type R = Exclude<
  // ^?
  { type: 'create'; data: number } | { type: 'delete' },
  { type: 'create' }
>

type R2 = Extract<
  // ^?
  { type: 'create'; data: number } | { type: 'delete' },
  { type: 'create' }
>

type R3 = Extract<1 | 2 | string, number>
// ^? type R3 = 1 | 2

// ====
type A4 = Record<string, unknown>
// ^? type A4 = { [x: string]: unknown; }
type A = Record<'value' | 'name', number> & Record<'value2', string>
// ^? type A = Record<'value' | 'name', number> &...
type A2 = Pick<
  { name: string; value: string; value2: string },
  'value' | 'value2'
>
type A3 = Omit<
  { name: string; value: string; value3: string },
  'name'
>
type OptionalKeys<T, K extends keyof T> = Simplify<Omit<T, K> & Partial<Pick<T, K>>>

type User1 = { name: string; value: string }
type CreateUser = OptionalKeys<User1, 'value'>

export type Simplify<T> = { [KeyType in keyof T]: T[KeyType] } & {}

// ====

type Fn = (param: number, param2: string) => 'return'
type ReturnT = ReturnType<Fn>
type Params = Parameters<Fn>

class User {
  constructor(public name: string) {}
}

type R5 = ConstructorParameters<typeof User>
// ^?type R5 = [name: string]
type R6 = InstanceType<typeof User>
// ^?type R6 = User

// ======= NoInfer =========

type NoInfer<T> = [T][T extends any ? 0 : never]; // не встроен, берется из библиотеки или прописать самому

function value<T>(obj: { arr: NoInfer<T[]>; value: T }): T[] {
  return obj.arr
}
// происходит приоритетность вывода дженерика типа
const r = value({
  value: 'va',
  arr: ['1']
})

// ======= ThisType =========

function fn<D>(
  obj: { data: D, methods: Record<string, unknown> & ThisType<D> }
) {
  return obj
}

fn({
  data: { name: 1, str: 'value' },
  methods: {
    getname() {
      return this.name
    }
  }
})