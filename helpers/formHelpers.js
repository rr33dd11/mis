export function getInfo(form) {
  const formData = new FormData(form);
  const jsonData = {};

  

  for (const [key, value] of formData.entries()) {
    var input = document.querySelector(`[name=${key}]`);

    if (key.includes('description') || key.includes('diagnoses')) {
      continue;
    }
    
    if (!input.required && value.length == 0) {
      continue;
    }

    if (input.type === "select-multiple") {
      const selectedOptions = Array.from(input.selectedOptions).map(
        (option) => option.value
      );
      jsonData[key] = selectedOptions;
      continue;
    }

    if (value == "on") {
      jsonData[key] = "true";
      continue;
    }
    jsonData[key] = value;
  }
  return jsonData;
}

export function setInfo(form, jsonData) {
  for (const key in jsonData) {
    if (jsonData.hasOwnProperty(key)) {
      const input = form.querySelector('[name="' + key + '"]');

      if (input && jsonData[key]) {
        if (input.type === "select-multiple") {
          const selectedOptions = Array.from(input.options);
          selectedOptions.forEach((option) => {
            option.selected = jsonData[key].includes(option.value);
          });
        } else if (input.type === "checkbox" || input.type == "radio") {
          input.checked = jsonData[key] === true || jsonData[key] === "true";
        } else if (input.type === "date") {
          input.value = jsonData[key].slice(0, 10);
        } else {
          input.value = jsonData[key];
        }
      }
    }
  }
}
