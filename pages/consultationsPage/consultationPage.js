import { consultationAction } from './consultationAction';

export function ConsultationPage() {
    document.getElementById('outlet').innerHTML =`
        <div class="container ">
            <div class='mb-2'>
                <h1 class="fw-bold">Консультации</h1>
            </div>
            <div id='filterForm' class="container mx-auto shadow bg-white rounded mb-3"></div>
            <div id='inspectionsBox' class="container mb-3">
                <div class="row g-4" id="consulationsStorage"></div>
            </div>
            <nav><ul id='pagination' class="pagination justify-content-center"></ul></nav>
        </div>


    `
    consultationAction();
}
