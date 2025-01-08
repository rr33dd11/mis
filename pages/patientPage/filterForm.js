import { api } from "../../axios/api";
import { getInfo, setInfo } from "../../helpers/formHelpers";
import { addQueryParameters, queryParametersToJson } from "../../helpers/queryParams";
import { router } from "../../scripts/router";

export const filterForm = async (container) => {
    const FilterForm = `
        <form class="mt-3" id="filters">
        <div class="row align-items-center mb-2 d-flex justify-content-around">
            <div class="col col-md-6 mb-1 ">
                <div class="form-group">
                    <label class="mt-3" for="icdRoots">МКБ-10</label>
                    <select multiple class="form-select" id="icdRoots" data-placeholder="Выбрать" name="icdRoots" required>
                    </select>
                </div>
            </div>
            <div class="col-md-3 mb-1">
                <div class="form-check d-flex justify-content-center ">
                    <input class="form-check-input me-1" type="radio" name="grouped" id="exampleRadio1" value="true">
                    <label class="form-check-label" for="exampleRadio1">Сгруппировать по повторным</label>
                </div>
            </div>
            <div class="col-md-3 mb-1">
                <div class="form-check d-flex justify-content-center">
                    <input class="form-check-input me-1" type="radio" name="grouped" id="exampleRadio2" value="false"
                        checked>
                    <label class="form-check-label" for="exampleRadio2">Показать все</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-group mb-3 col-md-4 ">
                <label for="size">Количество осмотров на странице</label>
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

    const filters = document.getElementById("filters");

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


    const currentFilterData = queryParametersToJson();
    setInfo(filters, currentFilterData);

    const searchButton = document.getElementById('search')
    searchButton.addEventListener('click', () => {
        const data = getInfo(filters);
        addQueryParameters(data)
        router.resolve()
    })


};
