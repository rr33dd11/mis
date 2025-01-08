export function isValid(jsonData) {
    clearPreviousMessages();
    var valid = true;
    Object.entries(jsonData).forEach(function ([key, value]) {
        switch (key) {
            case "email":
                if (!value.match(/.+/)) {
                    valid = false;
                    createMessage(key, "Введите email");
                } else if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    valid = false;
                    createMessage(
                        key,
                        "Введенное значение не соответсвует формату email"
                    );
                }
                break;
            case "password":
                if (!value.match(/.+/)) {
                    valid = false;
                    createMessage(key, "Введите пароль");
                } else if (!value.match(/^(?=.*\d).{6,}$/)) {
                    valid = false;
                    createMessage(
                        key,
                        "Пароль должен содержать хотя бы одну цифру. Минимальная длина пароля 6."
                    );
                }
                break;
            case "name":
                if (!value.match(/.+/)) {
                    valid = false;
                    createMessage(key, "Введите имя");
                }
                break;
            case "birthday":
                var bday = new Date(value);
                var now = new Date();
                if (bday > now) {
                    valid = false;
                    createMessage(key, "Пока что мы не можем родиться в будущем");
                }
                break;
            case "phone":
                if (!value.match(/^\+7\d{10}$/)) {
                    valid = false;
                    createMessage(key, "Введите телефон в формате +7хххххххххх");
                }
                break;
        }
    });
    return valid;
}

export function createMessage(nameOfField, message) {
    const field = document.getElementById(nameOfField);
    const errorMessage = document.createElement("small");
    errorMessage.textContent = message;
    errorMessage.classList.add("text-danger");
    errorMessage.classList.add("text-break");
    field.appendChild(errorMessage);
}

function clearPreviousMessages() {
    var elementsToRemove = document.querySelectorAll(".text-danger");
    elementsToRemove.forEach(function (element) {
        element.remove();
    });
}

export function responseError(message) {
    switch (message) {
        case "Login failed":
            var field = document.getElementById("server-error");
            var errorMessage = document.createElement("p");
            errorMessage.textContent = "Неверный email или пароль";
            errorMessage.classList.add("text-danger");
            errorMessage.classList.add("text-break");
            field.appendChild(errorMessage);
            break;
        case "Duplicate email":
            var field = document.getElementById("email");
            var errorMessage = document.createElement("small");
            errorMessage.textContent = "Пользователь с таким email уже существует";
            errorMessage.classList.add("text-danger");
            errorMessage.classList.add("text-break");
            field.appendChild(errorMessage);
            break;
    }
}