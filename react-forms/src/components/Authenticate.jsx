import React, { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    setSuccessMessage(null);
    setError(null);

    if (!token) {
      setError("No token available.  Please sign up first.");
      return;
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (result.success) {
        setSuccessMessage(result.message);
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(
        "An error occurred while authenticating. Please try again later."
      );
    }
  }
  return (
    <>
      <h2>Authenticate</h2>

      {successMessage && <p>{successMessage}</p>}

      {error && <p>{error}</p>}

      <button onClick={handleClick}>Authenticate Token!</button>
    </>
  );
}
