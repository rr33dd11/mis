export function Page404() {
    document.getElementById('outlet').innerHTML =`
        <div class="container ">
            <div class='row justify-content-center'>
                <col><h1>404 Такой страницы не найдено</h1></col>
                <col><p>Извините, такой страницы не существует</p></col>
                <col-auto><button id='goBack' type="button" class="btn btn-primary">Назад</button></col>
            </div>
        </div>

    `

    const backButton = document.getElementById('goBack')
    backButton.addEventListener('click', () => {
        window.history.length > 1 ? window.history.back() : window.history.pushState({}, '', '/patients')
    })
}