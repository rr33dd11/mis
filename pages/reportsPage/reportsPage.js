import { reportsAction } from './reportsPageAction';

export function ReportsPage() {
    document.getElementById('outlet').innerHTML = `
        <div class="container ">
            <div class='mb-2'>
                <h1 class="fw-bold mb-2">Отчет</h1>
            </div>
            <div id='filterForm' class="container mx-auto shadow bg-white rounded mb-3 mt-3"></div>
            <div id='inspectionsBox' class="container mb-3">
                <div id='tableReport' class="table-responsive">
                   
                </div>
            </div>
        </div>


    `
    reportsAction();
}
