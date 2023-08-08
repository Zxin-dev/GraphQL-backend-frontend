import { useRouter } from "next/router";

import { gql, useQuery } from "@apollo/client";
export default function Country() {
  const router = useRouter();
  const country = gql`
  query country  {
    country(code: "${router.query.country}") {
      native
      name
      code
      phone
      
      currency
      languages {
        name
      }
      emoji
  
    }
  }
`;
  const { loading, error, data } = useQuery(country);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error:{error.message}</p>;
  console.log(data.country);
  return (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "white" }}>
      <div>{data.country.name}</div>
    </div>
  );
}
