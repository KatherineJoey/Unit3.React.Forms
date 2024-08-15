import { useState } from "react";

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validationMessage, setValidationMessage] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError(null);
    setValidationMessage("");

    if (username.trim() === "" || password.trim() === "") {
      setValidationMessage("Both username and password are required.");
      return;
    }
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An unexpected error occurred.");
      }

      const responseData = await response.json();
      console.log("Form submitted with:", responseData);
      setToken(result.token);
      setSuccess("Form submitted successfully!");
      setUsername("");
      setPassword("");
      setError(null);
    } catch (error) {
      setError(error.message || "An error occurred.  Please try again.");
      // setSuccess(null);
    }
  }

  return (
    <div>
      <h2>Sign Up!</h2>
      {validationMessage && <p>{validationMessage}</p>}
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            id="txt"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            id="txt2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button id="btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
