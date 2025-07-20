document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("responseMsg").innerText = "Thank you for contacting us! We will get back to you soon.";
  this.reset();
});
