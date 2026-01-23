export {}

// 011 3.4 spread type operator

// Мы можем использовать ... на типе массива что бы создать tuple любой длины

type VariableLengthTuple = [number, ...string[]]
const example1: VariableLengthTuple = [1, 'a', 'a', 'd']
const example2: VariableLengthTuple = [2, 'hello']


// Мы можем использовать ... не только в конце
type VariableLengthTuple2 = [number, ...string[], number]
const example3: VariableLengthTuple2 = [1, 'a', 'a', 'd', 2]
const example4: VariableLengthTuple2 = [2, 'hello', 3]


// ... с массивом мы можем использовать только один раз
// @ts-expect-error
type VariableLengthTuple3 = [...string[], ...number[]]


// Еще более интересный вариант использования - ... таплов.
// Так мы можем создавать и модифицировать типы таплов

type Tuple1 = [number, string]
type Tuple2 = [boolean, number]

// Тут нет ограничения на один ...
type NestedTuple = [...Tuple1, ...Tuple2]

// Самое интересное - использовать ... с дженериками

// Но есть проблема ... можно использовать только с типами assignable Array
// @ts-expect-error
type Push<T, V> = [...T,V]

// Решение ограничение типами
type AnyArray = readonly unknown[]
type Push1<T extends AnyArray, V> = [...T, V]
type R = Push1<[number, string], boolean>

// В дженериках нет ограничения на два ...
type Concat<T extends AnyArray, B extends AnyArray> = [...T, ...B]

type R2 = Concat<number[], string[]> // (number | string)[]
type R3 = Concat<[number], [string]> // [number, string]

// Домашнее задание

type Unshift<T extends AnyArray, K> = [K, ...T]

type R4 = Unshift<[number, string], boolean> // [boolean, number, string]

const test: R4 = [true, 123, 'hi']