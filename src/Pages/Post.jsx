import React, { useState } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import Navigation from "../components/Navigation";
import { useAuth } from "../services/auth";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";

function Post() {
  const { user } = useAuth();
  const [postDetails, setPostDetails] = useState({
    name: "",
    description: "",
    price: "",
    address: "",
    latitude: "",
    longitude: "",
    category: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const categoryOptions = ["Couch", "Dresser", "Table"];
  const libraries = ["places"]; // Load the Places library for Autocomplete

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceSelect = (autocomplete) => {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      const address = place.formatted_address;
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setPostDetails((prevDetails) => ({
        ...prevDetails,
        address,
        latitude: lat,
        longitude: lng,
      }));
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      if (!user) throw new Error("User is not authenticated.");

      const newPost = { ...postDetails, user_id: user.uid, status: "FOR_SALE" };

      const response = await axios.post(
        "https://additem-jbhycjd2za-uc.a.run.app",
        newPost,
        { headers: { "Content-Type": "application/json" } }
      );

      alert(`Listing added successfully! Item ID: ${response.data.item_id}`);
      setPostDetails({
        name: "",
        description: "",
        price: "",
        address: "",
        latitude: "",
        longitude: "",
        category: "",
      });
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navigation showSearchBar={false} />
      <LoadScript googleMapsApiKey="AIzaSyDXujfrQ-cDYi1EbQpayGEYRit-fB0KMcE" libraries={libraries}>
        <div className="flex flex-1 overflow-hidden p-4">
          <div className="w-full max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">New Listing</h1>
            <form onSubmit={handlePostSubmit} className="space-y-4">
              <TextField
                label="Name"
                name="name"
                value={postDetails.name}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <TextField
                label="Description"
                name="description"
                value={postDetails.description}
                onChange={handleInputChange}
                fullWidth
                multiline
                rows={4}
                required
              />
              <TextField
                label="Price"
                name="price"
                type="number"
                value={postDetails.price}
                onChange={handleInputChange}
                fullWidth
                required
              />
              <Autocomplete
                onPlaceChanged={(autocomplete) => handlePlaceSelect(autocomplete)}
              >
                <TextField
                  label="Address"
                  name="address"
                  value={postDetails.address}
                  onChange={handleInputChange}
                  fullWidth
                />
              </Autocomplete>
              <FormControl fullWidth required variant="outlined">
                <InputLabel id="category-label">Category</InputLabel>
                <Select
                  labelId="category-label"
                  id="category"
                  name="category"
                  value={postDetails.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categoryOptions.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add Listing"}
              </Button>
            </form>
          </div>
        </div>
      </LoadScript>
    </div>
  );
}

export default Post;