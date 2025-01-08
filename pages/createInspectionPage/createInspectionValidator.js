export const validator = (inspectionData) => {

    const clearMessages = () => {
        var elementsToRemove = document.querySelectorAll(".text-danger");
        elementsToRemove.forEach((element) => {
            element.remove();
        });
    }

    
    const setError = (errorText, element) => {
        const error = document.createElement('p')
        error.textContent = errorText;
        error.classList.add("text-danger");
        element.appendChild(error);
    }

    clearMessages()
    var valid = true
    if (!inspectionData.complaints) {
        setError('Обязательное поле', document.getElementById('complaints'))
        valid = false
    }
    if (!inspectionData.anamnesis) {
        setError('Обязательное поле', document.getElementById('anamnesis'))
        valid = false
    }
    if (!inspectionData.treatment) {
        setError('Обязательное поле', document.getElementById('treatment'))
        valid = false
    }

    if (inspectionData.conclusion == 'Death') {
        if (!inspectionData.deathDate) {
            setError('Обязательное поле', document.getElementById('eventDate'))
            valid = false
        }
    }

    if (inspectionData.conclusion == 'Disease') {
        if (!inspectionData.nextVisitDate) {
            setError('Обязательное поле', document.getElementById('eventDate'))
            valid = false
        }
    }

    if (!inspectionData.date) {
        setError('Обязательное поле', document.getElementById('date'))
        valid = false
    }
   

    return valid;
}