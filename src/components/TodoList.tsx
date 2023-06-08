import React, { useState, useRef, useEffect } from "react";
import "./styles.css";
import { Todo } from "../types";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
interface TodoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTasks: Todo[];
  setCompletedTasks: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<TodoListProps> = ({
  todos,
  setTodos,
  completedTasks,
  setCompletedTasks,
}) => {
  const [edit, setEdit] = useState<boolean>(false);

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
  const inputEleRef = useRef<HTMLInputElement>(null);

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
    setEdit(!edit);
  };

  useEffect(() => {
    inputEleRef.current?.focus();
  }, [edit]);

  return (
    <div className="container">
      <Droppable droppableId={"TodosList"}>
        {(provided) => (
          <div
            className="todos"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Active Tasks</span>
            {todos?.map((todo, index) => (
              <SingleTodo
                index={index}
                inputRef={inputEleRef}
                setEdit={setEdit}
                edit={edit}
                onEditTask={taskEditHandler}
                onUpdateTaskComplete={updateTaskCompleteHandler}
                onDeleteTask={taskDeleteHandler}
                todo={todo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Droppable droppableId="TodosRemove">
        {(provided) => (
          <div
            className="todos remove"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos_heading">Completed Tasks</span>
            {completedTasks?.map((todo, index) => (
              <SingleTodo
                index={index}
                inputRef={inputEleRef}
                setEdit={setEdit}
                edit={edit}
                onEditTask={taskEditHandler}
                onUpdateTaskComplete={updateTaskCompleteHandler}
                onDeleteTask={taskDeleteHandler}
                todo={todo}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
