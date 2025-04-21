// Problem 1: Dynamic Content Update
document.getElementById("changeHeadingBtn").addEventListener("click", function() {
    const heading = document.getElementById("dynamicHeading");
    heading.textContent = "Heading Updated!";
  });
  
  // Problem 2: Real-Time Character Counter
  const charInput = document.getElementById("charInput");
  const charCount = document.getElementById("charCount");
  
  charInput.addEventListener("input", function() {
    charCount.textContent = charInput.value.length;
  });
  
  // Problem 3: Add and Remove List Items
  const addItemBtn = document.getElementById("addItemBtn");
  const listInput = document.getElementById("listInput");
  const dynamicList = document.getElementById("dynamicList");
  
  addItemBtn.addEventListener("click", function() {
    if (listInput.value.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = listInput.value;
  
      const removeBtn = document.createElement("button");
      removeBtn.textContent = "Remove";
      removeBtn.style.marginLeft = "10px";
      removeBtn.addEventListener("click", function() {
        li.remove();
      });
  
      li.appendChild(removeBtn);
      dynamicList.appendChild(li);
      listInput.value = "";
    }
  });
  
  // Problem 4: Change Background Colour
  const colorButtons = document.querySelectorAll(".colorBtn");
  colorButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      document.body.style.backgroundColor = btn.getAttribute("data-color");
    });
  });
  
  // Problem 5: Toggle Dark Mode
  const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
  toggleDarkModeBtn.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
  });
  
  // Problem 6: Simple Quiz Application
  const quizButtons = document.querySelectorAll(".quizBtn");
  const quizFeedback = document.getElementById("quizFeedback");
  
  quizButtons.forEach(btn => {
    btn.addEventListener("click", function() {
      if (btn.getAttribute("data-answer") === "correct") {
        quizFeedback.textContent = "Correct!";
        quizFeedback.style.color = "green";
      } else {
        quizFeedback.textContent = "Wrong Answer!";
        quizFeedback.style.color = "red";
      }
    });
  });
  