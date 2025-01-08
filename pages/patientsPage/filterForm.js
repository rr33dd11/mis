import { getInfo, setInfo } from "../../helpers/formHelpers";
import { addQueryParameters, queryParametersToJson } from "../../helpers/queryParams";
import { router } from "../../scripts/router";

export const filterForm = (container) => {
    const FilterForm = `
        <form class="mt-3" id="filters">
            <legend class="fw-bold">Фильтры и сортировка</legend>
            <div class="row flex-wrap">
                <div class="col-12 col-md-6 mb-3">
                    <div class="form-group">
                        <label for="patientName">Имя</label>
                        <input type="text" class="form-control" id="patientName" placeholder="Иванов Иван Иванович"
                            name="name" />
                    </div>
                </div>

                <div class="col-12 col-md-6 mb-3">
                    <div class="form-group">
                        <label for="conclusions">Имеющиеся заключения</label>
                        <select id="conclusions" class="form-select" name="conclusions" multiple>
                            <option value="Death">Смерть</option>
                            <option value="Recovery">Выздоровление</option>
                            <option value="Disease">Болезнь</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="container mb-3">
                <div class="row">
                    <div class="form-check form-switch col-md-4 d-md-flex justify-content-md-center mb-auto mt-auto">
                        <input class="form-check-input me-1" type="checkbox" role="switch" id="sheduledVisits"
                            name="sheduledVisits">
                            <label class="form-check-label mb-3" for="sheduledVisits">Есть запланированные визиты</label>
                    </div>
                    <div class="form-check form-switch col-md-4 d-md-flex justify-content-md-center mb-auto mt-auto">
                        <input class="form-check-input me-1" type="checkbox" role="switch" id="onlyMine" name="onlyMine">
                            <label class="form-check-label mb-3" for="onlyMine">Мои пациенты</label>
                    </div>
                    <div class="form-group mb-3 col-md-4 flex-row mb-auto mt-auto">
                        <label for="sorting">Сортировка пациентов</label>
                        <select class="form-select form-select-sm" id="sorting" name="sorting">
                            <option value="NameAsc">По имени (А-Я)</option>
                            <option value="NameDesc">По имени (Я-А)</option>
                            <option value="CreateDesc">По дате создания (сначала новые)</option>
                            <option value="CreateAsc">По дате создания (сначала старые)</option>
                            <option value="InspectionDesc">По дате осмотра (сначала новые)</option>
                            <option value="InspectionAsc">По дате осмотра (сначала старые)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="form-group mb-3 col-md-4 ">
                    <label for="size">Количество пацинетов на странице</label>
                    <input type="number" class="form-control" id="size" name="size" value="5" min="1" />
                </div>


                <div class="col form-group mb-auto mt-auto">
                    <div class="d-md-flex justify-content-md-end">
                        <button type="button" class="btn btn-primary text-light btn-sm col-md-3 mb-3" id="search">
                            Поиск
                        </button>
                    </div>
                </div>

            </div>
        </form>
    `;

    container.innerHTML = FilterForm;

    $(document).ready(function () {
        $("#conclusions").select2({
            theme: "bootstrap-5",
            closeOnSelect: false,
            width: "100%",
        });

        $(".select2-search").remove();

        var selectedChoices = $(".select2-selection__choice");
        selectedChoices.css("margin-bottom", "0");
        selectedChoices.css("padding", "0em 0.65em");
    });

    $("#conclusions").on("select2:select select2:unselect", function (e) {
        var selectedData = $(".select2-selection__choice");
        selectedData.css("margin-bottom", "0");
        selectedData.css("padding", "0em 0.65em");
    }
    );

    const filters = document.getElementById("filters");

    const currentFilterData = queryParametersToJson();
    setInfo(filters, currentFilterData);
    
    const searchButton = document.getElementById('search')
    searchButton.addEventListener('click', () => {
        const data = getInfo(filters);
        addQueryParameters(data)
        router.resolve()
    })


};
