import { router } from "../scripts/router";
import { api } from "../axios/api";

document.getElementById('header').innerHTML = `
  <nav class="navbar navbar-expand-lg bg-primary navbar-dark mb-3">
    <div class="container-fluid">
      <div class="navbar-brand mb-auto mt-auto">
        <img src="/assets/skull.svg" alt="Logo" width="30" height="24" class="d-inline-block mb-auto mt-auto">
        Try not to DIE
      </div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Переключатель навигации">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item auth" id="Patients">
            <a class="nav-link active" href="/patients" data-navigo>Пациенты</a>
          </li>
          <li class="nav-item auth" id="Consultations">
            <a class="nav-link active" href="/consultations" data-navigo>Консультации</a>
          </li>
          <li class="nav-item auth" id="Reports">
            <a class="nav-link active" href="/reports" data-navigo>Отчеты и статистика</a>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto mr-4 mt-2 mt-lg-0">
          <li class="nav-item dropdown auth">
            <a class="text-truncate nav-link active dropdown-toggle" style="max-width: 25ch;" role="button"
                data-bs-toggle="dropdown" aria-expanded="false" id="profileName">
            </a>
            <ul class="dropdown-menu">
                <a class="dropdown-item" href="/profile" data-navigo>Профиль</a>
                <p style='cursor: pointer;  margin-bottom: 0' class="dropdown-item" id="Logout">Выйти</p>
            </ul>
          </li>
          <li class="nav-item nonAuth" id="Login">
              <a class="nav-link active" href="/login" data-navigo>Вход</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
`

document.getElementById('Logout').addEventListener('click', () => { logoutRequest() })

async function logoutRequest() {
  await api.post('/doctor/logout')
  localStorage.clear()
  renderHeader()
  router.navigate('/login')
}

export function renderHeader() {
  const isAuth = !!localStorage.getItem('token')
  if (isAuth) {
    document.querySelectorAll('.auth').forEach(el => el.classList.remove('d-none'));
    document.querySelectorAll('.nonAuth').forEach(el => el.classList.add('d-none'));
    if (window.location.pathname == '/') { router.navigate('patients') }
  } else {
    document.querySelectorAll('.nonAuth').forEach(el => el.classList.remove('d-none'));
    document.querySelectorAll('.auth').forEach(el => el.classList.add('d-none'));
    if (window.location.pathname == '/') { router.navigate('login') }
  }
}

export function setProfileName(newName) {
  if (newName) {
    if (newName.length > 20) {
      newName = newName.slice(0, 20).concat('...')
    }

    const profileName = document.getElementById('profileName')
    profileName.innerText = newName
  }
}

renderHeader()
setProfileName(localStorage.getItem('name'))