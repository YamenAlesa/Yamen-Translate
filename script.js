//this are all the consts that are used in the script
const dropdowns = document.querySelectorAll(".dropdown-container");
const inputLanguageDropdown = document.querySelector("#input-language");
const outputLanguageDropdown = document.querySelector("#output-language");
const inputTextElem = document.querySelector("#input-text");
const swapBtn = document.querySelector(".swap-position");
const inputLanguage = inputLanguageDropdown.querySelector(".selected");
const outputLanguage = outputLanguageDropdown.querySelector(".selected");
const outputTextElem = document.querySelector("#output-text");
const darkModeCheckbox = document.getElementById("dark-mode-btn");

// Populate the input language dropdown with the available languages
populateDropdown(inputLanguageDropdown, languages);

// Populate the output language dropdown with the available languages
populateDropdown(outputLanguageDropdown, languages);

// Add event listeners to handle dropdown toggle and option selection
dropdowns.forEach((dropdown) => {
  // Toggle the "active" class to show or hide the dropdown when clicked
  dropdown.addEventListener("click", (e) => {
    dropdown.classList.toggle("active");
  });

  // Add event listener to each option in the dropdown
  dropdown.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", (e) => {
      // Remove the "active" class from all options in the dropdown
      dropdown.querySelectorAll(".option").forEach((item) => {
        item.classList.remove("active");
      });

      // Mark the clicked option as active
      item.classList.add("active");

      // Update the selected language label in the dropdown with the clicked option
      const selected = dropdown.querySelector(".selected");
      selected.innerHTML = item.innerHTML;
      selected.dataset.value = item.dataset.value;

      // Call the translate function after selecting a new language
      translate();
    });
  });
});

// Close all dropdowns if the user clicks outside of them
document.addEventListener("click", (e) => {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(e.target)) {
      dropdown.classList.remove("active");
    }
  });
});

// Add a change event listener for input text field
inputTextElem.addEventListener("change", (e) => {
  // Limit the input text to 5000 characters
  if (inputTextElem.value.length > 5000) {
    inputTextElem.value = inputTextElem.value.slice(0, 5000);
  }

  // Trigger translation when the text changes
  translate();
});

// Get the element that will display the character count
const inputChars = document.querySelector("#input-chars");

// Update the character count as the user types in the input text field
inputTextElem.addEventListener("input", (e) => {
  inputChars.innerHTML = inputTextElem.value.length;
});

// Add an event listener for the swap button to switch languages and text
swapBtn.addEventListener("click", (e) => {
  // Swap the displayed input and output languages
  const temp = inputLanguage.innerHTML;
  inputLanguage.innerHTML = outputLanguage.innerHTML;
  outputLanguage.innerHTML = temp;

  // Swap the data value (language code) for the selected languages
  const tempValue = inputLanguage.dataset.value;
  inputLanguage.dataset.value = outputLanguage.dataset.value;
  outputLanguage.dataset.value = tempValue;

  // Swap the input and output text
  const tempInputText = inputTextElem.value;
  inputTextElem.value = outputTextElem.value;
  outputTextElem.value = tempInputText;

  // Trigger translation after swapping
  translate();
});

// Function to populate a dropdown with language options
function populateDropdown(dropdown, options) {
  // Clear the existing options
  dropdown.querySelector("ul").innerHTML = "";

  // Loop through the options and create a list item for each language
  options.forEach((option) => {
    const li = document.createElement("li"); // Create a new list item
    const title = option.name + " (" + option.native + ")"; // Combine language name and native name
    li.innerHTML = title;
    li.dataset.value = option.code; // Set the language code as the data value
    li.classList.add("option"); // Add "option" class to the item

    // Append the option to the dropdown
    dropdown.querySelector("ul").appendChild(li);
  });
}

// Function to perform the translation by making an API call
function translate() {
  // Get the text to be translated
  const inputText = inputTextElem.value;

  // Get the selected input language
  const inputLanguage =
    inputLanguageDropdown.querySelector(".selected").dataset.value;

  // Get the selected output language
  const outputLanguage =
    outputLanguageDropdown.querySelector(".selected").dataset.value;

  // Construct the Google Translate API URL
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${inputLanguage}&tl=${outputLanguage}&dt=t&q=${encodeURI(
    inputText
  )}`;

  // Fetch the translation result from the API
  fetch(url)
    .then((response) => response.json()) // Parse the JSON response
    .then((json) => {
      console.log(json); // Log the result (for debugging)

      // Join the translated text fragments and display the translation
      outputTextElem.value = json[0].map((item) => item[0]).join("");
    })
    .catch((error) => {
      console.log(error); // Log any error that occurs during the fetch request
    });
}
// Add an event listener to the dark mode toggle checkbox
darkModeCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("dark");
});

const button = document.getElementById('toggleButton');
const elgatoElements = document.querySelectorAll('.elgato, .title');

button.addEventListener('click', () => {
    elgatoElements.forEach(element => {
        // Toggle opacity between 0 and 1
        if (element.style.opacity === '0') {
            element.style.opacity = '1'; // Set to full opacity
        } else {
            element.style.opacity = '0'; // Set to no opacity
        }
    });
});
