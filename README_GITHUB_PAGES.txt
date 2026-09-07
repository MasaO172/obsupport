肥満症治療選択サポート PWA / GitHub Pages 公開用一式

【GitHub Pages での公開】
1. GitHubで新規repositoryを作成します（例: obsupport）。
2. このフォルダの「中身」をrepositoryのルートへアップロードします。
   index.html / manifest.webmanifest / sw.js / 各種png / .nojekyll を同じ階層に置きます。
3. GitHubの repository → Settings → Pages を開きます。
4. Build and deployment → Source で「Deploy from a branch」を選びます。
5. Branch は main、Folder は /(root) を選び Save します。
6. 公開URLが表示されたら、そのURLを最初にオンラインで1回開きます。
7. 以後はService Workerのキャッシュにより、判定機能はオフラインでも使用できます。
   PMDA・厚生労働省等の外部リンクはオンライン時のみ開けます。

【スマートフォンでPWAとして使う】
- iPhone/iPad: Safariで公開URLを開く → 共有 →「ホーム画面に追加」
- Android: Chromeで公開URLを開く → メニュー →「ホーム画面に追加」または「アプリをインストール」

【更新時】
- index.html等を差し替えてmainへ反映すると、GitHub Pagesも更新されます。
- 現在のService Workerは、オンライン時はページ本体の最新版を優先し、オフライン時は保存済み版へ切り替える設定です。
- 大きな構成変更時には sw.js の CACHE_NAME も更新してください。

※初回アクセスはオンライン接続が必要です。


2026-09-04: BMIは小数第2位以下を切り捨て、小数1位で表示・判定する方式に変更。


2026-09-07 update:
- Added PDF manual links in the application.
- docs/device-manual.pdf = 端末別利用マニュアル
- docs/user-guide.pdf = Obsupport.2 使用説明書

[2026-09-07 v9]
- Manual PDFs updated: QR code and public URL corrected to https://masao172.github.io/obsupport/
- Service worker cache name updated to force refresh of manual PDFs.
