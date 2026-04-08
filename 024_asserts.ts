// Asserts

export {}

export type IsAny<T> = 0 extends 1 & T ? true : false
export type IsNever<T> = [T] extends [never] ? true : false // работает когда заворачиваем в тапл
export type IsUnknown<T> = (
    unknown extends T
        ? IsAny<T> extends true
            ? false
            : true
        : false
)

type Not1<T> =
    IsAny<T> extends true ? false
        : T extends true ? false : true

type R1 = Not1<any>

type Not2<T> =
    IsNever<T> extends true
        ? true
        : T extends true ? false : true

type V = Not1<never>

type R2 = Not2<never>

type Not3<T> =
    IsUnknown<T> extends true ? false :
        T extends true ? false : true

type R3 = Not3<unknown>
