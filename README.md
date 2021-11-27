# Work Tools Library

## このツールについて

このツールは 仕事で活用できそうな機能をまとめたライブラリです！

## 使用方法

### スクリプト ID

```
1EZpEBW7RavtpwLvGYAwsHqiBw6-5iz74JxkEwTYbDeqEFY_d0VmI_h-k
```

導入方法に関しては以下のサイトがわかりやすいです！

[GAS のおすすめライブラリ一覧！使い方やインポート手順についても解説！](https://monoblog.jp/archives/6019#GAS)

### ライブラリの使い方

以下のスクリプトを作成し実行することで、
Yahoo 検索結果を実行したユーザーのメールアドレス宛に送付できます。

```
function testFunc(){
  YahooSearchCrawlingLibrary.mail({
    'title':'React.js関連情報',
    'itemList':YahooSearchCrawlingLibrary.search('React.js OR Next.js'),
  });
}
```

## 使用時の注意事項

本ライブラリを使用する場合はサーバーへの高負荷をかけないためにも必ず実行時間に 1 秒以上の間隔を空けるようにご協力お願いいたします。

## 使用コマンド

### CLI インストール

#### npm

```
npm install -g @google/clasp
```

#### yarn

```
yarn global add @google/clasp
```

### CLI ログイン

```
clasp login
```

### GAS のスクリプトをローカルにクローン

```
clasp clone 1EZpEBW7RavtpwLvGYAwsHqiBw6-5iz74JxkEwTYbDeqEFY_d0VmI_h-k
```

### ダウンロード

```
clasp pull
```

### アップロード

```
clasp push
```

### バージョン管理

#### 一覧取得

```
clasp versions
```

#### 作成

```
clasp version [バージョン名] [説明]
```

### デプロイ

```
clasp deploy [バージョン名] [説明]
```

### スクリプトエディタを開く

```
clasp open
```

## 参考にしたサイト

- [Google の特別構文 syntax を Yahoo!検索で site コマンドから | SEO BLOG Ragnarok](https://www.seoragnarok.com/posts/20110708191315-1192/)
- [GAS から指定の URL にリクエストを投げて、スクレイピングしてみよう - ポンコツエンジニアのごじゃっぺ開発日記。](https://www.pnkts.net/2019/12/05/gas-web-scraping)
- [Web スクレイピング用 PC は AWS を使った方が安く済むのか検証してみた](https://zenn.dev/heromina/articles/0fbf6017f06d7f)
- [GAS 実行ユーザーのメールアドレス(Google アカウント)を取得する方法 | AutoWorker〜Google Apps Script(GAS)と Sikuli で始める業務改善入門](https://auto-worker.com/blog/?p=2923)
- [Google Apps Script ライブラリの作り方 - Qiita](https://qiita.com/shikumiya_hata/items/0aed6d0c67ee365d9161)
- [自作のライブラリを公開する方法【Google Apps Script / GAS】 | すずきライフ](https://belltree.life/google-apps-script-library-publish/)
- [clasp を使い、Google Apps Script プロジェクトを git でバージョン管理する - Qiita](https://qiita.com/rf_p/items/7492375ddd684ba734f8)
- [Google Apps Script の新しい 3 つの機能 その ③ CLI Tool Clasp - Qiita](https://qiita.com/soundTricker/items/354a993e354016945e44)
- [npm と yarn のコマンド早見表 - Qiita](https://qiita.com/rubytomato@github/items/1696530bb9fd59aa28d8)
- [【学習記録】clasp のインストールからデプロイまで - ざきの学習帳（旧 zackey 推し ）](https://kic-yuuki.hatenablog.com/entry/2018/12/09/114826)
- [[GAS]スクリプト実行ユーザーのアカウント情報を取得するには : 逆引き Google Apps Script](http://www.bmoo.net/archives/2012/03/313067.html)
- [Google Apps Script でクラス型のコードを書いたさいのスクリプトエディタでの補完への対処方法 (Bad Hack) - ChangeLog - noissefnoc](https://noissefnoc.hateblo.jp/entry/2019/04/21/190000?utm_source=feed)
- [TypeScript: Documentation - JSDoc リファレンス](https://www.typescriptlang.org/ja/docs/handbook/jsdoc-supported-types.html#param%E3%81%A8returns)
- [より良い JSDoc ドキュメントの作成](https://ichi.pro/yori-yoi-jsdoc-dokyumento-no-sakusei-153357804391883)
- [GAS のおすすめライブラリ一覧！使い方やインポート手順についても解説！ | monoblog](https://monoblog.jp/archives/6019)
