// 匹配银行账号关键字
const account = [
  'managedAccount',
  'escrowAccount',
  'bankCardNo',
  'payBankCardNo',
  'payeeBankCardNo',
  'tickerPayBankCardNo',
  'bankAccount',
];
// 匹配金额字段的关键字
const moneyArr = ['Amount', 'totalGoods', 'amount', 'goodsValue'];
// 匹配日期字段的关键字
const filterArr = ['Time', 'Date', 'Day', 'date'];

// rsa公钥
const public_key = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCIjRKDsT/Y9MGxDwFc5YgQCaOzuXefgn23RgTXlP49uGPdMu79JRHAd1dBYi0Z0a6eFVI3PJ/oun1Q9Rha0G0h5Zl7FAN68WN1UDMaklW8S9va6MZKZoF9CPirPThLSQ/lgYr0HqifCfFv7rv++z69+f61rCjUV/C6PEBn8v9msQIDAQAB';
// rsa私钥
const private_key = 'MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGBAJF+KW6gpS+OyGxWDBK14L4lKTIfTbrBbswUQamYW8JXFkH47xhzU80q+EC0JEOOFl4FSFrlU4dzd4jDQ4SuTQlmeenOHh6+bLkxnNny+ET8+7FXxxHEk1XSsau/rhsauGgNcVA4qV87Wh0JdWVgVhkmvuuauuE5zE+YeFo87LEHAgMBAAECgYAIyNpNkKuInJFjYSqnco3YTTwYh6VU0lsTPWHdkJJxwHpaj2I4UrZLm/2TQo0x+wFEugLtYg1SD1m3SzrnZvLFuC9rWXzkW/VP3sI+sw+9IJ2kvxmcbSiMH56qzUjR4kr9RltkAxlG3Vt3nHNH4aIpNZYd/kCkhHtx74BZDQZzCQJBAMxJmdRzJEeoRNILTp0vJC8IPeEB7XXsxGWcqq1mRUj8O8NTsxrkaErPNGU7uNZQKvlrcNrureDsC+hlnsB8MkUCQQC2UoBwLKNULTUpSBXUCvnVurCNlZ8MqbhMGdQ9lhsZ0GLOLkgClB80MU68fjrPX7zlO/UhDvsu9K5fxItkqfDbAkAYNsEdBWjPdYpyuxReXTAUww1Slj/nMmE1ChTQ6MZdmEgdJtab4WbbNyQmu6V1AZuWZL3DtXa2qkPfD+x5ND9hAkEAioAn048FT/e7r61z742a9nKIljW4Cg2P1De21EYINlboCAp+Z38QKTzfvC8EC+6Fd3pRn5ha1fPH1zZeUc0LCwJAfjmJ5xNiaBB6aMEtLefBbk9jL9oi5S3WYrW9CBoBHa5cWDeEHt8gbmt7dU8fw61BMbRw6jdHdl0L9vF0kOCIYg==';
module.exports = {
  account,
  moneyArr,
  filterArr,
  public_key,
  private_key,
};
