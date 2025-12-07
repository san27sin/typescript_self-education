// 2.1 Что кому assignable

const str: string = '1asdf'
const str2: string = str

// тип всегда assignable самому себе
const value: never = 'asdfa' as never
const value2: never = value

// Литералы assignable общему типу
const one: '1' = '1'
const str123: string = one

// @ts-expect-error
const three: '3' = str123

// Разные типы assignable друг другу по определенным правилам