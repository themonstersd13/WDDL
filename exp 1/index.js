function handleFormSubmit(event) {
  event.preventDefault(); 
  const name = document.querySelector('.contact__inputs input[type="text"]').value;
  const email = document.querySelector('.contact__inputs input[type="email"]').value;
  const message = document.querySelector('textarea.contact__input').value;

  if (name.trim() === '' || email.trim() === '' || message.trim() === '') {
    alert("Please fill in all fields.");
    return;
  }

  alert(`Message Sent Successfully!\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`);

  console.log({ name, email, message });

  document.querySelector('.contact__form').reset();
}
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
}
