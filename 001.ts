// Дженерики и type level программирование
// нужны для создания переиспользуемого кода

type User = {
  id: number,
  name: string,
}

type Book = {
  id: number,
  title: string,
  author: string,
}

const users: User[] = [
  { id: 1, name: 'Alice Johnson' }
]

const books: Book[] = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' }
]

// Как создать абстракную функцию и ее переиспользовать взамен функций снизу:

function sortUsers(users: User[]) {
  return [...users].sort((a, b) => a.name.localeCompare(b.name))
}

function sortBooksByTitle(books: Book[]) {
  return [...books].sort((a, b) => a.author.localeCompare(b.author))
}

// решение с generics по переиспользуемому коду

type OnlyStringObjectKeys<T> = { // это функция для типов (type level программирование)
  [K in keyof T]: T[K] extends string ? K : never
}[keyof T]

type T = OnlyStringObjectKeys<Book>

function sortByStringKey<T extends Record<string, any>>(objs: T[], key: OnlyStringObjectKeys<T>): T[] {
  return [...objs].sort((a,b) => a[key].localeCompare(b[key]))
}

const sortedBooks = sortByStringKey<Book>(books, 'title')
const sortedUsers = sortByStringKey<User>(users, 'name')

// type level программирование и generic - нужны когда мы хотим создать функциональный переиспользуемый код,
// так же это преобразование из одного типа в другой