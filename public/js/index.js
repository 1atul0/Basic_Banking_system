function updateSecondSelect() {
  const firstSelect = document.getElementById("first-select");
  const secondSelect = document.getElementById("second-select");
  const selectedValue = firstSelect.value;

  // Enable all options in the second select
  for (let i = 0; i < secondSelect.options.length; i++) {
    secondSelect.options[i].disabled = false;
  }

  // Disable the option with the same value as the selected value in the first select
  for (let i = 0; i < secondSelect.options.length; i++) {
    if (secondSelect.options[i].value === selectedValue) {
      secondSelect.options[i].disabled = true;
      break;
    }
  }
}
