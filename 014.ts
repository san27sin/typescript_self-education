export {}

// 014 3.7 distributive conditional types
// У условного оператора есть особое поведение c union типами

export {}

type Union = 'id' | 'value'

type WrapId<T> = T extends 'id' ? { id: T } : T

// Здесь должно быть просто 'id' | 'value' так как
// union assignable типу если все элементы assignable типу
// но! 'value' assignable
// И по сути мы должны уйти в false ветку, но не тут то было!
type R = WrapId<'id' | 'value'>

// Но получился тип { id: 'id' } | 'value' !!!!
// получается он для каждого значения union прогоняет значения, потом их объединяет и возвращает такой же union



// c never у нас не может что-то пересикаться поэтому он будет откидываться
// фильтровать union лучше с тернарными операциями
type OnlyObjectsWithType<T> = T extends { type: string } ? T : never

type Res = OnlyObjectsWithType<number | { type: 'delete' } | { type: 'create' }>

// пример с массивом
type WrapInArray1<T> = T[]

type R1 = WrapInArray1<number | string>

type WrapInArray2<T> = T extends unknown ? T[] : never

type R2 = WrapInArray2<number | string>

// пример как отменить conditional distributive
type WrapId123<T> = [T] extends ['id'] ? { id: T } : T

type R123 = WrapId123<'id' | 'value' | 'res'>
type Value123 = WrapId123<never>
type Value1234 = WrapId123<any>

// Домашняя работа

// Задание #1
type MyExclude<T, K> = T extends K ? never : T

type Result1 = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type Result2 = MyExclude<'a' | 'b' | 'c', 'c'> // 'a' | 'b'

// Задание #2
type Defined<T> = T extends undefined | null ? never : T

type Result3 = Defined<number | undefined | null> // number
type Result4 = Defined<string | null> // string



