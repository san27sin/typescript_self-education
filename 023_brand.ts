// 023 4.3 Brand

export {}

// номинальная оптимизация - это явная проверка типов, тип brand помогает имулировать типизацию

// brand
export type Brand<T, K extends string> = T & { __brand: K }

// или

declare const brandSymbol: unique symbol;
type Brand2<T, K extends string> = T & { [brandSymbol]: K }

type User = Brand<{
  name: string
}, 'User'>

function createUser(): User {
  return {
    name: '1'
  } as User
}

function saveUser(value: User) {}

const user = createUser()

saveUser(user)
saveUser({
  name: '1',
})

// пример с указом brand
saveUser({
  name: '1',
  __brand: 'User',
})


// userId

type UserId = Brand<string, 'userId'>
type PostId = Brand<string, 'postId'>

function createUserId(): UserId {
  return crypto.randomUUID() as UserId
}

function createPostId(): PostId {
  return crypto.randomUUID() as PostId
}

function findUserById(userId: UserId) {}

const id = createUserId()
const id2 = createPostId()

findUserById(id2)

// @ts-expect-error
findUserById('wrong-id')