function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// form

  const scriptURL =
    "https://script.google.com/macros/s/AKfycbz3nKRnkXTXsqQWgm43USoWVmffGHnpFw0FDcreyI3g4d14SZPPSESZMW434BYiaQhe/exec";
  const form = document.forms["submit-to-google-sheet"];
  const success = document.getElementById("success");

  // Function to show an alert message
  function showAlert(message) {
    swal("Error", message, "error");
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Clear any previous success messages
    success.textContent = "";

    // Validate Name
    const nameEntered = form.elements["name"].value;
    const namePattern = /^[A-Za-z\s]+$/;
    if (!namePattern.test(nameEntered)) {
      showAlert("Please enter a valid name with letters and spaces only.");
      return;
    }

    // Validate Phone Number
    const phoneNumber = form.elements["phone"].value;
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      showAlert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Validate Email
    const email = form.elements["email"].value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Please enter a valid email address.");
      return;
    }

    // Submit the form data
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        if (response.status === 200) {
          swal(
            "Successful",
            "You have submitted the form successfully!",
            "success"
          );
          form.reset();
        } else {
          showAlert(
            "There was an error submitting the form. Please try again later."
          );
        }
      })
      .catch((error) => {
        console.error("Error!", error.message);
        showAlert(
          "There was an error submitting the form. Please try again later."
        );
      });
  });


