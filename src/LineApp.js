/**
 * LINEを扱うための関数
 * @param {string} token - LINE Notify Token
 * @example
 * function sendLINE() {
 *   const { sendLine } = Work_tools_library.LineApp('{{LINE Notify token}}');
 *   sendLine('テスト送信！');
 * }
 */
function LineApp(token) {
  const url = "https://notify-api.line.me/api/notify";
  const defaultOptions = {
    method: "post",
    headers: {
      Authorization: "Bearer " + token,
    },
    payload: {
      message: "",
    },
  };
  function sendLine(text) {
    const options = { ...defaultOptions, payload: { message: text } };
    if (options?.payload.message) {
      UrlFetchApp.fetch(url, options);
    }
  }
  return { sendLine };
}
