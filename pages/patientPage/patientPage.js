import { patientAction } from './patientAction';

export function PatientPage(params) {
    document.getElementById('outlet').innerHTML =`
        <div class="container ">
            <div id='patientInfo' class='mb-2'></div>
            <div id='filterForm' class="container mx-auto shadow bg-white rounded mb-3"></div>
            <div id='inspectionsBox' class="container mb-3">
                <div class="row g-4" id="inspectionsStorage"></div>
            </div>
            <nav><ul id='pagination' class="pagination justify-content-center"></ul></nav>
        </div>


    `
    patientAction(params);
}
