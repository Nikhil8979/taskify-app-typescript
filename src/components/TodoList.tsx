import React from "react";
import "./styles.css";
import { Todo } from "../types";
import SingleTodo from "./SingleTodo";
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const updateTaskCompleteHandler = (id: number) => {};
  return (
    <div className="todos">
      {todos?.map((todo) => (
        <SingleTodo
          updateTaskCompleteHandler={updateTaskCompleteHandler}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
        />
      ))}
    </div>
  );
};

export default TodoList;
