import {
  saveTodoToLocalStorage,
  getTodosFromLocalStorage,
} from "./saveTodos.js";

// Function to add edit functionality to a list item
export function addEditFunctionality(listItem, todoDeleteEl, id) {
  listItem.addEventListener("dblclick", () => {
    console.log("Editing todo with id:", id); // Debug: Check the id

    // Get the current text of the todo
    const currentText = listItem.querySelector("span")?.textContent.trim() || "";
    console.log("Current text:", currentText); // Debug: Check the current text

    // Create an input field for editing
    const editInput = document.createElement("input");
    editInput.type = "text";
    editInput.value = currentText;

    // Clear the list item and add the input field
    listItem.textContent = ""; // Clear li
    listItem.appendChild(editInput);
    editInput.focus();

    // Save the edited text on blur
    editInput.addEventListener("blur", () => {
      const newText = editInput.value.trim() || currentText;
      console.log("New text:", newText); // Debug: Check the new text

      // Update the list item text
      const todos = getTodosFromLocalStorage();
      const index = todos.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        todos[index].text = newText; // Update the text of the todo
        saveTodoToLocalStorage(todos); // Save the updated todos back to local storage
        console.log("Todos after update:", todos); // Debug: Check todos after update

        // Reconstruct the list item
        listItem.textContent = ""; // Clear li

        // Re-add the checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todos[index].completed; // Set the checkbox state
        checkbox.addEventListener("change", () => {
          todos[index].completed = checkbox.checked;
          saveTodoToLocalStorage(todos);
          listItem.classList.toggle("completed", checkbox.checked); // Toggle the completed class
        });
        listItem.appendChild(checkbox);

        // Re-add the updated text
        const textSpan = document.createElement("span");
        textSpan.textContent = newText;
        listItem.appendChild(textSpan);

        // Re-add the delete button
        listItem.append(todoDeleteEl);
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
