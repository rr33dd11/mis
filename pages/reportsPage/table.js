import { toDDMMYYYY } from "../../helpers/dataFormatter";

export const renderTable = (data, container) => {
    container.innerHTML = ''
    const table = document.createElement('table');
    table.classList.add('table', 'table-bordered', 'align-middle');

    table.innerHTML = `
        <thead class='align-middle justify-center'>
            <tr id='heads'>
                <th scope="col">#</th>
                <th scope="col">Имя</th>
                <th scope="col">Пол</th>
                <th scope="col">Дата рождения</th>
            </tr>
        </thead>
        <tbody class='align-middle table-group-divider'></tbody>
        <tfoot class='table-group-divider'></tfoot>
    `;

    container.appendChild(table);

    const heads = document.getElementById('heads');
    data.filters.icdRoots.forEach((icdCode, index) => {
        const newFilter = document.createElement('th');
        newFilter.textContent = icdCode;
        heads.appendChild(newFilter);
    });

    data.records.forEach((record, rowIndex) => {
        const recordRow = document.createElement('tr');

        recordRow.innerHTML = `
            <td>${rowIndex + 1}</td>
            <td>${record.patientName}</td>
            <td>${record.gender == 'Male' ? 'М' : 'Ж'}</td>
            <td>${record.patientBirthdate ? toDDMMYYYY(record.patientBirthdate) : 'Не указана'}</td>
        `;

        data.filters.icdRoots.forEach(icdCode => {
            const cell = document.createElement('td');
            cell.textContent = record.visitsByRoot[icdCode] || "";
            recordRow.appendChild(cell);
        });

        table.querySelector('tbody').appendChild(recordRow);
    });

    const summaryRow = document.createElement('tr')

    summaryRow.innerHTML = `
        <td colspan='4'>Итого</td>
    `

    data.filters.icdRoots.forEach(icdCode => {
        const cell = document.createElement('td');
        cell.textContent = data.summaryByRoot[icdCode] || 0;
        summaryRow.appendChild(cell);
    });

    table.querySelector('tfoot').appendChild(summaryRow);



};
