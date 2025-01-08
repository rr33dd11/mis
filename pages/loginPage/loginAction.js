import { router } from "../../scripts/router";
import { api } from "../../axios/api";
import { isValid, responseError } from "../../helpers/errorSetter";
import { getInfo } from "../../helpers/formHelpers";
import { renderHeader } from "../../components/Header";

export function loginAction() {

  const registrationButton = document.getElementById('register')
  registrationButton.addEventListener('click', () => router.navigate('/registration'))

  const loginButton = document.getElementById('authorize');
  loginButton.addEventListener('click', () => login());

  async function login() {
    setupLoading(true);
    const data = getInfo(document.getElementById('loginForm'))
    if (isValid(data)) {
      await loginRequest(data);
    }
    setupLoading(false)
  }

  async function loginRequest(data) {
    try {
      const response = await api.post('/doctor/login', data)
      if (response.status == 200) {
        localStorage.setItem('token', response.data.token)
        renderHeader()
        router.navigate('/profile')
      }
    }
    catch (error) {
      console.log(error) // пофиксить
      if (error.response && error.response.status == 400) {
        responseError(error.response.data.message)
        return
      }
    }
  }

  function setupLoading(isLoading) {
    isLoading ? loginButton.setAttribute('disabled', '') : loginButton.removeAttribute('disabled')
    loginButton.innerHTML = isLoading ?
      `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Подождите...</span>` : 'Авторизоваться';
  }
}