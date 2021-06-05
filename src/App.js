import "./styles/main.scss";
import Header from "./components/Header";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [bitCoin, setBitCoin] = useState(null);

	function fetchBitCoinData() {
		axios
			.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false")
			.then((res) => {
				console.log(res);
				setBitCoin(res.data);
			})
			.catch((err) => console.log(err));
	}

	useEffect(() => {
		fetchBitCoinData();
	}, []);

	return (
		<div className="plugin-container">
			<Header></Header>
			<div className="plugin-body">
				{bitCoin ? (
					<table className="coin-table">
						<thead>
							<tr>
								<th>Name</th>
								<th>Price</th>
								<th>Market Cap</th>
								<th>Volume (24H)</th>
								<th>Price Change</th>
							</tr>
						</thead>
						<tbody>
							{bitCoin.map((coin) => (
								<tr key={coin.id}>
									<td>
										<div className="coin-meta">
											<img className="coin-image" src={coin.image} alt="coin-icon" />
											<span>
												{coin.name}({coin.symbol})
											</span>
										</div>
									</td>
									<td>{coin.current_price.toLocaleString()}</td>
									<td>{coin.market_cap.toLocaleString()}</td>
									<td>{coin.total_volume.toLocaleString()}</td>
									<td>{coin.price_change_percentage_24h.toFixed(2)}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<div>loading</div>
				)}
			</div>
		</div>
	);
}

export default App;
