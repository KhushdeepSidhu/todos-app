import { v4 as uuidv4 } from 'uuid';

let todos = [];

// get the todos stored in local storage
const loadTodos = () => {
  const todosJSON = localStorage.getItem('todos');

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (e) {
    return [];
  }
};

// create todo
const createTodo = (text) => {
  const sameTodo = todos.find((todo) => todo.text === text);
  if (text.length > 0 && !sameTodo) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    saveTodos();
  }
};

// save todos in local storage
const saveTodos = () => {
  const todosJSON = JSON.stringify(todos);
  localStorage.setItem('todos', todosJSON);
};

const removeTodo = (todoId) => {
  const index = todos.findIndex((todo) => todo.id === todoId);
  if (index >= 0) {
    todos.splice(index, 1);
    saveTodos();
  }
};

// toggle to do
const toggleTodo = (todoId) => {
  const todo = todos.find((todo) => todo.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    saveTodos();
  }
};

// get incompletedTodos
const getIncompletedTodos = () => {
  return todos.filter((todo) => !todo.completed);
};

// sort todos --- incompleted first
const sortTodos = () => {
  return todos.sort((a, b) => {
    if (!a.completed && b.completed) {
      return -1;
    } else if (!b.completed && a.completed) {
      return 1;
    } else {
      return 0;
    }
  });
};

// expose todos from the module
const getTodos = () => todos;

todos = loadTodos();

export {
  getTodos,
  createTodo,
  removeTodo,
  toggleTodo,
  loadTodos,
  getIncompletedTodos,
};
