export function selectSpeciality() {
    $(".specialitySelect").select2({
        theme: "bootstrap-5",
        width: $(this).data("width")
            ? $(this).data("width")
            : $(this).hasClass("w-100")
                ? "100%"
                : "style",
        placeholder: $(this).data("placeholder"),
        allowClear: true,
        ajax: {
            url: "https://mis-api.kreosoft.space/api/dictionary/speciality",
            dataType: "json",
            delay: 100,
            data: function (params) {
                return {
                    name: params.term,
                    page: params.page || 1,
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;

                return {
                    results: $.map(data.specialties, function (specialty) {
                        return {
                            text: specialty.name,
                            id: specialty.id,
                        };
                    }),
                    pagination: {
                        more: params.page < data.pagination.count,
                    },
                };
            },
        },
    });
}