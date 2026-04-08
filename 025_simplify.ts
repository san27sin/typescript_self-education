export {}

export type Simplify<T> = {[KeyType in keyof T]: T[KeyType]} & {}
export type SimplifyDeep<T> = {[KeyType in keyof T]: SimplifyDeep<T[KeyType]>} & {}
// хорошо помогает при пересичение / пиков / омитов для превращения результирующей структуры

interface User {
    name: string
}

type TypeUser = {
    name: string
}

const user1: Simplify<User> = {
    name: '1'
}

const user2: User = {
    name: '1'
}

function value(value: Record<string, unknown>) {}

value(user1)
value(user2)

// ===========

type User2 = {
    name: string
}

type UserWithValue1 = User2 & {
    value: string
}

type UserWithValue2 = Simplify<User2 & {
    value: string
}>

type V = SimplifyDeep<[User2, User2, User2]>