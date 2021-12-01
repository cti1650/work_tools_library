## Functions

<dl>
<dt><a href="#LineApp">LineApp(token)</a></dt>
<dd><p>LINEを扱うための関数</p>
</dd>
<dt><a href="#TemplateDocs">TemplateDocs(folderId)</a></dt>
<dd><p>差し込み出力を行うための関数</p>
</dd>
<dt><a href="#WebAPI">WebAPI(e)</a></dt>
<dd><p>GASでWebAPIを作成するための関数</p>
</dd>
</dl>

<a name="LineApp"></a>

## LineApp(token)
LINEを扱うための関数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| token | <code>string</code> | LINE Notify Token |

**Example**  
```js
function sendLINE() {
  const { sendLine } = Work_tools_library.LineApp('{{LINE Notify token}}');
  sendLine('テスト送信！');
}
```
<a name="TemplateDocs"></a>

## TemplateDocs(folderId)
差し込み出力を行うための関数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| folderId | <code>string</code> | 出力データ格納先フォルダID |

**Example**  
```js
function TempDocs(){
  const { docToDoc } = Work_tools_library.TemplateDocs('1DbGt9LKeCXASy-ZO0w57_DpHiTuYB7dc');
  Logger.log(
    docToDoc(
      '{{テンプレートファイルのID}}',
      {
        test:'タイトル',
        test1:'テーマ',
        test2:'はじめに',
      },
      {
        pdfOutput:true
      }
    )
  );
}
```
<a name="WebAPI"></a>

## WebAPI(e)
GASでWebAPIを作成するための関数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| e | <code>Object</code> | パラメータ |

**Example**  
```js
function doGet(e){
  const { method, json, res } = Work_tools_library.WebAPI(e);
  switch(method){
     case 'GET':
       Logger.log(json);
       return res(json);
       break;
     case 'POST':
       break;
     case 'PUT':
       break;
     case 'PATCH':
       break;
     case 'DELETE':
       break;
     default:
  }
}
```
