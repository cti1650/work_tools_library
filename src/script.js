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
    //テンプレートファイルを読み込む
    const sourceDocument = DriveApp.getFileById(tampFileId);
    const originalName = sourceDocument.getName();

    let fileName = originalName;
    Object.keys(data).forEach((key) => {
      fileName = fileName.replace(`{${key}}`, data[key] || "");
    });

    console.log("テンプレートファイルの名前：", sourceDocument.getName());

    //フォルダを指定してファイルを複製
    const copyDir = DriveApp.getFolderById(folderId);
    const copyDocument = sourceDocument.makeCopy(fileName, copyDir);
    const fileId = copyDocument.getId();

    //コピーしたドキュメントのURLを生成 シートなどに転記する際に便利
    const docUrl = "https://docs.google.com/document/d/" + fileId + "/edit";
    console.log("複製後のファイル URL：", docUrl);

    //コピーしたドキュメントを開く
    const targetDocument = DocumentApp.openById(fileId);
    console.log(targetDocument.getName());

    //シートの情報を流し込む
    let body = targetDocument.getBody();
    Object.keys(data).forEach((key) => {
      body.replaceText(`{${key}}`, data[key] || "");
    });

    const array = [data, docUrl];
    return array;
  }
  return { docToDoc };
}
