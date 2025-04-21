document.addEventListener('DOMContentLoaded', function() {
    // ----- Stopwatch Functionality -----
    let swSeconds = 0;
    let swInterval = null;
    const swDisplay = document.getElementById('stopwatch-display');
    const swStartBtn = document.getElementById('sw-start');
    const swStopBtn = document.getElementById('sw-stop');
    const swResetBtn = document.getElementById('sw-reset');
  
    function updateStopwatch() {
      swSeconds++;
      let minutes = Math.floor(swSeconds / 60);
      let seconds = swSeconds % 60;
      swDisplay.textContent = 
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds);
    }
  
    swStartBtn.addEventListener('click', function() {
      if (!swInterval) {
        swInterval = setInterval(updateStopwatch, 1000);
      }
    });
  
    swStopBtn.addEventListener('click', function() {
      clearInterval(swInterval);
      swInterval = null;
    });
  
    swResetBtn.addEventListener('click', function() {
      clearInterval(swInterval);
      swInterval = null;
      swSeconds = 0;
      swDisplay.textContent = '00:00';
    });
  
    // ----- Image Carousel Functionality -----
    const carouselImages = [
      './Images/1.jpg',
      './Images/2.jpg',
      './Images/3.jpg'
    ];
    let currentImageIndex = 0;
    const carouselImage = document.getElementById('carousel-image');
    const carouselPrev = document.getElementById('carousel-prev');
    const carouselNext = document.getElementById('carousel-next');
    const carouselDotsContainer = document.getElementById('carousel-dots');
    let carouselInterval = null;
  
    function updateCarousel() {
      carouselImage.src = carouselImages[currentImageIndex];
      updateDots();
    }
  
    function updateDots() {
      carouselDotsContainer.innerHTML = '';
      carouselImages.forEach((img, index) => {
        const dot = document.createElement('span');
        if(index === currentImageIndex) {
          dot.classList.add('active');
        }
        dot.addEventListener('click', function() {
          currentImageIndex = index;
          updateCarousel();
          resetCarouselInterval();
        });
        carouselDotsContainer.appendChild(dot);
      });
    }
  
    carouselPrev.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex - 1 + carouselImages.length) % carouselImages.length;
      updateCarousel();
      resetCarouselInterval();
    });
  
    carouselNext.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
      updateCarousel();
      resetCarouselInterval();
    });
  
    function resetCarouselInterval() {
      clearInterval(carouselInterval);
      carouselInterval = setInterval(function() {
        currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
        updateCarousel();
      }, 3000);
    }
    // Initialize carousel
    updateCarousel();
    resetCarouselInterval();
  
    // ----- Form Validation Functionality -----
    const registrationForm = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const formMessage = document.getElementById('form-message');
  
    registrationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      let valid = true;
  
      // Clear previous error messages
      document.getElementById('name-error').textContent = '';
      document.getElementById('email-error').textContent = '';
      document.getElementById('password-error').textContent = '';
      document.getElementById('confirm-password-error').textContent = '';
      formMessage.textContent = '';
  
      if(nameInput.value.trim().length < 3) {
        document.getElementById('name-error').textContent = 'Name must be at least 3 characters.';
        valid = false;
      }
      if(!emailInput.value.includes('@') || !emailInput.value.includes('.')) {
        document.getElementById('email-error').textContent = 'Please enter a valid email.';
        valid = false;
      }
      if(passwordInput.value.length < 6) {
        document.getElementById('password-error').textContent = 'Password must be at least 6 characters.';
        valid = false;
      }
      if(confirmPasswordInput.value !== passwordInput.value) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
        valid = false;
      }
      if(valid) {
        formMessage.style.color = 'green';
        formMessage.textContent = 'Registration successful!';
        registrationForm.reset();
      }
    });
  
    // ----- To-Do List with Local Storage -----
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const clearAllBtn = document.getElementById('clear-all-btn');
  
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    function saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  
    function renderTasks() {
      todoList.innerHTML = '';
      tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if(task.completed) {
          li.classList.add('completed');
        }
        li.addEventListener('click', function() {
          tasks[index].completed = !tasks[index].completed;
          saveTasks();
          renderTasks();
        });
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✖';
        removeBtn.addEventListener('click', function(e) {
          e.stopPropagation();
          tasks.splice(index, 1);
          saveTasks();
          renderTasks();
        });
        li.appendChild(removeBtn);
        todoList.appendChild(li);
      });
    }
  
    addTaskBtn.addEventListener('click', function() {
      const taskText = todoInput.value.trim();
      if(taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        todoInput.value = '';
      }
    });
  
    clearAllBtn.addEventListener('click', function() {
      tasks = [];
      saveTasks();
      renderTasks();
    });
  
    renderTasks();
  
    // ----- Drag and Drop File Uploader -----
    const fileUploader = document.getElementById('file-uploader');
    const fileInput = document.getElementById('file-input');
    const fileError = document.getElementById('file-error');
    const filePreview = document.getElementById('file-preview');
    const removeFileBtn = document.getElementById('remove-file-btn');
    let currentFile = null;
  
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
      'image/jpeg', 
      'image/jpg'
    ];
  
    fileUploader.addEventListener('click', function() {
      fileInput.click();
    });
  
    fileUploader.addEventListener('dragover', function(e) {
      e.preventDefault();
      fileUploader.style.background = '#e7f3ff';
    });
  
    fileUploader.addEventListener('dragleave', function(e) {
      e.preventDefault();
      fileUploader.style.background = '';
    });
  
    fileUploader.addEventListener('drop', function(e) {
      e.preventDefault();
      fileUploader.style.background = '';
      handleFile(e.dataTransfer.files[0]);
    });
  
    fileInput.addEventListener('change', function() {
      if(fileInput.files[0]) {
        handleFile(fileInput.files[0]);
      }
    });
  
    function handleFile(file) {
      fileError.textContent = '';
      filePreview.innerHTML = '';
      removeFileBtn.style.display = 'none';
      if(!allowedTypes.includes(file.type)) {
        fileError.textContent = 'File type not allowed.';
        return;
      }
      currentFile = file;
      if(file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const img = document.createElement('img');
          img.src = e.target.result;
          filePreview.appendChild(img);
        }
        reader.readAsDataURL(file);
      } else {
        filePreview.textContent = 'File uploaded: ' + file.name;
      }
      removeFileBtn.style.display = 'inline-block';
    }
  
    removeFileBtn.addEventListener('click', function() {
      currentFile = null;
      fileInput.value = '';
      filePreview.innerHTML = '';
      removeFileBtn.style.display = 'none';
    });
  });
  