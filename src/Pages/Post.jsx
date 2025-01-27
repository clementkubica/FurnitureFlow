import React, { useState, useRef } from "react";
import Navigation from "../components/Navigation";
import { useAuth } from "../services/auth";
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import axios from "axios";

function Post({ isLoaded }) {
  const { user } = useAuth();
  const [postDetails, setPostDetails] = useState({
    name: "",
    description: "",
    price: "",
    address: "",
    latitude: "",
    longitude: "",
    category: "",
    sellBy: "",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const autocompleteRef = useRef(null);

  const categoryOptions = ["Couch", "Dresser", "Table"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePlaceSelect = () => {
    if (autocompleteRef.current) {
      const place = autocompleteRef.current.getPlace();
      if (place && place.geometry) {
        const { lat, lng } = place.geometry.location;
        setPostDetails((prevDetails) => ({
          ...prevDetails,
          address: place.formatted_address,
          latitude: lat(),
          longitude: lng(),
        }));
      }
    }
  };

  const getLatLonFromAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json`,
        {
          params: {
            address: address,
            key: "AIzaSyDXujfrQ-cDYi1EbQpayGEYRit-fB0KMcE",
          },
        }
      );

      if (
        response.data.status === "OK" &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        throw new Error(`Failed to fetch coordinates for address: ${address}`);
      }
    } catch (error) {
      console.error("Error fetching latitude and longitude:", error.message);
      throw error;
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      setIsFetchingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json`,
              {
                params: {
                  latlng: `${latitude},${longitude}`,
                  key: "AIzaSyDXujfrQ-cDYi1EbQpayGEYRit-fB0KMcE",
                },
              }
            );
            const address = response.data.results[0].formatted_address;
            setPostDetails((prevDetails) => ({
              ...prevDetails,
              address,
              latitude,
              longitude,
            }));
          } catch (error) {
            console.error("Error fetching address from location:", error);
          } finally {
            setIsFetchingLocation(false);
          }
        },
        (error) => {
          alert("Unable to retrieve your location.");
          setIsFetchingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      if (!user) throw new Error("User is not authenticated.");

      let { latitude, longitude } = postDetails;

      if (!latitude || !longitude) {
        const coordinates = await getLatLonFromAddress(postDetails.address);
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
      }

      const newPost = {
        ...postDetails,
        latitude,
        longitude,
        user_id: user.uid,
        status: "FOR_SALE",
        date_sellby: postDetails.sellBy || null,
      };

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
        sellBy: "",
      });
    } catch (error) {
      console.error("Error adding listing:", error);
      alert("Failed to add listing. Please try again.");
    } finally {
      setIsAdding(false);
    }
  };

  return isLoaded ? (
    <div className="h-screen flex flex-col">
      <Navigation showSearchBar={false} />
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
              onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
              onPlaceChanged={handlePlaceSelect}
            >
              <TextField
                label="Address"
                name="address"
                value={postDetails.address}
                onChange={handleInputChange}
                fullWidth
                required
              />
            </Autocomplete>
            <Button
              variant="outlined"
              color="secondary"
              onClick={getCurrentLocation}
              fullWidth
              disabled={isFetchingLocation}
            >
              {isFetchingLocation ? "Fetching location..." : "Use My Location"}
            </Button>
            <TextField
              label="Sell By (Optional)"
              name="sellBy"
              type="date"
              value={postDetails.sellBy}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{
                shrink: true,
              }}
            />
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
    </div>
  ) : (
    <div>Loading Google Maps...</div>
  );
}

export default Post;