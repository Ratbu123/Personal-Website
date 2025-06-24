document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  // Toggle the navigation menu
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  const contactForm = document.getElementById('email-form');
  // Check if the form exists before attaching event listener
  if (contactForm) {
    contactForm.addEventListener('submit', sendMail);
  }

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');

  // Check if the dark mode toggle element exists
  if (darkModeToggle) {
    const currentTheme = localStorage.getItem('theme');

    // Apply the saved theme if present
    if (currentTheme) {
      document.body.classList.add(currentTheme);
      darkModeToggle.textContent = currentTheme === 'dark-mode' ? '☀️' : '🌙';
    }

    // Toggle theme on click
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️'; // Sun icon for light mode
        localStorage.setItem('theme', 'dark-mode');
      } else {
        darkModeToggle.textContent = '🌙'; // Moon icon for dark mode
        localStorage.setItem('theme', 'light-mode');
      }
    });
  }
});

// sendMail Function: enhanced with spinner and response
function sendMail(event) {
  event.preventDefault();

  const form = event.target;
  const button = form.querySelector('button');
  const responseMessage = document.getElementById('response-message');

  // Disable button and show loading spinner
  button.disabled = true;
  const originalText = button.textContent;
  button.innerHTML = 'Sending <span class="spinner"></span>';

  // Prepare parameters for email
  const parms = {
    to_name: "Diter",
    from_name: document.getElementById("name").value,
    user_email: document.getElementById("user_email").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_6lkd2we", "template_gzssrfw", parms)
    .then(function (response) {
      responseMessage.style.color = 'green';
      responseMessage.textContent = '🎉 Email sent successfully!';
      document.getElementById("email-form").reset();
    }, function (error) {
      responseMessage.style.color = 'red';
      responseMessage.textContent = '❌ Error sending email: ' + error.text;
    })
    .finally(() => {
      button.disabled = false;
      button.textContent = originalText;
    });
}

