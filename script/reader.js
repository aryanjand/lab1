"use strict";

const NOTES = JSON.parse(localStorage.getItem("NOTES"));
const NOTE_LIST = document.getElementById("list-notes");

for (const note in NOTES) {
  const note_p_tag = document.createElement("p");
  note_p_tag.addEventListener("input", (e) => {
    NOTES[note].bodyText = e.target.value;
  });
  note_p_tag.innerText = NOTES[note].bodyText;

  NOTE_LIST.appendChild(note_p_tag);
}
