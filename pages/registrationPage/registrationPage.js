import { registrationAction } from './registrationAction';

export function RegistationPage() {
    document.getElementById('outlet').innerHTML = `
    <div class="mt-auto mb-auto">
  <div class="container-md mx-auto shadow bg-white rounded col-md-6">
    <h2>Регистрация</h2>
    <form id="registrationForm">
      <div class="form-group mb-3" id="name">
        <label for="nameInput">ФИО</label>
        <input type="text" class="form-control" id="nameInput" placeholder="Иванов Иван Иванович" name="name" required />
      </div>
      <div class="row">
        <div class="form-group mb-3 col-lg-6 col-md-6 flex-row" id="gender">
          <label for="selectGender">Пол</label>
          <select class="form-control" id="selectGender" name="gender">
            <option selected value="Male">Мужской</option>
            <option value="Female">Женский</option>
          </select>
        </div>
        <div class="form-group mb-3 col-lg-6 col-md-6 flex-row" id="birthday">
          <label for="birthdayPicker">Дата Рождения</label>
          <input type="date" id="birthdayPicker" class="form-control" name="birthday" />
        </div>
      </div>

      <div class="form-group mb-3" id="phone">
        <label for="phoneInput">Телефон</label>
        <input type="tel" id="phoneInput" class="form-control" placeholder="+ 7 (ххх)-ххх хх-хх"
          name="phone" />
      </div>

      <div class="form-group mb-3" id="speciality">
        <label for="specialitySelect">Специальность</label>
        <select class="form-select specialitySelect" id="specialitySelect" data-placeholder="Выберите специальность" name="speciality"
          required>
        </select>
      </div>

      <div class="form-group mb-3" id="email">
        <label for="inputEmail">Email</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="name@example.com" name="email" required />
        <small class="form-text text-muted">Email будет использоваться для входа в систему.</small><br>
      </div>

      <div class="form-group mb-3" id="password">
        <label for=" inputPassword">Пароль</label>
        <input type="password" class="form-control" id="inputPassword" name="password" required />
      </div>
    </form>
    <button type="button" id="register" class="btn btn-primary form-control mb-3">
      Зарегистрироваться
    </button>
  </div>
</div>

    `
    registrationAction();
}
