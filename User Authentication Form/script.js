document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const switchToSignup = document.getElementById("switch-to-signup");
  const switchToLogin = document.getElementById("switch-to-login");
  const loginEmailInput = document.querySelector(
    "#login-form input[type='email']"
  );
  const loginPasswordInput = document.querySelector(
    "#login-form input[type='password']"
  );
  const signupEmailInput = document.querySelector(
    "#signup-form input[type='email']"
  );
  const signupPasswordInput = document.querySelector(
    "#signup-form input[type='password']"
  );
  const alertBox = document.getElementById("alert-box");

  // Switching between login and signup forms
  switchToSignup.addEventListener("click", () => {
    loginForm.classList.remove("active");
    signupForm.classList.add("active");
  });

  switchToLogin.addEventListener("click", () => {
    signupForm.classList.remove("active");
    loginForm.classList.add("active");
  });

  // Signup form submission
  signupForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = signupEmailInput.value.trim();
    const password = signupPasswordInput.value.trim();

    if (!validateEmail(email)) {
      showAlert("Invalid email format", "error");
      return;
    }

    if (password.length < 6) {
      showAlert("Password must be at least 6 characters long", "error");
      return;
    }

    if (userExists(email)) {
      showAlert("User already exists. Please log in.", "error");
      return;
    }

    addUser(email, password);
    showAlert("User successfully signed up!", "success");
    signupForm.reset();
  });

  // Login form submission
  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const email = loginEmailInput.value.trim();
    const password = loginPasswordInput.value.trim();

    if (authenticateUser(email, password)) {
      showAlert("User successfully logged in!", "success");
    } else {
      showAlert("Invalid email or password", "error");
    }
    loginForm.reset();
  });

  // Email validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Show alert function
  function showAlert(message, type) {
    alertBox.textContent = message;
    alertBox.className = `alert-box ${type}`;
    alertBox.style.display = "block";
    setTimeout(() => {
      alertBox.style.display = "none";
    }, 3000);
  }

  // Check if user exists
  function userExists(email) {
    return localStorage.getItem(email) !== null;
  }

  // Add user to local storage
  function addUser(email, password) {
    localStorage.setItem(email, JSON.stringify({ email, password }));
    console.log("User added:", { email, password });
  }

  // Authenticate user
  function authenticateUser(email, password) {
    const user = localStorage.getItem(email);
    if (!user) return false;

    const storedData = JSON.parse(user);
    return storedData.password === password;
  }
});
