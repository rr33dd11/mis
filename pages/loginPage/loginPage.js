import { loginAction } from './loginAction';

export function LoginPage() {
    document.getElementById('outlet').innerHTML = `
    <div>
        <div class="container-md mx-auto shadow bg-white rounded col-md-6">
            <h2>Вход</h2>
            <form id="loginForm">
            <div class="form-group mb-3" id="email">
                <label for="emailInput">Email</label>
                <input type="email" id="emailInput" class="form-control" placeholder="name@example.com" name="email" required />
            </div>
            <div class="form-group mb-3" id="password">
                <label for="passwordInput">Пароль</label>
                <input id="passwordInput" type="password" class="form-control" name="password" required />
            </div>
            </form>
            <div id="server-error"></div>
            <button id="authorize" type="button" class="btn btn-primary form-control mb-2">
            Войти
            </button>
            <button id="register" class="btn btn-secondary form-control mb-2" type="button">Зарегистрироваться</button>
        </div>
    </div>
    `
    loginAction();
    
}
