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

type FilterIntersection<T> = T & 'write-type-hear'
type ResFilterIntersection = FilterIntersection<1 | 2 | 'value' | 'b'>