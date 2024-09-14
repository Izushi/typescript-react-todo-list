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
    // 入力値が空の場合はアラートを表示して処理を中断
    if (inputValue.trim() === "") {
      alert("入力してください");
      return;
    }
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

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

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
            value={inputValue}
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
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                onChange={(e) => { handleChecked(todo.id, todo.checked) }}
              />
              <button onClick={() => { handleDelete(todo.id) }}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div >
  );
}

export default App;
