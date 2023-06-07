import React from "react";
import "./styles.css";
import { Todo } from "../types";
import SingleTodo from "./SingleTodo";
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const updateTaskCompleteHandler = (id: number) => {
    setTodos((todos) => {
      const todoArr: Todo[] = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });
      return todoArr;
    });
  };
  const taskDeleteHandler = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const taskEditHandler = (
    event: React.FormEvent,
    id: number,
    editTodo: string
  ) => {
    event.preventDefault();
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo;
      })
    );
  };
  return (
    <div className="todos">
      {todos?.map((todo) => (
        <SingleTodo
          onEditTask={taskEditHandler}
          onUpdateTaskComplete={updateTaskCompleteHandler}
          onDeleteTask={taskDeleteHandler}
          todo={todo}
        />
      ))}
    </div>
  );
};

export default TodoList;
