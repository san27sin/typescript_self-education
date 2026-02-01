// 015 3.8 infer

export {}

// оператор infer - поручаем компилятору достать нам тип из структуры
// универсальный способ доставать типы из любой структуры
// Последовательность:
// 1) пишем паттерн по которому надо составить значение
// 2) после этого заменяем нужное нам значение infer
// 3) запихиваем в тернарник
// 4) получаем значение
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never
type RT = MyReturnType<() => string> // string

type GetLastTupleElement<T> = T extends [...unknown[], infer Last] ? Last : never
type Res = GetLastTupleElement<[number, 1]>

// используется для доставания значений из сложных типов
type UnwrapPromise<T> = T extends Promise<infer U> ? U : never
type PromisedString = Promise<string>
type Unwrapped = UnwrapPromise<PromisedString>

// для работы с таплами
type FirstElement<T extends any[]> = T extends [infer U, ...any[]] ? U : never
type MyTuple = [string, number, boolean]
type First = FirstElement<MyTuple>

// Для работы со строковыми литералами
type FirstLetter<T extends string> = T extends `${infer L}${string}` ? L : never
type FirstLetterRes = FirstLetter<'assa'>

// Домашняя работа
// #1
type MyParameters<T> = T extends () => infer R ? R : never
type GreetReturnType = MyParameters<() => string> // string

// #2 должно возвращать массив кроме первого
type Shift<T> = T extends [unknown, infer (...K[])] ? L : never
type Result = Shift<[9, 7, 3, 2, 1]> // [2, 1]  