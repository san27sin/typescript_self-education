export {}

type Todo = {
  id: number,
  test: string,
  completed: boolean
}

type TodoList = [
  {
    id: 1,
    text: 'Create something',
    completed: false
  }
]

type AddItem<TL extends unknown[], Id extends number, Text extends string> = [...TL, { id: Id, text: Text, completed: false }]

type AddItem2 = AddItem<TodoList, 2, 'привет'>

type RemoveItem<TodoList extends Todo[], Id extends number> = TodoList | Id

type UpdateText<TodoList, Id, Text> = TodoList | Id
type ToggleText<TodoList, Id> = TodoList | Id
type FindById<TodoList, Id> = TodoList | Id
type FilterBy<TodoList, Key, Value> = TodoList | Key | Value
