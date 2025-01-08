import { detailsAction } from './detailsAction';

export function DetailsPage(params) {
    document.getElementById('outlet').innerHTML = `
        <div id='details' class='container'></div>
    `
    detailsAction(params.data.id);
}
