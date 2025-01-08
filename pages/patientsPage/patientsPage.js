import { patientsAction } from './patientsAction';

export function PatientsPage() {
    document.getElementById('outlet').innerHTML =`
        <div class="container ">
            <div class="row">
                <div class="col mb-auto mt-auto">
                    <div class="d-flex justify-content-start mt-auto">
                        <h1 class="col-6 fw-bold">Пациенты</h1>
                    </div>
                </div>
                <div class="col mb-auto mt-auto">
                    <div class="d-flex justify-content-end">
                        <button type="button" class="btn btn-info text-light btn-sm" data-bs-toggle="modal"
                            data-bs-target="#registerPatientModal">
                            <img src="../../assets/newPatient.svg" width="30" height="24"> Регистрация нового пациента
                        </button>
                        <div id='modalNewPatient'></div>
                    </div>
                </div>
                <div id='filterForm' class="container mx-auto shadow bg-white rounded mb-3"></div>
                <div id='patientsBox' class="container mb-3">
                    <div class="row g-4" id="patientsStorage"></div>
                </div>
            </div>
            <nav><ul id='pagination' class="pagination justify-content-center"></ul></nav>
        </div>
    `
    patientsAction();
}
