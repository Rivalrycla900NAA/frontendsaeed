import React, { useState } from "react";
import styled from "styled-components";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Ensure we get a valid array from localStorage
    const existingUsers = Array.isArray(JSON.parse(localStorage.getItem("users"))) ? JSON.parse(localStorage.getItem("users")) : [];


    // Check if user already exists
    const userExists = existingUsers.some(user => user.email === email);
    if (userExists) {
      alert("User already exists. Please log in.");
      return;
    }

    // Save the new user
    const newUser = { email, password };
    localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));

    alert("User registered successfully!");
  };

  return (
    <FormContainer>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Sign Up</button>
      </form>
    </FormContainer>
  );
};

export default Signup;

const FormContainer = styled.div`
  text-align: center;
  padding: 50px;
`;
