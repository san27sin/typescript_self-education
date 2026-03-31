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