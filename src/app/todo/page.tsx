"use client";

import { useCallback, useEffect, useState } from "react";

const LocalStorageKey = "todos";
export default function Page({}) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [todos, setTodos] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);
  // load todo state from local storage
  useEffect(() => {
    let savedTodosString = null;
    try {
      savedTodosString = localStorage.getItem(LocalStorageKey);
    } catch {}
    setLoaded(true);
    if (savedTodosString === null) return;

    const { todos, completed } = JSON.parse(savedTodosString);
    setCompleted(completed);
    setTodos(todos);
  }, []);
  const saveStateToLocalStorage = () => {
    if (!loaded) return;
    const savedTodosString = JSON.stringify({
      todos,
      completed,
    });
    try {
      localStorage.setItem(LocalStorageKey, savedTodosString);
    } catch {}
  };
  useEffect(saveStateToLocalStorage, [todos, completed, loaded]);
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
  const [displayExportNotice, setDisplayExportNotice] = useState(false);
  const exportNoticeDisplayTimeMs = 1000;
  const exportTodos = () => {
    const savedTodosString = JSON.stringify({
      todos,
      completed,
    });
    navigator.clipboard.writeText(savedTodosString);
    setDisplayExportNotice(true);
    setTimeout(() => setDisplayExportNotice(false), exportNoticeDisplayTimeMs);
  };
  const exportNotice = (
    <div
      data-show={displayExportNotice}
      className="transition-opacity ease-linear"
      style={{
        opacity: displayExportNotice ? 1 : 0,
      }}
    >
      Todos copied to clipboard
    </div>
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
      {loaded ? (
        <div className="flex flex-col gap-4">
          <ul className="flex flex-col gap-2">{completedList}</ul>
          <ul className="flex flex-col gap-2">{todoList}</ul>
          <TodoInput onAddTodo={onAddTodo} />
          <button onClick={exportTodos}>Export</button>
          {exportNotice}
        </div>
      ) : null}
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
