import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  BitcoinContainer,
  BitcoinHeader,
  FilterSection,
  FilterInput,
  FilterSelect,
  CryptoGrid,
  CryptoCard,
  CryptoHeader,
  CryptoImage,
  CryptoNameSection,
  CryptoName,
  CryptoSymbol,
  CryptoPrice,
  CryptoInfo,
  PriceChange,
  Loading,
  Error,
  NoResults,
  ResultsCount,
} from "./styles";

export default function BitcoinPrice() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [priceRange, setPriceRange] = useState("all");

  const fetch_price = async () => {
    const res = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1"
    );
    return res.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["btcPrice"],
    queryFn: fetch_price,
  });

  // Filter and sort cryptos without useMemo
  let filteredAndSortedCryptos = [];
  if (data) {
    let filtered = data.filter((crypto) => {
      const matchesSearch =
        crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesPriceRange = true;
      if (priceRange !== "all") {
        const price = crypto.current_price;
        switch (priceRange) {
          case "under-1":
            matchesPriceRange = price < 1;
            break;
          case "1-100":
            matchesPriceRange = price >= 1 && price < 100;
            break;
          case "100-1000":
            matchesPriceRange = price >= 100 && price < 1000;
            break;
          case "over-1000":
            matchesPriceRange = price >= 1000;
            break;
          default:
            matchesPriceRange = true;
        }
      }

      return matchesSearch && matchesPriceRange;
    });

    // Sort cryptos
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "market_cap_desc":
          return b.market_cap - a.market_cap;
        case "market_cap_asc":
          return a.market_cap - b.market_cap;
        case "price_desc":
          return b.current_price - a.current_price;
        case "price_asc":
          return a.current_price - b.current_price;
        case "name":
          return a.name.localeCompare(b.name);
        case "change_desc":
          return b.price_change_percentage_24h - a.price_change_percentage_24h;
        case "change_asc":
          return a.price_change_percentage_24h - b.price_change_percentage_24h;
        default:
          return 0;
      }
    });

    filteredAndSortedCryptos = filtered;
  }

  if (isLoading) return <Loading>Loading cryptocurrency data...</Loading>;
  if (isError) {
    console.error(error);
    return <Error>Error: {error.message}</Error>;
  }

  return (
    <BitcoinContainer>
      <BitcoinHeader>
        <h1>₿ Cryptocurrency Market</h1>
        <p>Track {data?.length || 0} cryptocurrencies in real-time</p>
      </BitcoinHeader>

      <FilterSection>
        <FilterInput
          type="text"
          placeholder="🔍 Search by name or symbol..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="under-1">Under $1</option>
          <option value="1-100">$1 - $100</option>
          <option value="100-1000">$100 - $1,000</option>
          <option value="over-1000">Over $1,000</option>
        </FilterSelect>
        <FilterSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="market_cap_desc">Market Cap: High to Low</option>
          <option value="market_cap_asc">Market Cap: Low to High</option>
          <option value="price_desc">Price: High to Low</option>
          <option value="price_asc">Price: Low to High</option>
          <option value="name">Name: A to Z</option>
          <option value="change_desc">24h Change: High to Low</option>
          <option value="change_asc">24h Change: Low to High</option>
        </FilterSelect>
      </FilterSection>

      {filteredAndSortedCryptos.length === 0 ? (
        <NoResults>
          No cryptocurrencies found matching your criteria.
        </NoResults>
      ) : (
        <>
          <ResultsCount>
            Showing {filteredAndSortedCryptos.length} of {data?.length || 0} cryptocurrencies
          </ResultsCount>
          <CryptoGrid>
            {filteredAndSortedCryptos.map((crypto) => (
              <CryptoCard key={crypto.id}>
                <CryptoHeader>
                  <CryptoImage
                    src={crypto.image}
                    alt={crypto.name}
                  />
                  <CryptoNameSection>
                    <CryptoName>{crypto.name}</CryptoName>
                    <CryptoSymbol>{crypto.symbol}</CryptoSymbol>
                  </CryptoNameSection>
                </CryptoHeader>
                <CryptoPrice>
                  ${crypto.current_price.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 6,
                  })}
                </CryptoPrice>
                <CryptoInfo>
                  <strong>Market Cap:</strong> $
                  {crypto.market_cap.toLocaleString()}
                </CryptoInfo>
                <CryptoInfo>
                  <strong>24h Volume:</strong> $
                  {crypto.total_volume.toLocaleString()}
                </CryptoInfo>
                <CryptoInfo>
                  <strong>Circulating Supply:</strong>{" "}
                  {crypto.circulating_supply
                    ? crypto.circulating_supply.toLocaleString()
                    : "N/A"}
                </CryptoInfo>
                <PriceChange
                  positive={crypto.price_change_percentage_24h >= 0}
                >
                  {crypto.price_change_percentage_24h >= 0 ? "↑" : "↓"}{" "}
                  {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
                </PriceChange>
              </CryptoCard>
            ))}
          </CryptoGrid>
        </>
      )}
    </BitcoinContainer>
  );
}
