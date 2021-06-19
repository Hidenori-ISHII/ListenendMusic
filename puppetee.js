// puppeteer の起動
// これを書いている人は Docker で起動しているので root ユーザーでの実行となるのでそのためにいくつか設定をしている
// 一般ユーザー権限で実行する場合は no-sandbox とかは不要
const browser = await puppeteer.launch({headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-logging']});
const page = await browser.newPage();
await page.goto("https://twitter.com/login?hide_message=true&redirect_after_login=https%3A%2F%2Ftweetdeck.twitter.com%2F%3Fvia_twitter_login%3Dtrue", {waitUntil: "domcontentloaded"});

// Twitter のログインページにはフォームがいくつもありどれに入れたらいいのかよく分かってないので面倒なので全部に入力してます
await page.evaluate(()=> document.querySelectorAll("input[name='session[username_or_email]']").forEach((n)=> n.value = 'ユーザー名'));
await page.evaluate(()=> document.querySelectorAll("input[name='session[password]']").forEach((n)=> n.value = 'パスワード'));
await page.evaluate(()=>{
  // ここで 2 秒待っているのは生活の知恵みたいなもんです、こうするとうまくいく
  setTimeout(()=>{
    document.querySelectorAll("button.submit").forEach((n)=> n.click())
  }, 2000);
});
