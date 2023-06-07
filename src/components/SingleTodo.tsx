import React, { useEffect, useState } from "react";
import { Todo } from "../types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
type SingleTodoProps = {
  todo: Todo;
  onUpdateTaskComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (e: React.FormEvent, id: number, editTodo: string) => void;
};
const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  onUpdateTaskComplete,
  onDeleteTask,
  onEditTask,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  return (
    <form
      key={todo.id}
      onSubmit={(e) => onEditTask.bind(null, e, todo.id, editTodo)}
      className="todos__single"
    >
      {edit ? (
        <>
          <input
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text"
          />
        </>
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo?.todo}</s>
      ) : (
        <span className="todos__single--text">{todo?.todo}</span>
      )}

      <div>
        <span className="icon">
          <AiFillEdit
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          />
        </span>
        <span className="icon">
          <AiFillDelete onClick={onDeleteTask.bind(null, todo.id)} />
        </span>
        <span
          className="icon"
          onClick={onUpdateTaskComplete.bind(null, todo.id)}
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
