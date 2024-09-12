import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: Todo = {
      inputValue: inputValue,
      // 配列の長さが0の場合は1を、それ以外の場合は既存のtodos配列の先頭の要素のidに1を加えた値をidとして設定
      id: todos.length === 0 ? 1 : todos[0].id + 1,
      checked: false,
    };
    // スプレッド構文を使用して、新しいTodoを既存のtodos配列の先頭に追加
    setTodos([newTodo, ...todos]);
    // 入力フォームの値を空にする
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }
  return (
    <div className="App">
      <div>
        <h2>Todoリスト with TypeScript</h2>
        <form onSubmit={(e) => { handleSubmit(e) }}>
          <input
            type="text"
            onChange={(e) => { handleChange(e) }}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className='todoList'>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                onChange={(e) => { handleEdit(todo.id, e.target.value) }}
                className="inputText"
                value={todo.inputValue}
              />
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App;
