export {}

export type IsEqual<A, B> =
    (<G>() => G extends A & G | G ? 1 : 2) extends
    (<G>() => G extends B & G | G ? 1 : 2)
        ? true
        : false

type T1 = {
    name: string
}

type T2 = {
    name: string
}

type T3 = {
    name: string
    value: string
}

type T4 = {
    name: string
} & {
    value: string
}

type R = IsEqual<T1, T2>
// ^?type R = true

type L = IsEqual<T3, T4>