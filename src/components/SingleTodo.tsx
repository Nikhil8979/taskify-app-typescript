import React, { useEffect, useState } from "react";
import { Todo } from "../types";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from "react-beautiful-dnd";
type SingleTodoProps = {
  todo: Todo;
  edit: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  index: number;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  onUpdateTaskComplete: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onEditTask: (e: React.FormEvent, id: number, editTodo: string) => void;
};
const SingleTodo: React.FC<SingleTodoProps> = ({
  todo,
  index,
  onUpdateTaskComplete,
  onDeleteTask,
  onEditTask,
  edit,
  inputRef,
  setEdit,
}) => {
  const [editTodo, setEditTodo] = useState<string>(todo.todo);
  useEffect(() => {
    console.log(todo.id);
  }, [todo]);
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <form
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          onSubmit={(e) => onEditTask(e, todo.id, editTodo)}
          className="todos__single"
        >
          {edit ? (
            <>
              <input
                ref={inputRef}
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
      )}
    </Draggable>
  );
};

export default SingleTodo;
