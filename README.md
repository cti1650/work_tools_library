# Work Tools Library

## このツールについて

このツールは 仕事で活用できそうな機能をまとめたライブラリです！

## 使用方法

### スクリプト ID

```
14fOuPV-L5LE-baRat4myOEz_nZ_H84qF9KV8X8fxwPLKTOt_njS_veol
```

導入方法に関しては以下のサイトがわかりやすいです！

[GAS のおすすめライブラリ一覧！使い方やインポート手順についても解説！](https://monoblog.jp/archives/6019#GAS)

### ライブラリの使い方

#### Json データからテンプレートドキュメントへの差し込み出力

```
function TempDocs(){
  const { docToDoc } = Work_tools_library.TemplateDocs('{{格納先フォルダのID}}');
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

#### LINE Notify へのメッセージ送信

```
function sendLINE() {
  const { sendLine } = Work_tools_library.LineApp('{{LINE Notify token}}');
  sendLine('テスト送信！');
}
```

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
clasp clone 14fOuPV-L5LE-baRat4myOEz_nZ_H84qF9KV8X8fxwPLKTOt_njS_veol
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
- [GAS 超入門 ⑦ - LINE に通知してみる｜スキプラ＠元エンジニア｜ note](https://note.com/skipla/n/nefdfa2abd350)
- [LINE Notify](https://notify-bot.line.me/doc/ja/)
- [GoogleAppScript で Google ドキュメントの差し込み印刷・PDF 発行する - Qiita](https://qiita.com/iori_ama/items/e3cddc9c1c17d8536568)
- [Google Apps Script でよく使うスニペット集 30 選 - Qiita](https://qiita.com/tanabee/items/5de3e8715be759ce1c7f)
- [【GAS】Google Apps Script 活用事例　差し込み文書の作成を自動化する｜ nepia_infinity ｜ note](https://note.com/nepia_infinity/n/n829ed89a187a)
- [Google Apps Script - GAS で修正した document の PDF を添付してメール送信したいが修正前 document の PDF が添付される｜ teratail](https://teratail.com/questions/277836)
- [GAS で請求書を自動作成し PDF 化｜フォーマットへのデータ出力からファイル保存まで](https://fastclassinfo.com/entry/gas_seikyusho/)
- [【コピペで OK！】GAS で現在のシートを PDF 化する方法 - Yuki's bnb blog](https://www.yukibnb.com/entry/create_pdf_active_sheet#PDF%E3%81%AE%E3%82%AA%E3%83%97%E3%82%B7%E3%83%A7%E3%83%B3%E3%82%92%E6%8C%87%E5%AE%9A%E3%81%97%E3%82%88%E3%81%86)
- [GAS で画像を base64 でエンコード - Qiita](https://qiita.com/tsukumo_pro/items/5163751dc5bfee54e768)
