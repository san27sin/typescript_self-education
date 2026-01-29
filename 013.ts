// 013 3.6 conditional types

export {}

type IsString<T> = T extends string ? true : false;

type Boll = IsString<string>
// extends плохо работает с never
type R10 = IsString<never>

// с any получается странное
type Boll123 = IsString<any>

type IsNumber<T> = T extends number ? true : false;
type IsExtends<T, V> = T extends V ? true : false;

type False2 = IsExtends<string, 'literal'>

// С помощью условных типов мы можем творить настоящую грязь :)

function value<T>(arg: T): T extends string ? number : string {
  return {} as any;
}

const r1 = value("str");
const r2 = value(1);

// А ещё условие мы можем использовать для ограничения типа!

// Обход ограничения index type
type GetValue<T, K> = K extends keyof T ? T[K] : `Error: ${K extends string ? K : 'key'} is not in object`;
type R1 = GetValue<{ name: string }, "name">;
type R2 = GetValue<{ name: string }, "name123">;

// Обход ограничения ...
type Push<T, K> = T extends readonly unknown[] ? [...T, K] : T

type RPush = Push<number, number>

/*
* 3 способа обхода ограничения:
* 1) extends наложить на входе в параметр
* 2) пересечь с необходимым типом
* 3) использовать тернарный оператор чтобы сузить тип и обработать тип, если он не соответствует
* */

// Обход extends других generic типов
type MyParams<T> = T extends (...args: never[]) => unknown
  ? Parameters<T>
  : never

// C помощью условных выражений мы можем создать булевую алгебру в типах &#x1f609

type Or<T1, T2> = T1 extends true ? true : T2 extends true ? true : false
type And<T1, T2> = T1 extends true ? (T2 extends true ? true : false) : false

type Or3<T1, T2, T3> = Or<T1, Or<T2, T3>>
type And3<T1, T2, T3> = And<T1, And<T2, T3>>

type Not<T1> = T1 extends true ? false : true

type IsAssignable<T, K> = K extends T ? true : false

type CheckKeyStringNotId<T> = And<
  IsString<T>,
  Not<
    Or3<IsAssignable<T, 'id'>, IsAssignable<T, 'slug'>, IsAssignable<T, 'uuid'>>
  >
>

type R = CheckKeyStringNotId<number>
type R2 = CheckKeyStringNotId<'some-string'>
type R3 = CheckKeyStringNotId<'id'>

// Это бывает полезно что бы не делать тернарники вложенные на бесконечность
type WrapNotIdString<T> =
  And<
    IsString<T>,
    Not<
      Or3<
        IsAssignable<T, 'id'>,
        IsAssignable<T, 'slug'>,
        IsAssignable<T, 'uuid'>
      >
    >
  > extends true
    ? `{${T & string}}`
    : T

type R6 = WrapNotIdString<'str'>

// Домашнее задание
// Используйте условный оператор для преодоления ограничений на index access
type ExtractValueFromKey2<T> = T extends { key: string }
  ? (T['key'] extends keyof T ? T[T['key'] & keyof T] : unknown)
  : unknown

type R11 = ExtractValueFromKey2<{ key: 'value', value: number }>; // number
type R22 = ExtractValueFromKey2<{
  key: 'value' | 'name'
  value: number
  name: string
}> // number | string

type R33 = ExtractValueFromKey2<{ key: 'value' }> // unknown

//@ts-expect-error
type R4 = ExtractValueFromKey2<{}> // uknown

const r11: R11 = 123
const r22: R22 = '123'

// вот меньший шаг для задачи выше
type a1 = 'ggg' | 'lll' | 'ggg1'
type a2 = 'ggg1' | 'lll' extends a1 ? true : false