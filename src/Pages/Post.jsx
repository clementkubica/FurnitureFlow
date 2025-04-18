import React, { useState, useRef } from "react";
import Navigation from "../components/Navigation";
import { useAuth } from "../services/auth";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import { Autocomplete } from "@react-google-maps/api";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
    imageFiles: [],
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);
  const autocompleteRef = useRef(null);
  const fileInputRef = useRef(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const categoryOptions = ["Couch", "Dresser", "Table", "Other"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + postDetails.imageFiles.length > 3) {
      setSnackbarMessage("You can upload up to 3 images only.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    setPostDetails((prevDetails) => ({
      ...prevDetails,
      imageFiles: [...prevDetails.imageFiles, ...files],
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
              "https://maps.googleapis.com/maps/api/geocode/json",
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
          setSnackbarMessage(
            "Failed to retrieve your location. Please try again."
          );
          setSnackbarSeverity("error");
          setSnackbarOpen(true);
          setIsFetchingLocation(false);
        }
      );
    } else {
      setSnackbarMessage("Geolocation not supported by browser.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const uploadImagesToFirebase = async (files, user_id) => {
    try {
      const storage = getStorage();
      const uploadedImages = [];

      for (const file of files) {
        const filePath = `user${user_id}/${file.name}`;
        const storageRef = ref(storage, filePath);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        uploadedImages.push({ downloadURL, filePath });
      }

      return uploadedImages;
    } catch (error) {
      console.error("Error uploading images:", error);
      throw new Error("Failed to upload images");
    }
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsAdding(true);

    try {
      if (!user) throw new Error("User is not authenticated.");

      let { latitude, longitude, imageFiles } = postDetails;

      if (!latitude || !longitude) {
        const coordinates = await getLatLonFromAddress(postDetails.address);
        latitude = coordinates.latitude;
        longitude = coordinates.longitude;
      }
      let imageUrls = [];
      let imagePaths = [];

      if (imageFiles.length > 0) {
        const uploadResults = await uploadImagesToFirebase(
          imageFiles,
          user.uid
        );
        imageUrls = uploadResults.map((img) => img.downloadURL);
        imagePaths = uploadResults.map((img) => img.filePath);
      }

      const newPost = {
        name: postDetails.name,
        description: postDetails.description,
        price: postDetails.price,
        address: postDetails.address,
        latitude,
        longitude,
        category: postDetails.category,
        user_id: user.uid,
        status: "FOR_SALE",
        date_sellby: postDetails.sellBy || null,
        imageUrls,
        imagePaths,
      };

      console.log("Request Payload:", newPost);
      const response = await axios.post(
        "https://additem-jbhycjd2za-uc.a.run.app",
        newPost,
        { headers: { "Content-Type": "application/json" } }
      );

      setSnackbarMessage("Listing added successfully!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setPostDetails({
        name: "",
        description: "",
        price: "",
        address: "",
        latitude: "",
        longitude: "",
        category: "",
        sellBy: "",
        imageFiles: [],
      });
    } catch (error) {
      console.error("Error adding listing:", error);
      setSnackbarMessage("Failed to add listing. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } finally {
      setIsAdding(false);
    }
  };

  const removeImage = (index) => {
    setPostDetails((prevDetails) => {
      const updatedImages = prevDetails.imageFiles.filter(
        (_, i) => i !== index
      );

      if (updatedImages.length === 0 && fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return { ...prevDetails, imageFiles: updatedImages };
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const handleUploadButtonClick = () => {
    fileInputRef.current.click();
  };
  return isLoaded ? (
    <div className="h-screen flex flex-col">
      <Navigation showSearchBar={false} />
      <div className="flex flex-1 overflow-hidden overflow-y-auto p-4">
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
              onKeyDown={(e) => {
                if (e.key === "+" || e.key === "-") {
                  e.preventDefault();
                }
              }}
            />
            <Autocomplete
              onLoad={(autocomplete) =>
                (autocompleteRef.current = autocomplete)
              }
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
              inputProps={{
                min: new Date().toISOString().split("T")[0], // Sets min to today's date
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
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <div className="flex space-x-2 mt-2">
              {postDetails.imageFiles.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt="Preview"
                    className="h-16 w-16 object-cover rounded border"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-1"
                    onClick={() => removeImage(index)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <div>Loading Google Maps...</div>
  );
}

export default Post;
