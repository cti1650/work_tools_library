/**
 * NotionAPIを扱うための関数
 * @param {string} token - Notion API Token
 */
function NotionApp(token) {
  const url = "https://api.notion.com/v1/";
  const defaultOptions = {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
      "Notion-Version": "2021-08-16",
    },
    payload: {},
  };
  function getQueryDatabase(databaseId, option = {}) {
    const options = { ...defaultOptions, payload: option };
    const endpoint = `databases/${databaseId}/query`;
    const res = UrlFetchApp.fetch(url + endpoint, options);
    return JSON.parse(res);
  }
  return { getQueryDatabase };
}
