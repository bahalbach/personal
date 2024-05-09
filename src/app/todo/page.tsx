"use client";

import { useCallback, useState } from "react";

export default function Page({}) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [todos, setTodos] = useState<string[]>([]);
  const onAddTodo = useCallback(
    (todo: string) => {
      setTodos((oldTodos) => {
        const newTodos = oldTodos.slice();
        newTodos.push(todo);
        return newTodos;
      });
    },
    [setTodos]
  );
  const onComplete = useCallback(
    (index: number) => {
      const newTodos = todos.slice();
      const [removed] = newTodos.splice(index, 1);
      const newCompleted = completed.slice();
      newCompleted.push(removed);
      setTodos(newTodos);
      setCompleted(newCompleted);
    },
    [todos, completed]
  );

  const completedList = completed.map((item) => (
    <li key={item}>
      <span className="line-through"> {item}</span>
    </li>
  ));

  const todoList = todos.map((todo, index) => (
    <li key={todo}>
      <input type="checkbox" onChange={() => onComplete(index)} />
      {todo}
    </li>
  ));

  return (
    <div className="grid items-center justify-center p-8">
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-2">{completedList}</ul>
        <ul className="flex flex-col gap-2">{todoList}</ul>
        <TodoInput onAddTodo={onAddTodo} />
      </div>
    </div>
  );
}

function TodoInput({ onAddTodo }: { onAddTodo: (todo: string) => void }) {
  const [currentTodo, setCurrentTodo] = useState("");
  return (
    <div className="flex">
      <label>
        <input
          type="text"
          value={currentTodo}
          onChange={(e) => setCurrentTodo(e.target.value)}
        />
      </label>
      <button type="button" onClick={() => onAddTodo(currentTodo)}>
        Add
      </button>
    </div>
  );
}
