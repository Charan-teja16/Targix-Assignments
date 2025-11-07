import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  CountriesContainer,
  CountriesHeader,
  FilterSection,
  FilterInput,
  FilterSelect,
  CountriesGrid,
  CountryCard,
  CountryFlag,
  CountryName,
  CountryInfo,
  Loading,
  Error,
  NoResults,
  ResultsCount,
} from "./styles";

export default function Countries() {
  const [searchTerm, setSearchTerm] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const fetch_data = async () => {
    const res = await axios.get(
      "https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags"
    );
    return res.data;
  };

  const { isError, data, isLoading } = useQuery({
    queryKey: ["Countries"],
    queryFn: fetch_data,
  });

  // Filter and sort countries without useMemo
  let filteredAndSortedCountries = [];
  if (data) {
    let filtered = data.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion =
        regionFilter === "all" || country.region === regionFilter;
      return matchesSearch && matchesRegion;
    });

    // Sort countries
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.common.localeCompare(b.name.common);
        case "population-desc":
          return b.population - a.population;
        case "population-asc":
          return a.population - b.population;
        default:
          return 0;
      }
    });

    filteredAndSortedCountries = filtered;
  }

  // Get unique regions without useMemo
  let uniqueRegions = [];
  if (data) {
    const regions = [...new Set(data.map((country) => country.region))];
    uniqueRegions = regions.sort();
  }

  if (isLoading) return <Loading>Loading countries...</Loading>;
  if (isError) return <Error>Error loading countries. Please try again later.</Error>;

  return (
    <CountriesContainer>
      <CountriesHeader>
        <h1>🌍 World Countries</h1>
        <p>Explore {data?.length || 0} countries from around the world</p>
      </CountriesHeader>

      <FilterSection>
        <FilterInput
          type="text"
          placeholder="🔍 Search by country name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={regionFilter}
          onChange={(e) => setRegionFilter(e.target.value)}
        >
          <option value="all">All Regions</option>
          {uniqueRegions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </FilterSelect>
        <FilterSelect
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="population-desc">Population: High to Low</option>
          <option value="population-asc">Population: Low to High</option>
        </FilterSelect>
      </FilterSection>

      {filteredAndSortedCountries.length === 0 ? (
        <NoResults>
          No countries found matching your criteria.
        </NoResults>
      ) : (
        <>
          <ResultsCount>
            Showing {filteredAndSortedCountries.length} of {data?.length || 0} countries
          </ResultsCount>
          <CountriesGrid>
            {filteredAndSortedCountries.map((country) => (
              <CountryCard key={country.name.common}>
                <CountryFlag
                  src={country.flags.png}
                  alt={country.name.common}
                />
                <CountryName>{country.name.common}</CountryName>
                <CountryInfo>
                  <strong>Capital:</strong> {country.capital ? country.capital[0] : "N/A"}
                </CountryInfo>
                <CountryInfo>
                  <strong>Region:</strong> {country.region}
                </CountryInfo>
                <CountryInfo>
                  <strong>Population:</strong> {country.population.toLocaleString()}
                </CountryInfo>
              </CountryCard>
            ))}
          </CountriesGrid>
        </>
      )}
    </CountriesContainer>
  );
}
