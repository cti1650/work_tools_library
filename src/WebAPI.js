/**
 * GASでWebAPIを作成するための関数
 * @param {Object} e - パラメータ
 * @example
 * function doGet(e){
 *   const { method, json, res } = Work_tools_library.WebAPI(e);
 *   switch(method){
 *      case 'GET':
 *        Logger.log(json);
 *        return res(json);
 *        break;
 *      case 'POST':
 *        break;
 *      case 'PUT':
 *        break;
 *      case 'PATCH':
 *        break;
 *      case 'DELETE':
 *        break;
 *      default:
 *   }
 * }
 */
function WebAPI(e) {
  const req = e;
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
  function res(json) {
    return ContentService.createTextOutput(JSON.stringify(json)).setMimeType(
      ContentService.MimeType.JSON
    );
  }
  function response(json = null) {
    if (json) {
      responseData = json;
    }
    return res(responseData);
  }
  return {
    req,
    res,
    response,
    app,
    param,
    endpoint,
    method: method.toUpperCase(),
  };
}
