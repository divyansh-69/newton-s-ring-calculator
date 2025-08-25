// app.js

// Get references to input fields and submit button
const form = document.querySelector('form');
const submitButton = document.querySelector('#submit');

// Add an event listener for form submission
form.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Collect input values
  const observations = [];
  for (let i = 1; i <= 6; i++) {
    const n = parseInt(document.querySelector(`input[name="LHSMSD${i}"]`).value);
    const lhsMSD = parseFloat(document.querySelector(`input[name="LHSMSD${i}"]`).value);
    const lhsVSD = parseFloat(document.querySelector(`input[name="LHSVSD${i}"]`).value);
    const rhsMSD = parseFloat(document.querySelector(`input[name="RHSMSD${i}"]`).value);
    const rhsVSD = parseFloat(document.querySelector(`input[name="RHSVSD${i}"]`).value);

    observations.push({
      n,
      lhsMSD,
      lhsVSD,
      rhsMSD,
      rhsVSD,
    });
  }

  // Calculate the radius of curvature
  const radius = calculateRadius(observations);

  // Display the result
  displayResult(radius);
});

// Function to calculate the radius of curvature
function calculateRadius(observations) {
  let lhstr = [];
  let rhstr = [];

  for (let i = 0; i < observations.length; i++) {
    const lhstrValue =
      observations[i].lhsMSD + observations[i].lhsVSD * 0.002;
    const rhstrValue =
      observations[i].rhsMSD + observations[i].rhsVSD * 0.002;
    lhstr.push(lhstrValue);
    rhstr.push(rhstrValue);
  }

  let d = [];
  for (let i = 0; i < lhstr.length; i++) {
    d.push(lhstr[i] + rhstr[i]);
  }

  let r = [];
  for (let i = 0; i < d.length; i += 2) {
    r.push(
      (d[i] * d[i] - d[i + 1] * d[i + 1]) / (4 * 2 * 0.00005893)
    );
  }

  const totalRadius = r.reduce((acc, curr) => acc + curr, 0);
  return totalRadius / r.length;
}

// Function to display the result
// Function to display the result
function displayResult(radius) {
    // Get the result element
    const resultElement = document.getElementById('result');
  
    // Create a message with the calculated radius
    const resultMessage = `Radius of curvature: ${radius.toFixed(2)} units`;
  
    // Update the result element with the message
    resultElement.innerHTML = resultMessage;
  }
  
  // You can call this function to clear the result if needed
  function clearResult() {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Clears the content
  }
  