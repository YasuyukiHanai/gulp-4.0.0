## gulp@4.0.0でのgulpファイル


_gulpfile.js（v3.9.1）からgulpfile.js（v4.0.0）へ変更。
注意点として以下、

- - -
<dl>
  <dt>・es5の書き方出来ます。</dt>
  <dt>・新しいメソッド、gulp.seriesとgulp.parallel</dt>
  <dd>タスクの直列処理・並列処理が標準APIで実装可能になりました。</dd>
  <dt>・gulp.taskの引数が変更</dt>
  <dt>・gulp.watchの引数も変更</dt>
</dl>

詳細参考:
[かもメモ Gulp v4 移行メモ](https://chaika.hatenablog.com/entry/2018/06/02/090000)
[CodeCode gulp@4.0.0を試してみた](https://codecodeweb.com/blog/459)

- - -

#####　
##### メモ

- 直列処理・並列処理にはなにかしらの引数をもたせ（gulpfile.jsでは'done'）コールバック関数でタスクの完了を明示させないとエラーになる。  
- default内で使ってる"watch"はまとめられるが、直列処理・並列処理が混ざってしまって煩雑になってしまうので別処理として書くべき
