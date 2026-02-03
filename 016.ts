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
type MyRecordOne<K extends string | number | symbol, V> = {
  [Key in K]: V
}

type MyRecordSecond<K, V> = {
  [Key in K & (string | number | symbol)]: V
}