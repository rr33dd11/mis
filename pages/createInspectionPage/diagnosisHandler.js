export const diagnosesHandler = () => {
    let diagnoses = [];
    const diagnosesStorage = document.getElementById('diagnosesStorage')
    const diags = diagnosesStorage.querySelectorAll('.diagnosisBox')
    diags.forEach((con, index) => {
        const diagnosisId = con.querySelector('.diagnosis')
        const description = con.querySelector('.description')
        const types = con.querySelectorAll('.type')
        types.forEach((type) => {
            type.setAttribute('name', `diagnoses${index}`)
        })
        const type = con.querySelector(`input[name="diagnoses${index}"]:checked`)


        const currentConsultation = {
            'icdDiagnosisId': diagnosisId.value,
            'description': description.value,
            'type': type ? type.value : null,
            
        };

        diagnoses.push(currentConsultation)
    });

    return diagnoses
}