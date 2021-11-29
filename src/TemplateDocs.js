/**
 * 差し込み出力を行うための関数
 * @param {string} folderId - 出力データ格納先フォルダID
 * @example
 * function TempDocs(){
 *   const { docToDoc } = Work_tools_library.TemplateDocs('1DbGt9LKeCXASy-ZO0w57_DpHiTuYB7dc');
 *   Logger.log(
 *     docToDoc(
 *       '{{テンプレートファイルのID}}',
 *       {
 *         test:'タイトル',
 *         test1:'テーマ',
 *         test2:'はじめに',
 *       },
 *       {
 *         pdfOutput:true
 *       }
 *     )
 *   );
 * }
 */
function TemplateDocs(folderId) {
  const defaultPrintOptions = {
    exportFormat: "pdf", // ファイル形式の指定 pdf / csv / xls / xlsx
    format: "pdf", // ファイル形式の指定 pdf / csv / xls / xlsx
    size: "A4", // 用紙サイズの指定 legal / letter / A4
    portrait: "true", // true → 縦向き、false → 横向き
    fitw: "true", // 幅を用紙に合わせるか
    docNames: "false", // シート名を PDF 上部に表示するか
    printtitle: "false", // スプレッドシート名を PDF 上部に表示するか
    pagenumbers: "false", // ページ番号の有無
  };
  function docToDoc(tampFileId, data, option) {
    const sourceDocument = DriveApp.getFileById(tampFileId);
    const originalName = sourceDocument.getName();
    const baseOptions = {
      pdfOutput: true,
      ...option,
    };

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

    targetDocument.saveAndClose();

    if (baseOptions.pdfOutput) {
      const { linkUrl } = makePDF(fileId);
      return { data, docUrl, pdfUrl: linkUrl, fileId };
    }

    return { data, docUrl, fileId };
  }
  function createPDFblob(fileId, option = {}) {
    const des_url = "https://docs.google.com/document/d/" + fileId + "/export?";
    const baseOptions = {
      ...defaultPrintOptions,
      ...option,
      // gridlines: "false", // グリッドラインの表示有無
      // fzr: "false", // 固定行の表示有無
      // range :       'A1%3AA1',  // 対象範囲「%3A」 = : (コロン)
    };
    const sourceDocument = DriveApp.getFileById(fileId);
    if (sourceDocument) {
      const originalName = sourceDocument.getName();
      const urlExt = [];
      for (optName in baseOptions) {
        urlExt.push(optName + "=" + baseOptions[optName]);
      }
      const options = urlExt.join("&");
      const token = ScriptApp.getOAuthToken();
      const exportUrl = des_url + options;
      const response = UrlFetchApp.fetch(exportUrl, {
        headers: { Authorization: "Bearer " + token },
      });
      const blob = response.getBlob().setName(originalName + ".pdf");
      return { blob, originalName };
    }
    return {};
  }
  function makePDF(fileId, option = {}) {
    const { blob, originalName } = createPDFblob(fileId, option);
    if (blob) {
      const outputDir = DriveApp.getFolderById(folderId);
      const linkUrl = outputDir.createFile(blob).getUrl(); //　PDFを指定したフォルダに保存してURLを取得
      return { linkUrl, originalName };
    }
    return {};
  }
  function makePDFbase64(fileId, option = {}) {
    const { blob, originalName } = createPDFblob(fileId, option);
    if (blob) {
      const base64Url = Utilities.base64Encode(blob.getBytes());
      return { base64Url, originalName };
    }
    return {};
  }
  return { docToDoc, makePDF, createPDFblob, makePDFbase64 };
}
