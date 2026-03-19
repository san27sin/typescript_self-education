export {}

type TodoList = [
  {
    id: 1,
    text: 'Create something',
    completed: false
  }
]

type AddItem<TodoList, Id, Text> = TodoList | Id | Text
type RemoveItem<TodoList, Id> = TodoList | Id
type UpdateText<TodoList, Id, Text> = TodoList | Id
type ToggleText<TodoList, Id> = TodoList | Id
type FindById<TodoList, Id> = TodoList | Id
type FilterBy<TodoList, Key, Value> = TodoList | Key | Value
