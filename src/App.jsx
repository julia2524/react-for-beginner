import { useEffect, useState } from "react";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [money, setMoney] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [coinPrice, setCoinPrice] = useState(42445.158727337555);
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setIsLoading(false);
      });
  }, []);
  const onType = (event) => {
    setMoney(event.target.value);
  };
  useEffect(() => setConvertedValue(money / coinPrice), [money, coinPrice]);

  const onSelect = (event) => {
    setCoinPrice(event.target.value);
    console.log(coinPrice);
  };
  return (
    <div>
      <h1>The Coins!{isLoading ? "" : ` (${coins.length})`}</h1>
      {isLoading ? (
        <strong>Loading...</strong>
      ) : (
        <div>
          <div>
            총 입금 금액(USD):{" "}
            <input
              value={money}
              onChange={onType}
              placeholder="How much money do you have?"
            />
          </div>
          <select onChange={onSelect} value={coinPrice}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.quotes.USD.price}>
                {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
          <div>
            코인 갯수: <input readOnly value={convertedValue} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
