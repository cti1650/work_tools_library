/**
 * PDFのテキストをOCRで取得するための関数
 * @example
 * function ocrTest(){
 *  const { searchFolderById } = Work_tools_library.OCR();
 *  searchFolderById('{folderId}',({text,file})=>{
 *    file.setTrashed(true);
 *    Logger.log(text);
 *  });
 * }
 */
function OCR() {
  function convertTextFromPDFFile(file, folder) {
    return convertTextFromPDF_(convertDocumentFromPDFFile, file, folder);
  }

  function convertTextFromPDFBlob(blob, folder) {
    return convertTextFromPDF_(convertDocumentFromPDFBlob, blob, folder);
  }

  function convertTextFromPDF_(convertDocument, pdf, folder) {
    const document = convertDocument(pdf, folder);
    const text = DocumentApp.openById(document.getId()).getBody().getText();
    document.setTrashed(true);
    return text;
  }

  function convertDocumentFromPDFFile(file, folder) {
    if (!folder) folder = file.getParents().next();
    const blob = file.getBlob();
    return convertDocumentFromPDFBlob(blob, folder);
  }

  function convertDocumentFromPDFBlob(blob, folder) {
    const fileMeta = { title: blob.getName(), mimeType: MimeType.PDF };
    const result = Drive.Files.insert(fileMeta, blob, {
      convert: true,
      ocr: true,
      ocrLanguage: "ja",
    });
    const file = DriveApp.getFileById(result.id);
    if (folder) {
      const parents = file.getParents();
      while (parents.hasNext()) parents.next().removeFile(file);
      folder.addFile(file);
    }
    return file;
  }

  function searchFolderById(folderId, func = () => {}, option = {}) {
    const defaultOption = {
      max: 4,
    };
    const baseOption = {
      ...defaultOption,
      ...option,
    };
    if (!folderId) return;
    const files =
      DriveApp.getFolderById(folderId).getFilesByType("application/pdf");
    let count = 0;
    while (files.hasNext()) {
      file = files.next();
      count += 1;
      const text = convertTextFromPDFFile(file);
      if (typeof func === "function") {
        func({ text, file });
      }
      if (count === baseOption.max) {
        return;
      }
    }
  }
  return { searchFolderById };
}
