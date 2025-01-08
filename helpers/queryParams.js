export function addQueryParameters(jsonData) {
    const defaultPath = window.location.pathname;
    window.history.replaceState({}, "", defaultPath.toString());

    const currentUrl = new URL(window.location.href);
  
    Object.entries(jsonData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => currentUrl.searchParams.append(key, item));
      } else {
        currentUrl.searchParams.set(key, value.toString());
      }
    });
  
    window.history.replaceState({}, "", currentUrl.toString());
  }
  
  export function queryParametersToJson() {
    const currentUrl = new URL(window.location.href);
    const queryParams = currentUrl.searchParams;
  
    const jsonData = {};
  
    for (const [key, value] of queryParams.entries()) {
      if (jsonData.hasOwnProperty(key)) {
        if (!Array.isArray(jsonData[key])) {
          jsonData[key] = [jsonData[key]];
        }
        jsonData[key].push(value);
      } else {
        jsonData[key] = value;
      }
    }
  
    return jsonData;
  }
  