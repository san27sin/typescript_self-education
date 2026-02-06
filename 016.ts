// 016 3.9 mapped types

export {}

// mapped types для создания объекта

type KeysUnion = 'id' | 'name' | 'value'

// Создается объект со всеми ключами которые есть в union

type Obj = {
  [K in KeysUnion]: number
}

// пример как работает под капотом Record
// ограничения -> в mapped types можем передавать только string / number / symbol (классические типы ключа)
type MyRecord<K extends string | number | symbol, V> = {
  [Key in K]: V
}

type MyRecordSecond<K, V> = {
  [Key in K & (string | number | symbol)]: V
}

type RecordObj = MyRecord<'1' | '2' | '3', unknown>

// Во время создания объекта, значение K после : будет равно значению ключа
type ObjKeys = {
  [K in KeysUnion]: K
}

// Таким образом мы можем динамически создавать объекты
type Obj2 = {
  [K in KeysUnion]: K extends 'id' ? string : number
}


// Хотя объект можно создать на основе любого юниона строк,
// Чаще всего этот механизм использует с keyof другого объекта

type User = {
  id: number
  name: string,
  value: string
}

type UserMethods = {
  [K in keyof User]: () => User[K]
}

// Иногда нужно переименовать ключи
// Тогда можно использовать оператор as
type Getter<T extends string> = `get${Capitalize<T>}`
type UserMethods2 = {
  // as не влияет на K после : чаще всего это удобное поведение
  [K in keyof User as Getter<K>]: () => User[K]
}

// Если нужно сделать переименование и до и после : то делаем переименование до in

type UserMethods3 = {
  [K in Getter<keyof User>]: K
}


// Вместо конкретного объекта может быть любой дженерик

type ObjectGetters<T> = {
  // Так как Т это любой тип, то K это string | number | symbol
  // Мы можем профильтровать union с помощью intersection
  [K in keyof T as Getter<K & string>]: () => T[K]
}
type UserMethods4 = ObjectGetters<User>


// C помощью оператора as можно отфильтровать некоторые ключи.
// Для этого нужно вернуть never для этого ключа

type RemoveKey<T, R> = {
  // Так как T это любой тип, то K это string | number | symbol
  // Мы можем профильтровать union с помощью intersection
  [K in keyof T as K extends R ? never : K]: T[K]
}

type UserWithoutId = RemoveKey<User, 'id'>

// Важное исключение.
// Если mapped types вызывается с массивами и tuple, получается не объект, a tuple

type ParseStringTuple<T extends unknown[]> = {
  [K in keyof T]: T[K] extends `${infer V extends number}` ? V : never
}

type Tuple = ParseStringTuple<['1', '2', '3']>

// Так же с помощью mapped types можно добавлять и убирать readonly и опциональность
type ReadonlyUser = {
  readonly [K in keyof User]: User[K]
}

type NotReadonlyUser = {
  -readonly [K in keyof ReadonlyUser]: ReadonlyUser[K]
}

type OptionalUser = {
  [K in keyof User]?: User[K]
}

type RequiredUser = {
  [K in keyof OptionalUser]-?: OptionalUser[K]
}


// Домашняя работа

// задание 1
type NotNull<T> = T

type Res = NotNull<{ value: string | null, arg: string }> // { value: string, arg: string }