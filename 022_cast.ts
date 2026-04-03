// 022 4.2 Cast

export {}

// кастомные утилетарные типы

export type Cast<A, B> = A extends B ? A : B

// 4 способа ограничения - добавили cast как четвертый
// T & string
// T extends string ? T : 'Error'
// T extends string =
// Cast<T, string>

type Push<A, V> = [...Cast<A, unknown[]>, V]

type R = Push<[1,2], 'value'>
// ^?type R = [1, 2, 'value']
type R2 = Push<string, 'value'>
// ^?type R2 = [...unknown[], 'value']