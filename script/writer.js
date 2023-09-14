"use strict";

const NOTES = JSON.parse(localStorage.getItem("NOTES")) || [];

console.log(NOTES);

// Get references
const NOTE_LIST = document.getElementById("list-notes");

document.addEventListener("DOMContentLoaded", () => {
  const updateTime = () => {
    const currentTime = new Date();
    // Create a string in the format dd/mm/yyyy hh:mm:ss
    const timeString = currentTime.toLocaleString();
    // Update the HTML element with the current time
    document.getElementById("time").textContent = `Current Time: ${timeString}`;
  };

  const updateLocalStorage = () => {
    // Assuming NOTES is an object you want to store in local storage
    localStorage.setItem("NOTES", JSON.stringify(NOTES));
  };

  // Call both functions initially
  updateTime();
  updateLocalStorage();

  // Set up an interval to call both functions every 2 seconds
  setInterval(() => {
    updateTime();
    updateLocalStorage();
  }, 2000);
});

const createNote = ({ bodyText }) => {
  const note = {
    id: Date.now(),
    bodyText: bodyText,
  };
  NOTES.push(note);
  return note;
};

const removeNote = ({ bodyText }) => {
  console.log("BodyText  removing ", bodyText);
  const noteIndex = NOTES.findIndex((note) => note.bodyText === bodyText);
  noteIndex !== -1 ? NOTES.splice(noteIndex, 1) : null;
  console.log("After removing ", NOTES);
};

const addTrashIconToNote = (note_textarea_tag, container) => {
  const trashIcon = document.createElement("button");
  trashIcon.innerText = "🗑️"; // You can use any trash icon you prefer

  // Add a click event listener to the trash icon to remove the note
  trashIcon.addEventListener("click", () => {
    removeNote({ bodyText: note_textarea_tag.value });
    container.remove();
  });

  // Append the trash icon next to the <p> tag
  container.appendChild(trashIcon);
};

for (const note in NOTES) {
  const note_textarea_tag = document.createElement("textarea");
  note_textarea_tag.addEventListener("input", (e) => {
    NOTES[note].bodyText = e.target.value;
  });
  note_textarea_tag.value = NOTES[note].bodyText;

  const container = document.createElement("div");
  // Add the trash icon next to the <p> tag
  container.appendChild(note_textarea_tag);
  addTrashIconToNote(note_textarea_tag, container);
  NOTE_LIST.appendChild(container);
}

const note_form = document.getElementById("note-form");
note_form.addEventListener("submit", (e) => {
  e.preventDefault();
  const noteText = document.getElementById("noteText");
  const newNote = createNote({ bodyText: noteText.value });
  noteText.value = "";
  const container = document.createElement("div");
  const note_textarea_tag = document.createElement("textarea");
  note_textarea_tag.value = newNote.bodyText;

  note_textarea_tag.addEventListener("input", (e) => {
    const noteIndex = NOTES.findIndex(
      (note) => note.bodyText === newNote.bodyText
    );
    NOTES[noteIndex].bodyText = e.target.value;
  });
  container.appendChild(note_textarea_tag);

  // Add the trash icon next to the <p> tag
  addTrashIconToNote(note_textarea_tag, container);

  NOTE_LIST.appendChild(container);
});
