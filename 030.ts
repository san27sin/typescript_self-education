// 030 4.10 Class type

export {}

type PublicKeys<T> = keyof T

type Class<T, Arguments extends unknown[] = never[]> = {
  prototype: Pick<T, keyof T>
  new(...arguments_: Arguments): T
}

type Constructor<T, Arguments extends unknown[] = never[]> = new(...arguments_: Arguments) => T

/**
 * We cannot use a 'type' here because TypeScript throws: 'abstract' modifier cannot appear on a type member
 */

type AbstractConstructor<T, Arguments extends unknown[] = never[]> = abstract new(...arguments_: Arguments) => T

interface AbstractClass<T, Arguments extends unknown[] = never[]> extends AbstractConstructor<T, Arguments> {
  prototype: Pick<T, keyof T>
}

function getInstance<T>(fn: AbstractClass<T> | Class<T>): T {
  return {} as any
}

class User {
  name: string
  private values: string
  constructor(name: string) {
    this.name = name
    this.values = 'values'
  }
}

type PK = PublicKeys<User>

console.log(User.prototype.name)
const instance = getInstance(User)

// User.prototype.name