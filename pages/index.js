import { gql, useQuery } from "@apollo/client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
const countries = gql`
  query Countries {
    countries {
      capital
      continent {
        name
      }
      name
      code
    }
  }
`;
export default function Home() {
  const countrySearch = useRef("");
  const router = useRouter();
  const [isSearched, setIsSearched] = useState(true);
  const clickHandler = async (country) => {
    router.push(`/${country.code}`);
  };
  const { loading, error, data } = useQuery(countries);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error.message}</p>;
  console.log({ data });
  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      try {
        if (countrySearch.current.value === "") {
          setIsSearched(true);
        } else if (countrySearch.current.value !== "") {
          setIsSearched(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div style={{ backgroundColor: "white" }}>
      <input
        onKeyDown={handleKeyDown}
        style={{
          border: "0.5px solid black",
          width: "50%",
          height: "50px",
          padding: 10,
        }}
        ref={countrySearch}
        placeholder="search county using name"
      ></input>
      <div>
        {isSearched
          ? data.countries.map((country) => (
              <div onClick={() => clickHandler(country)}>{country.name}</div>
            ))
          : data.countries.map((country) => {
              if (
                country.name
                  .toLowerCase()
                  .includes(countrySearch.current.value.toLowerCase())
              ) {
                return (
                  <div
                    style={{
                      width: "100vw",
                      height: "100vh",
                      backgroundColor: "white",
                    }}
                    onClick={() => clickHandler(country)}
                  >
                    {country.name}
                  </div>
                );
              }
            })}
      </div>
    </div>
  );
}
