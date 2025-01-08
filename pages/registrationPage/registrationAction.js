import axios from "axios";
import { api } from "../../axios/api";
import { selectSpeciality } from "../../components/selectSpeciality";
import { getInfo } from "../../helpers/formHelpers";
import { isValid } from "../../helpers/errorSetter";

export function registrationAction() {
    selectSpeciality();

    const registerButton = document.getElementById('register');
    registerButton.addEventListener('click', () => register());

    async function register() {
        setupLoading(true);
        const data = getInfo(document.getElementById('registrationForm'))
        if (isValid(data)) {
            await registerRequest(data);
        }
        setupLoading(false)
    }

    async function registerRequest(data) {
        try {
            const response = await api.post('/doctor/register', data)
            localStorage.setItem('token', response.data.token)
            window.location.assign('/profile')
        }
        catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status == 400) {
                    responseError(responseData)
                    return
                }
            }
        }
    }

    function setupLoading(isLoading) {
        isLoading ? registerButton.setAttribute('disabled', '') : registerButton.removeAttribute('disabled')
        registerButton.innerHTML = isLoading ?
            `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Подождите...</span>` : 'Зарегистрироваться';
    }
}
