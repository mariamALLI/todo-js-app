import { createDeleteButton } from "./createDelBtn.js";
import { addEditFunctionality } from "./editFunction.js";
import { saveTodoToLocalStorage, getTodosFromLocalStorage } from "./saveTodos.js";

// Function to create a new list item
export function createListItem(todo) {
  const listItem = document.createElement("li");
  listItem.classList.add("todo-item");
  listItem.setAttribute("data-id", todo.id);

  // Create a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed; // Set the checkbox state based on the todo's completed property
  if (todo.completed) {
    listItem.classList.add("completed"); // Add the completed class if the todo is already completed
  }

  checkbox.addEventListener("change", () => {
    const todos = getTodosFromLocalStorage();
    const index = todos.findIndex((t) => t.id === todo.id);
    if (index !== -1) {
      todos[index].completed = checkbox.checked;
      saveTodoToLocalStorage(todos);
      listItem.classList.toggle("completed", checkbox.checked); // Toggle the completed class
    }
  });

  const textNode = document.createTextNode(todo.text);

  listItem.appendChild(checkbox); // Add the checkbox to the list item
  listItem.appendChild(textNode);

  // Add delete button
  const todoDeleteEl = createDeleteButton(listItem, todo.id);
  listItem.append(todoDeleteEl);

  // Add edit functionality
  addEditFunctionality(listItem, todoDeleteEl, todo.id);

  return listItem;
}
