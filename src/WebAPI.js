/**
 * GASでWebAPIを作成するための関数
 * @param {Object} e - パラメータ
 * @example
 * function doGet(e){
 *   const { response, app } = Work_tools_library.WebAPI(e);
 *   app('GET','/',(data)=>{
 *     return data;
 *   })
 *   app('GET','/items/{id}',(data)=>{
 *     return data;
 *   })
 *   return response();
 * }
 */
function WebAPI(e) {
  const request = e;
  const param = e.parameter === undefined ? {} : e.parameter;
  const method = param?.method || "GET";
  const endpoint = param?.endpoint || "/";
  let responseData = null;
  function checkEndpoint(point) {
    const endpoint_arr = endpoint.split("/");
    const point_arr = point.split("/");
    let data = {};
    const count = point_arr.filter((v, i) => {
      if (v === endpoint_arr[i]) return true;
      if (/{.*?}/.test(v)) {
        data[/{(.*?)}/.exec(v)[1]] = endpoint_arr[i];
        return true;
      }
    }).length;
    if (count === endpoint_arr.length) {
      return data;
    } else {
      return;
    }
  }
  function app(methodStr, point, func = () => {}) {
    if (method === methodStr) {
      const dataSet = checkEndpoint(point);
      if (typeof func === "function") {
        if (dataSet) {
          responseData = func({
            ...param,
            ...dataSet,
          });
        }
      }
      return dataSet;
    }
    return;
  }
  function response(defaultData = {}) {
    if (defaultData) {
      responseData = responseData || defaultData;
    }
    return ContentService.createTextOutput(
      JSON.stringify(responseData)
    ).setMimeType(ContentService.MimeType.JSON);
  }
  return {
    request,
    response,
    app,
    param,
    endpoint,
    method: method.toUpperCase(),
  };
}
