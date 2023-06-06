import React from "react";
import { Todo } from "../types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
type SingleTodoProps = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  updateTaskCompleteHandler: (id: number) => void;
};
const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  setTodos,
  todos,
  updateTaskCompleteHandler,
}) => {
  return (
    <form key={todo.id} className="todos__single">
      <span className="todos__single--text">{todo?.todo}</span>
      <div>
        <span className="icon">
          <AiFillEdit />
        </span>
        <span className="icon">
          <AiFillDelete />
        </span>
        <span
          className="icon"
          onClick={updateTaskCompleteHandler.bind(null, todo.id)}
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
