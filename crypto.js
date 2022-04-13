const CoinGecko = require("coingecko-api");
let list = async () => {
  const CoinGeckoClient = new CoinGecko();
  let data = await CoinGeckoClient.exchanges.fetchTickers("bitfinex", {
    coin_ids: ["bitcoin"],
  });
  var _coinList = {};
  var _datacc = data.data.tickers.filter((t) => t.target == "USD");
  ["BTC"].forEach((i) => {
    var _temp = _datacc.filter((t) => t.base == i);
    var _res = _temp.length == 0 ? [] : _temp[0];
    _coinList[i] = _res.last;
  });
  return _coinList;
};
console.log(list[0]);
