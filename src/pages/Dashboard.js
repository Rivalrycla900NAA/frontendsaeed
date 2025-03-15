import React, { useState } from "react";
import styled from "styled-components";

const Dashboard = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const [newItem, setNewItem] = useState("");
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Convert image to Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    if (newItem.trim() === "" || !image) {
      alert("Please enter item name and upload an image.");
      return;
    }

    const newItemData = { name: newItem, image };
    const updatedItems = [...items, newItemData];

    setItems(updatedItems);
    localStorage.setItem("items", JSON.stringify(updatedItems));

    setNewItem("");
    setImage(null);
  };

  return (
    <Container>
      <h2>Marketplace - List Your Donation Items</h2>

      <InputContainer>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Enter item name"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <PreviewImage src={image} alt="Preview" />}
        <button onClick={addItem}>Post Item</button>
      </InputContainer>

      <ItemsGrid>
        {items.length > 0 ? (
          items.map((item, index) => (
            <ItemCard key={index}>
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
            </ItemCard>
          ))
        ) : (
          <p>No items listed yet. Start adding!</p>
        )}
      </ItemsGrid>
    </Container>
  );
};

export default Dashboard;

// Styled Components
const Container = styled.div`
  text-align: center;
  padding: 20px;
  font-family: Arial, sans-serif;
`;

const InputContainer = styled.div`
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  input[type="text"], input[type="file"] {
    padding: 10px;
    width: 300px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }

  button {
    background-color: #28a745;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #218838;
  }
`;

const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-top: 10px;
`;

const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const ItemCard = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  transition: 0.3s;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
  }

  h3 {
    margin-top: 10px;
    font-size: 16px;
  }
`;
