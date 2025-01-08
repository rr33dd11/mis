import { createInspectionAction } from './createInspectionAction';

export function CreateInspectionPage() {
    document.getElementById('outlet').innerHTML = `
        <div class="container ">
            <div class='mb-2'>
                <h1 class="fw-bold">Создание осмотра</h1>
            </div>
            <form id='inspectionCreate'>
                <div class='row g-3'>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div class="card-body">
                                <div id='patientInfo'></div>
                                <div id='checkInspection'></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div id='complaints' class="card-body">
                                <h5>Жалобы</h5>
                                <textarea class="form-control" name='complaints' rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div id='anamnesis' class="card-body">
                                <h5>Анамнез заболевания</h5>
                                <textarea class="form-control" name='anamnesis' rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div class="card-body" id='consultationStorage'>
                                <h5>Консультация</h5>
                                <div class='consultation'>
                                    <div class='row'>
                                        <div class='col-auto'>
                                            <div class="form-check form-switch">
                                                <input class="form-check-input" type="checkbox" role="switch" id="needCons">
                                                <label class="form-check-label" for="needCons">Требуется консультация</label>
                                            </div>
                                        </div>
                                        <div class='col'>
                                            <select id='specialitySelect' class="form-select canBeDisabled specialitySelect" disabled></select>
                                        </div>
                                    </div>
                                    <div class="mb-3">
                                        <small>Комментарий</small>
                                        <textarea id='comment' class="form-control canBeDisabled comment" rows="2" disabled></textarea>
                                    </div>
                                    <div id='otherConsultations'></div>
                                    <button type="button" id='addNewConsultation' class="btn btn-primary canBeDisabled" disabled>Добавить консультацию</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div class="card-body" id='diagnosesStorage'>
                                <div class='diagnosisBox'>
                                    <h5>Диагнозы</h5>
                                    <label class="mt-3" for="diagnosis">Болезни</label>
                                    <select class="form-select mb-2 diagnosis" id="diagnosis" data-placeholder="Выбрать" name="icdDiagnosisId" required></select>
                                    <input class="form-control mt-2 mb-2 description" name='description' placeholder='Описание'>
                                    <p>Тип диагноза в осмотре</p>
                                    <div class='mb-2'>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input type" name='type' type="radio" id="inlineRadio1" value="Main">
                                            <label class="form-check-label" for="inlineRadio1">Основной</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input type" name='type' type="radio" id="inlineRadio2" value="Concomitant">
                                            <label class="form-check-label type" for="inlineRadio2">Сопутствующий</label>
                                        </div>
                                        <div class="form-check form-check-inline">
                                            <input class="form-check-input type" name='type' type="radio" id="inlineRadio3" value="Complication">
                                            <label class="form-check-label" for="inlineRadio3">Осложнение</label>
                                        </div>
                                    </div>
                                </div>
                                <div id='otherDiagnoses'></div>
                                <button id='addNewDiagnosis' type="button" class="btn btn-primary">Добавить диагноз</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div id='treatment' class="card-body">
                                <h5>Рекомендация по лечению</h5>
                                <textarea class="form-control" name='treatment' rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 ">
                        <div class="card text-bg-light">
                            <div class="card-body">
                                <h5>Заключение</h5>
                                <div class='row'>
                                    <div class='col-md-6'>
                                        <label class='mb-2' for='conclusion'>Заключение</label>
                                        <select class="form-select" name='conclusion' id='conclusion'>
                                            <option value="Recovery">Выздоровление</option>
                                            <option value="Disease">Болезнь</option>
                                            <option value="Death">Смерть</option>
                                        </select>
                                    </div>
                                    <div class='col-md-6' id='eventDate'>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div class='justify-content-center row g-1 mt-2 mb-2'>
                <div class='col-auto'><button id='confirm' type='button' class='btn btn-primary'>Сохранить осмотр</button></div>
                <div class='col-auto'><button id='cancel' type='button' class='btn btn-secondary'>Отмена</button></div>
            </div>
        </div>
    `
    createInspectionAction();
}