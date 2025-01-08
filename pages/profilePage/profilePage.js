import { profileAction } from './profileAction';

export function ProfilePage() {
    document.getElementById('outlet').innerHTML = `
    <div class="mt-auto mb-auto">
    <div class="container-md mx-auto shadow bg-white rounded col-md-6">
        <h2>Профиль</h2>
        <form id="profileForm">
            <div class="form-group mb-3" id="name">
                <label for="name">ФИО</label>
                <input type="text" class="form-control" id="nameInput" placeholder="Иванов Иван Иванович" name="name"
                    required />
            </div>
            <div class="row">
                <div class="form-group mb-3 col-lg-6 col-md-6 flex-row" id="gender">
                    <label for="genderSelect">Пол</label>
                    <select class="form-control" id="genderSelect" name="gender">
                        <option value="Male">Мужской</option>
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

            <div class="form-group mb-3" id="email">
                <label for="emailInput">Email</label>
                <input type="email" id="emailInput" class="form-control" placeholder="name@example.com" name="email"
                    required />
            </div>

        </form>
        <button type="button" id="saveChanges" class="btn btn-primary form-control mb-3">
            Сохранить изменения
        </button>
    </div>
</div>


    `
    profileAction();
}
