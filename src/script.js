function _testCase() {}

/**
 * search関数で取得したデータをメールで送信するための関数
 * @param {Object} option - メールで送信する情報を設定
 * @param {string} option.to - 送付先
 * @param {string} option.title - 件名
 * @param {Array} option.itemList - 送信するjsonデータ
 * @param {string} option.itemLayout - アイテム毎の出力書式(HTML)
 * @param {string} option.bodyLayout - 文章全体の出力書式(HTML)
 * @example
 * mail({
 *  title: "React.js関連情報",
 *  itemList: search("React.js OR Next.js"),
 * });
 */
function mail(option = {}) {
  const defaultOption = {
    to: Session.getActiveUser().getUserLoginId(),
    title: "title",
    itemList: [],
    itemLayout: `<p><a href="{{url}}" alt="link">{{title}}</a></p>`,
    bodyLayout: `<h1>{{title}}</h1>
    <div>{{body}}</div>`,
  };
  const baseOption = { ...defaultOption, ...option };
  const arr = search(baseOption.title);
  const itemListBody = arr
    .map((item) => {
      if (item) {
        let itemLayoutStr = baseOption.itemLayout;
        Object.keys(item).forEach((key) => {
          itemLayoutStr = itemLayoutStr.replaceAll(
            `{{${key}}}`,
            item[key].toString()
          );
        });
        return itemLayoutStr;
      }
    })
    .filter((v) => v)
    .join("");
  const templateDataSet = {
    title: baseOption.title,
    body: itemListBody,
  };
  let body = baseOption.bodyLayout;
  Object.keys(templateDataSet).forEach((key) => {
    body = body.replaceAll(`{{${key}}}`, templateDataSet[key].toString());
  });
  MailApp.sendEmail({
    to: baseOption.to,
    subject: baseOption.title,
    htmlBody: body,
  });
}

/**
 * yahoo検索で検索した結果をjson形式で取得するための関数
 * @param {string} word - Yahooで検索するワード
 * @param {Object} option - Yahoo検索時の条件
 * @param {string} option.ei - 文字エンコード
 * @param {string} option.vd - 抽出期間
 * @param {number} option.pages - Yahoo検索で取得するページ数
 * @return {Array} - Yahoo検索結果をjson形式で取得 [{title,url}]
 * @example
 * const json = search("React.js OR Next.js");
 */
function search(word, option = {}) {
  let result = [];
  const defaultOption = {
    x: "wrt",
    aq: -1,
    ai: "",
    ei: "UTF-8",
    vd: "w",
    pages: 2,
  };
  const baseOption = { ...defaultOption, ...option };
  const param = Object.keys(baseOption)
    .map((key) => {
      return `${key}=${encodeURI(baseOption[key])}`;
    })
    .join("&");
  const pageCount = baseOption.pages;
  const linkRegexp = /<a href=\"(.*?) .*?ping.*?>.*?<\/a>/gm;
  const urlRegexp = /href=\"(.*?)\"/;
  const titleRegexp = /<a .*?>(.*?)<\/a>/;
  [...new Array(pageCount)].forEach((value, index) => {
    try {
      const searchUrl =
        "https://search.yahoo.co.jp/search?p=" +
        encodeURI(word) +
        "&" +
        param +
        "&b=" +
        (index * 10 + 1);
      const response = UrlFetchApp.fetch(searchUrl);
      const elems = response.getContentText().match(linkRegexp);
      elems.forEach((elem) => {
        const url = elem.match(urlRegexp)[1];
        if (url === "https://www.yahoo.co.jp") return;
        const title = elem.match(titleRegexp)[1];
        result.push({
          url: url,
          title: title
            .replaceAll("<b>", "")
            .replaceAll("</b>", "")
            .replaceAll("<br>", ""),
        });
      });
    } catch (e) {
      Logger.log("NG count: " + index);
    }
  });
  return result;
}
