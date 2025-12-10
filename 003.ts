// 003 2.2 Таблица типов

type A = Function
type B = {}

type Test<T extends B> = B // A assignable B

type Res = Test<A>

// что угодно можно происвоить
type Test123<A extends number> = A

type Res123 = Test123<`12`>

// unknown - когда приходит что-то с сервера

// never - воплащает ошибку

function fn(): never { // never можно присвоить когда выбрасываем ошибку
  throw new Error()
}

function test() {
  const v = fn()
  console.log('ghb')
}

// any можно присвоить чему угодно

type Test77<A extends any> = A

type Res77 = Test77<number>

// readonly array нельзя assign в обычный массив

// 1 пример

const arr = [1,2,3] as const

function readonlyArrFn(arr: readonly [number, number, number]) {}

readonlyArrFn(arr)

// 2 пример

const arrT: [number, number, number] = [1,2,3]

function readonlyArrFnT(arr: [number, number, number]) {}

readonlyArrFnT(arrT)

// в тип Object {} можно assignable практически все, хотя тип object полезнее тем, что нельзя добавить примитив

// void - функция ничего не возвращает

function voidFunction(): void {
  return undefined
}

const voidVal: undefined = voidFunction()

const undVoid: void = undefined

// если void будет тип параметра, то можно нчиего не передавать

function voidFunction1(value: void): void {
  return undefined
}

const voidVal123: undefined = voidFunction1(undefined)