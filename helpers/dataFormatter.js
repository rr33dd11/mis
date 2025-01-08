export function toDDMMYYYY(inputDate) {
    var dateObject = new Date(inputDate);
    var day = dateObject.getDate().toString().padStart(2, "0");
    var month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    var year = dateObject.getFullYear();
    return `${day}.${month}.${year}`;
  }
  
  export function toDDMMYYYYhhmm(inputDate) {
    var dateObject = new Date(inputDate);
    var day = dateObject.getDate().toString().padStart(2, "0");
    var month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    var year = dateObject.getFullYear();
    var hours = dateObject.getHours().toString().padStart(2, "0");;
    var minutes = dateObject.getMinutes().toString().padStart(2, "0");;
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }
  