import { api } from "../../axios/api";
import { isValid } from "../../helpers/errorSetter";
import { getInfo } from "../../helpers/formHelpers";

export const modalNewPatient = (container) => {
  const modal = `
    <div class="modal fade" id="registerPatientModal" data-bs-keyboard="false"
      tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-2 text-center">Регистрация пациента</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <form id="patientRegisterForm">
                <div class="form-group mb-3" id="name">
                  <label for="nameInput" class="form-label fw-light">ФИО</label>
                  <input type="text" class="form-control" id="nameInput" placeholder="Иванов Иван Иванович" name="name" required>
                </div>
                <div class="row">
                  <div class="form-group mb-3 col-lg-6 col-md-6" id="gender">
                    <label class="form-label fw-light" for="gender">Пол</label>
                    <select class="form-control" id="gender" name="gender">
                      <option selected value="Male">Мужской</option>
                      <option value="Female">Женский</option>
                    </select>
                  </div>
                  <div class="form-group mb-3 col-lg-6 col-md-6" id="birthday">
                    <label class="form-label fw-light" for="birthdayPeaker">Дата Рождения</label>
                    <input type="date" id="birthdayPeaker" class="form-control" name="birthday" />
                  </div>
                </div>
              </form>
              <button type="button" id="patientRegistration" class="btn btn-primary col-12 mb-2">Зарегистрировать</button>
              <div>
                <p class="text-success text-center" id="registrationResponse"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = modal;

  const form = document.getElementById('patientRegisterForm')
  const addPatientButton = document.getElementById('patientRegistration')

  addPatientButton.addEventListener('click', async () => {
    const data = getInfo(form);
    if (isValid(data)) {
      setupLoading(true)
      await api.post('/patient', data)
      const response = document.getElementById("registrationResponse");
      response.textContent = "Пациент зарегистрирован";
      setupLoading(false)

      setTimeout(() => {
        form.reset();
        response.textContent = "";
      }, 2000);

    }
  })

  function setupLoading(isLoading) {
    isLoading ? addPatientButton.setAttribute('disabled', '') : addPatientButton.removeAttribute('disabled')
    addPatientButton.innerHTML = isLoading ?
      `<span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
          <span role="status">Подождите...</span>` : 'Зарегистрировать';
  }
};
