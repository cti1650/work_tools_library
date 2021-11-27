## Functions

<dl>
<dt><a href="#mail">mail(option)</a></dt>
<dd><p>search関数で取得したデータをメールで送信するための関数</p>
</dd>
<dt><a href="#search">search(word, option)</a> ⇒ <code>Array</code></dt>
<dd><p>yahoo検索で検索した結果をjson形式で取得するための関数</p>
</dd>
</dl>

<a name="mail"></a>

## mail(option)
search関数で取得したデータをメールで送信するための関数

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| option | <code>Object</code> | メールで送信する情報を設定 |
| option.to | <code>string</code> | 送付先 |
| option.title | <code>string</code> | 件名 |
| option.itemList | <code>Array</code> | 送信するjsonデータ |
| option.itemLayout | <code>string</code> | アイテム毎の出力書式(HTML) |
| option.bodyLayout | <code>string</code> | 文章全体の出力書式(HTML) |

**Example**  
```js
mail({
 title: "React.js関連情報",
 itemList: search("React.js OR Next.js"),
});
```
<a name="search"></a>

## search(word, option) ⇒ <code>Array</code>
yahoo検索で検索した結果をjson形式で取得するための関数

**Kind**: global function  
**Returns**: <code>Array</code> - - Yahoo検索結果をjson形式で取得 [{title,url}]  

| Param | Type | Description |
| --- | --- | --- |
| word | <code>string</code> | Yahooで検索するワード |
| option | <code>Object</code> | Yahoo検索時の条件 |
| option.ei | <code>string</code> | 文字エンコード |
| option.vd | <code>string</code> | 抽出期間 |
| option.pages | <code>number</code> | Yahoo検索で取得するページ数 |

**Example**  
```js
const json = search("React.js OR Next.js");
```
