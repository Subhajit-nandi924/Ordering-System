
// Get Contact Form
let contactForm = document.getElementById("contactForm");


// Form Submit
contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = document.getElementById("name").value;

    document.getElementById("formMessage").innerText =
        "Thank you, " + name + "! Your message has been submitted.";

    contactForm.reset();

});
