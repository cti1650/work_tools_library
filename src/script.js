/**
 * LINEを扱うための関数
 * @param {string} token - LINE Notify Token
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

function TemplateDocs(folderId) {
  function docToDoc(tampFileId, data) {
    const sourceDocument = DriveApp.getFileById(tampFileId);
    const originalName = sourceDocument.getName();

    let fileName = originalName;
    Object.keys(data).forEach((key) => {
      fileName = fileName.replace(`{${key}}`, data[key] || "");
    });

    console.log("テンプレートファイルの名前：", sourceDocument.getName());

    const copyDir = DriveApp.getFolderById(folderId);
    const copyDocument = sourceDocument.makeCopy(fileName, copyDir);
    const fileId = copyDocument.getId();

    const docUrl = "https://docs.google.com/document/d/" + fileId + "/edit";
    console.log("複製後のファイル URL：", docUrl);

    const targetDocument = DocumentApp.openById(fileId);
    console.log(targetDocument.getName());

    let body = targetDocument.getBody();
    Object.keys(data).forEach((key) => {
      body.replaceText(`{${key}}`, data[key] || "");
    });

    const array = { data, docUrl, fileId };
    return array;
  }

  function makePDF(fileId, fileName = "test") {
    const des_url =
      "https://docs.google.com/document/d/" + duplicateDocumentId + "/export?";
    const opts = {
      exportFormat: "pdf", // ファイル形式の指定 pdf / csv / xls / xlsx
      format: "pdf", // ファイル形式の指定 pdf / csv / xls / xlsx
      size: "A4", // 用紙サイズの指定 legal / letter / A4
      portrait: "true", // true → 縦向き、false → 横向き
      fitw: "true", // 幅を用紙に合わせるか
      docNames: "false", // シート名を PDF 上部に表示するか
      printtitle: "false", // スプレッドシート名を PDF 上部に表示するか
      pagenumbers: "false", // ページ番号の有無
      gridlines: "false", // グリッドラインの表示有無
      fzr: "false", // 固定行の表示有無
      // range :       'A1%3AA1',  // 対象範囲「%3A」 = : (コロン)
    };
    const urlExt = [];
    for (optName in opts) {
      urlExt.push(optName + "=" + opts[optName]);
    }
    const options = urlExt.join("&");
    const token = ScriptApp.getOAuthToken();
    const response = UrlFetchApp.fetch(des_url + options, {
      headers: { Authorization: "Bearer " + token },
    });
    const blob = response.getBlob().setName(fileName + ".pdf");
    var pdf_url = des_drive.createFile(blob).getUrl(); //　PDFを指定したフォルダに保存してURLを取得
    return pdf_url;
  }
  return { docToDoc, makePDF };
}
