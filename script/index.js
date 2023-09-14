"use strict";

// Get references to the buttons
const writerButton = document.getElementById("writerButton");
const readerButton = document.getElementById("readerButton");

// Define functions to open new pages
const openWriterPage = () => {
  // Replace 'writer.html' with the URL of the writer page you want to open
  window.location.href = "writer.html";
};

const openReaderPage = () => {
  // Replace 'reader.html' with the URL of the reader page you want to open
  window.location.href = "reader.html";
};

// Add click event listeners to the buttons
writerButton.addEventListener("click", openWriterPage);
readerButton.addEventListener("click", openReaderPage);
