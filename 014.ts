export {}

// Домашняя работа

// Задание #1
type MyExclude<T, K> = T extends K ? never : T

type Result1 = MyExclude<'a' | 'b' | 'c', 'a'> // 'b' | 'c'
type Result2 = MyExclude<'a' | 'b' | 'c', 'c'> // 'a' | 'b'

// Задание #2
type Defined<T> = T extends undefined | null ? never : T

type Result3 = Defined<number | undefined | null> // number
type Result4 = Defined<string | null> // string



