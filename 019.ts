export {}

type Todo = {
  id: number,
  text: string,
  completed: boolean
}

type TodoList = [
  {
    id: 1,
    text: 'Create something',
    completed: false
  },
  {
    id: 2,
      text: 'iiiiiiiiiiiii',
    completed: true
  },
  {
    id: 3,
      text: 'lllllllllllllllll',
    completed: false
  }
]

type AddItem<TL extends unknown[], Id extends number, Text extends string> = [...TL, { id: Id, text: Text, completed: false }]

type AddItem2 = AddItem<TodoList, 2, 'привет'>

type RemoveItem<TL extends Todo[] | Todo, Id extends number> = TL extends [infer First, ...infer Rest]
  ? First extends Todo
    ? First['id'] extends Id
      ? RemoveItem<Rest, Id>
      : [First, ...RemoveItem<Rest, Id>]
    : never
  : TL extends [] ? [] : never

type RemoveItem2 = RemoveItem<TodoList, 2>

type UpdateText<TL extends Todo[], Id extends number, Text extends string> = TL extends [infer First, ...infer Rest]
  ? First extends Todo
    ? First['id'] extends Id
      ? [{
        [K in keyof First]: K extends 'text' ? Text : First[K]
      }, ...UpdateText<Rest, Id, Text>]
      : [First, ...UpdateText<Rest, Id, Text>]
    : never
  : [] // базовый случай - пустой кортеж

type UpdateText2 = UpdateText<TodoList, 3, 'changed'>

type ToggleText<TodoList, Id> = TodoList | Id
type FindById<TodoList, Id> = TodoList | Id
type FilterBy<TodoList, Key, Value> = TodoList | Key | Value
