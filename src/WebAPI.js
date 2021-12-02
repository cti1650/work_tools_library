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
  let param = e.parameter === undefined ? {} : e.parameter;
  const param_keys = Object.keys(param);
  param_keys.forEach((key) => {
    try {
      const value = JSON.parse(param[key]);
      param[key] = value;
    } catch (error) {
      return;
    }
  });
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
  function checkOutputType(value, type) {
    switch (type.toUpperCase()) {
      case "JSON":
        responseData = ContentService.createTextOutput(
          JSON.stringify(value)
        ).setMimeType(ContentService.MimeType.JSON);
        break;
      case "ICAL":
        let ical = "";
        ical += "BEGIN:VCALENDAR\n";
        ical += "VERSION:2.0\n";
        ical += "PRODID:-//hacksw/handcal//NONSGML v1.0//EN\n";

        value.forEach((row) => {
          ical += "BEGIN:VEVENT\n";
          if (row?.day) {
            if (!row?.start && !row?.end) {
              const formatedDate = Utilities.formatDate(
                row.day,
                "JST",
                "yyyyMMdd"
              );
              ical += "DTSTART;VALUE=DATE:" + formatedDate + "\n";
              ical += "DTEND;VALUE=DATE:" + formatedDate + "\n";
            } else {
              const formatedStartDate = Utilities.formatDate(
                row.start,
                "JST",
                "yyyyMMdd"
              );
              const formatedEndDate = Utilities.formatDate(
                row.end,
                "JST",
                "yyyyMMdd"
              );
              ical += "DTSTART;VALUE=DATE:" + formatedStartDate + "\n";
              ical += "DTEND;VALUE=DATE:" + formatedEndDate + "\n";
            }
          } else {
            const formatedDate = Utilities.formatDate(
              new Date(),
              "JST",
              "yyyyMMdd"
            );
            ical += "DTSTART;VALUE=DATE:" + formatedDate + "\n";
            ical += "DTEND;VALUE=DATE:" + formatedDate + "\n";
          }
          if (row.title || row.summary || row.subject) {
            ical +=
              "SUMMARY:" + (row.title || row.summary || row.subject) + "\n";
          } else {
            ical += "SUMMARY:" + "タイトル" + "\n";
          }
          if (row.location) {
            ical += "LOCATION:" + row.location + "\n";
          }
          if (row.url) {
            ical += "URL:" + row.url + "\n";
          }
          if (row.description) {
            ical += "DESCRIPTION:" + row.description + "\n";
          }
          ical += "END:VEVENT\n";
        });

        ical += "END:VCALENDAR";
        responseData = ContentService.createTextOutput(ical).setMimeType(
          ContentService.MimeType.ICAL
        );
        break;
      default:
        responseData = ContentService.createTextOutput(value);
    }
  }
  function app(methodStr, point, func = () => {}, option = {}) {
    const defaultOption = {
      mimeType: "json",
    };
    const baseOption = {
      ...defaultOption,
      ...option,
    };
    if (method.toUpperCase() === methodStr.toUpperCase()) {
      const dataSet = checkEndpoint(point);
      if (typeof func === "function") {
        if (dataSet) {
          const resData = func({
            ...param,
            ...dataSet,
          });
          checkOutputType(resData, baseOption.mimeType);
        }
      }
      return dataSet;
    }
    return;
  }
  function response(defaultData = {}) {
    if (!responseData) {
      return ContentService.createTextOutput(
        JSON.stringify(defaultData)
      ).setMimeType(ContentService.MimeType.JSON);
    }
    return responseData;
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
