@@ -0,0 +1,59 @@
export {}

// keyof позволяет получить union ключей объекта

type Obj = {
  id: number
  title: string
  name: {
    value: string
  }
}

type ObjKeys = keyof Obj

function fn(key: keyof Obj) {}
fn('id')

// keyof пустого объекта это never

type Never = keyof {}

// keyof Dict равен тому что указано в index сигнатуре

type Dict = { [key: string]: number }
function fnD(key: keyof Dict) {}

fnD('') // под капотом скрипта у нас число переводится в строку поэтому можно передавать string | number

// Интересный факт: Создание пустого объекта через Record
type EmptyObject = Record<never, unknown>

// keyof безопасен с любым типом, но выдает белеберду

type Tuple = [1, 2, 3]
function fn2 (key: keyof Tuple) {} // берет все ключи включая прототип 0 1 2 'concat' и т.д.
fn2('concat')

type Arr = number[]
function fn3(key: keyof Arr) {}
fn3('length')

type Str = number
function fn4(key: keyof Str) {}
fn4('toExponential')

type Fn = () => void
function fn5(key: keyof Fn) {}

// с функциями never
fn5('' as never)


// Домашняя работа

type GetStringKeys<T> = keyof T & string  // Extract<keyof T, string>

type R1 = GetStringKeys<{ 0: number, name: string, value: number }> // 'name' | 'value'

const test: R1 = 'name'