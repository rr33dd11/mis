import { api } from "../../axios/api"
import { getInfo } from "../../helpers/formHelpers"
import { renderTable } from "./table"

export function reportsAction() {
    const filterForm = document.getElementById('filterForm')
    filterForm.innerHTML = `
        <form id='reportForm' class='mb-3'>
            <div class='row g-3 mb-3'>
                <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="patientName">Дата с</label>
                        <input type="date" class="form-control" name="start" />
                        <div id='divStart'></div>
                    </div>
                </div>
                <div class="col-6 col-md-3">
                    <div class="form-group">
                        <label for="patientName">Дата по</label>
                        <input type="date" class="form-control" name="end" />
                        <div id='divEnd'></div>
                    </div>
                </div>
                <div class='col-12 col-md-6 mb-1'>
                    <div class="form-group">
                        <label for="icdRoots">МКБ-10</label>
                        <select multiple class="form-select" id="icdRoots" data-placeholder="Выбрать" name="icdRoots"></select>
                    </div>
                </div>
            </div>
            <button id='saveReport' class='btn btn-primary mb-2'>Сохранить сводку</button>
        </form>
    `

    const getICDRoots = async () => {
        const response = await api.get('/dictionary/icd10/roots')
        return response.data
    }

    $(document).ready(async function () {
        const diagnosisData = await getICDRoots();
        const search = new URLSearchParams(location.search)
        const selectedData = search.getAll('icdRoots')
        const diagnosisSelect = $('#icdRoots');
        diagnosisData.forEach(item => {
            diagnosisSelect.append(new Option(item.name, item.id, false, selectedData.find(opt => opt == item.id)));
        });

        diagnosisSelect.select2({
            theme: "bootstrap-5",
            closeOnSelect: false,
            width: $(this).data("width")
                ? $(this).data("width")
                : $(this).hasClass("w-100")
                    ? "100%"
                    : "style",

            placeholder: "Выбрать",
            allowClear: true,
            templateSelection: function (data) {
                const selectedItem = diagnosisData.find(item => item.id == data.id);
                return selectedItem ? selectedItem.code : data.text;
            },
            templateResult: function (data) {
                const selectedItem = diagnosisData.find(item => item.id == data.id);
                return selectedItem ? `${selectedItem.name} (${selectedItem.code})` : data.text;
            }
        });

        $(".select2-search").remove();
        var selectedChoices = $(".select2-selection__choice");
        selectedChoices.css("margin-bottom", "0");
        selectedChoices.css("padding", "0em 0.65em");
        $("#diagnosis").on("select2:select select2:unselect", function () {
            var selectedData = $(".select2-selection__choice");
            selectedData.css("margin-bottom", "0");
            selectedData.css("padding", "0em 0em");
        });
    });

    const saveReportButtom = document.getElementById('saveReport')
    saveReportButtom.addEventListener('click', async (e) => {
        e.preventDefault()
        const form = document.getElementById('reportForm');
        const data = getInfo(form)

        const divStart = document.getElementById('divStart')
        divStart.innerHTML = ``
        const divEnd = document.getElementById('divEnd')
        divEnd.innerHTML = ``

    
        if (data.start && data.end && new Date(data.start) < new Date(data.end)) {
            const getReport = async (data) => {
                const baseUrl = '/report/icdrootsreport';
                const requestUrl = new URL(baseUrl, window.location.origin);

                Object.entries(data).forEach(([key, value]) => {
                    if (Array.isArray(value)) {
                        value.forEach((item) => requestUrl.searchParams.append(key, item));
                    } else {
                        requestUrl.searchParams.set(key, value.toString());
                    }
                });

                const response = await api.get(`/report/icdrootsreport${requestUrl.search}`);
                return response.data
            };


            const reportData = await getReport(data)
            const tableContainer = document.getElementById('tableReport')
            renderTable(reportData, tableContainer)
        }
        else {
            if (!data.start) {
                divStart.innerHTML = `<small class='text-danger'>Введите значение</small>`
            }
            if (!data.end) {
                divEnd.innerHTML = `<small class='text-danger'>Введите значение</small>`
            }
            if (new Date(data.start) > new Date(data.end)) {
                divEnd.innerHTML = `<small class='text-danger'>Конечная дата должна быть больше начальной</small>`
            }
        }

    })

}