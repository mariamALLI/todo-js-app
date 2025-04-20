import {
  saveTodoToLocalStorage,
  getTodosFromLocalStorage,
} from "./saveTodos.js";

// Function to add edit functionality to a list item
export function addEditFunctionality(listItem, todoDeleteEl, id) {
  listItem.addEventListener("dblclick", () => {
    console.log("Editing todo with id:", id); // Debug: Check the id
    const currentText = listItem.childNodes[0].nodeValue.trim();
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;
    listItem.textContent = ""; // Clear li
    listItem.appendChild(editInput);
    editInput.focus();

    // Save the edited text on blur
    editInput.addEventListener("blur", () => {
      const newText = editInput.value.trim() || currentText;
      console.log("New text:", newText); // Debug: Check the new text
      listItem.textContent = newText;
      listItem.append(todoDeleteEl); // Re-add the delete button

      // Update local storage
      const todos = getTodosFromLocalStorage();
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        todos[index].text = newText; // Update the text of the todo
        saveTodoToLocalStorage(todos); // Save the updated todos back to local storage
        console.log("Todos after update:", todos); // Debug: Check todos after update
      } else {
        console.error("Todo with id not found:", id); // Debug: Log if id is not found
      }
    });

    // Save the edited text on Enter key
    editInput.addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        editInput.blur(); // Trigger blur to save the text
      }
    });
  });
}
