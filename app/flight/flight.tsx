// pages/index.tsx (または任意のページ)
import { useState, useEffect } from "react";

const FlightsPage: React.FC = () => {
  const [flights, setFlights] = useState<any[]>([]); // 型を必要に応じて変更
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Component mounted, starting API fetch");

    const fetchFlights = async () => {
      try {
        console.log("Fetching from API endpoint: /api/flights");
        // API からフライト情報を取得
        const response = await fetch("/api/flights");
        console.log(
          "API Response status:",
          response.status,
          response.statusText
        );

        if (!response.ok) {
          console.error("API returned error status:", response.status);
          throw new Error(
            `Failed to fetch flights: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        console.log("Successfully fetched data:", data);
        setFlights(data);
      } catch (error) {
        console.error("Error fetching flights:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();

    return () => {
      console.log("Component unmounting");
    };
  }, []);
  if (loading) {
    return <div>フライト情報を取得中...</div>;
  }

  return (
    <div>
      <h1>フライト情報</h1>
      <div>
        {flights.length === 0 ? (
          <div>フライト情報がありません</div>
        ) : (
          flights.map((flight) => (
            <div key={flight.id}>
              <h2>フライトID: {flight.id}</h2>
              <p>マイル数: {flight.miles} マイル</p>
              <p>プログラム: {flight.program}</p>
              <p>航空会社: {flight.airlines.join(", ")}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FlightsPage;
