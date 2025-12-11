// 004 2.3 Структурная типизация

// object
type Obj = {
  name: 'value'
}

const value1: 'value' = 'value'

const obj2 = {
  name: value,
  someAnotherField: 'asdasdf',
}

const obj: Obj = obj2

// tuple
// таплы не принимают элементов больше чем надо

type Tuple = [Obj, number, ...Obj[]] // [Obj, number, ...Obj[]]

const one123: 1 = 1
const typle: Tuple = [obj2, one123]

// dict

type Dict = {
  [id: string]: Obj
}

const dict: Dict = {
  ["1"]: obj2,
  ["2"]: obj2,
}

// array
const arrStr = [{ name: "str", value: "str" }]
const arr: Obj[] = arrStr

// Объект A assignable объекту B если:
// 1) у объекта A есть все свойства объекта B
// 2) все свойства объекта A Assignable свойствам объекта B

// strict правило лучше не отключать