import React from "react";
import styled from "styled-components";

const Welcome = () => {
  return (
    <Container>
      <h1>Welcome to User Profile Dashboard of Donation Platform</h1>
      <p>Join us to list and donate items to those in need.</p>
    </Container>
  );
};

export default Welcome;

const Container = styled.div`
  text-align: center;
  padding: 50px;
`;
