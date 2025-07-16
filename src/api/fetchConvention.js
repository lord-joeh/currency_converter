import React from 'react'

const fetchConvention = async ({ amount, from, to}) => {

  try {
        const response = await fetch(
        import.meta.env.VITE_ENV === "production" ? "/convert" : "/api/convert",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount, from, to }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Conversion service unavailable");
      }
      console.log(data);

      if (!data.success) {
        throw new Error(data.error || "Conversion failed");
      }

      if (!data.result) {
        throw new Error("No result returned from conversion service");
      }

      if (response.status === 429) {
        throw new Error("Too many requests, please try again later.");
      }

      return data;
     
    
  } catch (error) {
    console.error("Error fetching convention:", error);
    throw error;
    
  }
}

export default fetchConvention
