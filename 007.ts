// 007 2.6 Домашнее задание

// Эта функция нужна для тест кейсов

// =================
// Задание! Напишите тип которому assignable Любой массив (не забудьте про as const)
// Без использования any
// Тест кейсы придумайте, сами

type AnyArray = readonly unknown[]

function getAnyArray(param: AnyArray) {}

const a007 = ['123']
const b007 = [123.33, 99, 123]
const c007 = ['саша', 'маша'] as const
const e007 = ['123', 'sdf', '123', '333']

getAnyArray(a007)
getAnyArray(b007)
getAnyArray(c007)



// =================
// ЗАДАНИЕ! Напишите тип которому assignable любой массив длинной больше 1
// Без использования any

type oneMoreLengthArray = [unknown, unknown, ...unknown[]];

function getNotEmptyArray(param: oneMoreLengthArray) {}

getNotEmptyArray(a007)
getNotEmptyArray(b007)
getNotEmptyArray(c007)
getNotEmptyArray(e007)


// =================
// ЗАДАНИЕ! Типизируйте функцию так, что бы она могла принять как можно больше безопасных значений
// Без использования any

type Arr007 = [
  unknown,
  {
    [key: string]: unknown,
    obj: {
      [key: string]: unknown,
      name: string
    }
  },
  ...unknown[]
]

function structureType(value: { arr: Arr007 }): string {
  return value.arr[1].obj.name
}


// =================
// ЗАДАНИЕ! Обновите тип прошлой функции, так что бы можно было добавить несуществующие параметры
// при создании объекта в момент вызова
// см index signature

type ObjName007 = {
  [key: string]: unknown
  arr: Arr007
}

function structureType2(value: ObjName007): string {
  return value.arr[1].obj.name
}

structureType2({
  arr: [
    1,
    {
      obj: {
        name: 'asd',
        value: ''
      }
    },
    {
      hello: 1,
    }
  ],
  value: 1,
})



// =================
// ЗАДАНИЕ! При пересечении с каким типом всегда будет получаться изначальный тип?

type TestIntersection<T> = T & unknown
type ResTestIntersection = TestIntersection<string>

const f007: TestIntersection<string> = ''



// =================
// ЗАДАНИЕ! При пересечении с каким типом будет всегда never?

type TestIntersection2<T> = T & never
type ResTestIntersection2 = TestIntersection2<number>

const g007: ResTestIntersection2 = 123



// =================
// ЗАДАНИЕ! При объединении с каким типом всегда будет получаться тот же самый тип?

type TestUnion<T> = T | never
type ResTestUnion = TestUnion<boolean>

const h007: ResTestUnion = true



// =================
// ЗАДАНИЕ! При объединение с каким типом всегда будет получаться unknown
type TestUnion2<T> = T | unknown
type ResTestUnion2 = TestUnion2<string> // res should be unknown

const i007: ResTestUnion2 = {}



// =================
// ЗАДАНИЕ! Как с помощью пересечения можно отфильтровать все числа

type FilterIntersection<T> = T & string
type ResFilterIntersection = FilterIntersection<1 | 2 | 'value' | 'b' | never> // res should be 'value' | 'b'

const l007: ResFilterIntersection = 'value'



// =================
// ЗАДАНИЕ! Как с помощью пересечения можно достать событие по типу из юниона

type FindEventByIntersection<T, K> = T & K

type Event1 = { type: 'user-created'; data: { name: string } }
type Event2 = { type: 'user-deleted'; data: { id: number } }

type ResFindEventByIntersection = FindEventByIntersection<Event1 | Event2, Event2> // Res should assignable Event2

const p007: ResFindEventByIntersection = { type: 'user-deleted', data: { id: 234 } }



// =================
// ЗАДАНИЕ! Напишите такой тип что бы функцию можно было вызвать 3 разными способами

type fn007 = [{ isOne: boolean } | { isTwo: boolean } | { isThree: boolean }, ...number[]]

function structureUnion(...params: fn007) {}

structureUnion({ isOne: true }, 1)
// @ts-expect-error Здесь ошибка, так как при isOne только один дополнительный аргумент
structureUnion({ isOne: true }, 1, 2)
structureUnion({ isTwo: true }, 1, 2)
structureUnion({ isThree: true }, 1, 2, 3)



// =================
// ЗАДАНИЕ! Без использования any напишите тип функции, к которому можно присвоить любой callback

type FnType007 = (...args: unknown[]) => unknown // не получилось решить

function anyCallback(cb: T) {}

anyCallback((a: number) => 1)
anyCallback((a: string, b: number) => 'str')



// =================
// ЗАДАНИЕ! Какой тип нужно передать в параметр типа Ref что бы в этот тип был assignable любой другой реф?

type Ref<T> = { current: T } | ((value: T) => void)

type SuperRef = Ref<'write-type-hear'>

function storeRef(anyRef: SuperRef) {}

const numberRef = {} as Ref<number>
const stringRef = {} as Ref<string>

storeRef(numberRef)
storeRef(stringRef)