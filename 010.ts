// index type access

export {}

type Obj = {
  id: number
  title: string
  name: {
    value: string
  }
}

type Obj2 = {
  id: string
} | Obj

type NameObject = Obj['name']
type Value = Obj['name']['value']
type TitleOrId = Obj['title' | 'id'] // получаем union этих значений

type KeysUnion = 'title' | 'id'
type TitleOrId2 = Obj[KeysUnion]

// Получение юниона всех значений объекта

type Values = Obj[keyof Obj]

const Role = {
  ADMIN: 'ADMIN',
  USER: 'USER'
} as const



type Role = typeof Role[keyof typeof Role] // typeof - берет типы

// Получения типа значения дикта

type Dict = {
  [value: string]: number
}

type DictValue = Dict[string]

// Получения типа значения тапла

type Tuple = [number, string, { value: string }]

type First = Tuple[0]
type TupleValue = Tuple[2]['value']
type FirstOrSecond = Tuple[0 | 1]

// Получение юниона всех значений тапла
type TupleValues = Tuple[number]

// =========== !!!ВАЖНО!!! ============
// Получение длинны тапла

type TupleLength = Tuple['length'] // 3

// Самый простой способ сделать математику &#x1f92f

// Получения типа значения массива

type Arr = Array<number | string>
type ArrayValue = Arr[number] // или Arr[0]

// =========== !!!ВАЖНО!!! ============
// Typescript производит проверку на assignable
// Мы не можем получить несуществующий ключ

// @ts-expect-error
type E = Obj['hey']

// но есть исключения)

type Never = Obj[never]

// Часто вы будете встречаться с этим ограничением при работе с обобщенными типами

// @ts-expect-error
type GetObjectValue<T, K> = T[K]

// Решения

// Ограничить тип K ключами T
type GetObjectValue2<T, K extends keyof T> = T[K]

type Res2 = GetObjectValue2<Obj, 'id'>

// Пересечь тип К с ключами Т

type GetObjectValue3<T, K> = T[K & keyof T]

type Res3 = GetObjectValue3<Obj, 'name'>

// Задание #1
// 1) вернуть type свойства id
// 2) должен ругнуться на пустой объект из-за отстутствия id

type GetIdType<T extends { id: number | string }> = T['id']  // вместо T подставить нужное значение


type R1 = GetIdType<{ id: string, name: string }> // string
type R2 = GetIdType<{ id: number }> // number

// @ts-expect-error
type R3 = GetIdType<{ n: number }>

const r1: R1 = '123'
const r2: R2 = 123


// Задание #2

type ExtractValueFromKey<T extends { key: string }> = T[T['key'] & keyof T]

type R11 = ExtractValueFromKey<{ key: 'value', value: number }>; // number
type R22 = ExtractValueFromKey<{
  key: 'value' | 'name'
  value: number
  name: string
}> // number | string

type R33 = ExtractValueFromKey<{ key: 'value' }> // never

//@ts-expect-error
type R4 = ExtractValueFromKey<{}>

const r11: R11 = 123
const r22: R22 = '123'