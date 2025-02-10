import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import { useAuth } from "../services/auth";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import MapsUgcIcon from "@mui/icons-material/MapsUgc";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function MediaCard({ item, size, onDelete, onMarkerClick, allowStatusChange, onProfile = false}) {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [itemStatus, setItemStatus] = useState(item.status);

  useEffect(() => {
    setItemStatus(item.status);
  }, [item]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDeletePost = async () => {
    if (!user) return;
    try {
      await axios.post("https://deleteuserpost-jbhycjd2za-uc.a.run.app", {
        user_id: user.uid,
        item_id: item.item_id,
      });
      onDelete(item.item_id);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  function formatDate(inputDate) {
    if (!inputDate) return "N/A";
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price));
  }

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const res = await axios.post(
          "https://checkfavoritestatus-jbhycjd2za-uc.a.run.app",
          { user_id: user.uid, item_id: item.item_id },
          { headers: { "Content-Type": "application/json" } }
        );
        setIsFavorite(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoriteStatus();
  }, [user, item.item_id]);

  const handleFavoriteToggle = async () => {
    if (!user) return;
    try {
      if (isFavorite) {
        await axios.delete(
          "https://removeuserfavorite-jbhycjd2za-uc.a.run.app",
          {
            data: { user_id: user.uid, item_id: item.item_id },
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        await axios.post(
          "https://adduserfavorite-jbhycjd2za-uc.a.run.app",
          { user_id: user.uid, item_id: item.item_id },
          { headers: { "Content-Type": "application/json" } }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setItemStatus(newStatus);
    try {
      await axios.post(
        "https://changeitemstatus-jbhycjd2za-uc.a.run.app",
        {
          item_id: item.item_id,
          status: newStatus,
        },
        { headers: { "Content-Type": "application/json" } }
      );
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status.");
      setItemStatus(item.status);
    }
  };

  const location = useLocation();
  const isMapPage = location.pathname === "/";
  const handleMapMediaCardMarkerFLink = () => {
    if (isMapPage && onMarkerClick) {
      onMarkerClick(item.item_id);
    }
  };

  if (loading) {
    return (
      <Card
        sx={{
          maxWidth: `${size}%`,
          minWidth: `${size}%`,
          maxHeight: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#E6DFF1",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Card>
    );
  }

  return (
    <Card
      sx={{
        maxWidth: `${size}%`,
        minWidth: `${size}%`,
        maxHeight: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        backgroundColor: "#E6DFF1",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#c0afdc",
        },
      }}
      onClick={handleMapMediaCardMarkerFLink}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          sx={{ height: 200 }}
          image={item.image_urls ? item.image_urls[0] : item.image_url}
          title="item card"
        />
        {itemStatus === "SOLD" && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              transform: "translateY(-50%)",
              backgroundColor: "rgba(110, 110, 110, 0.60)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "65px",
              fontWeight: "bold",
              fontSize: "1.7rem",
            }}
          >
            SOLD
          </Box>
        )}
        {itemStatus === "PENDING" && (
          <Box
            sx={{
              position: "absolute",
              top: 8,
              left: 8,
              backgroundColor: "rgb(255, 70, 70)",
              color: "#fff",
              padding: "4px 8px",
              borderRadius: "4px",
              fontWeight: "bold",
            }}
          >
            Pending
          </Box>
        )}
      </Box>
      <CardContent>
        <Typography variant="h5" className="font-bold">{item.name}</Typography>
        <Typography variant="h6" className="font-medium">{formatPrice(item.price)}</Typography>
        <Typography variant="body2" className="text-gray-600">
          Posted by: {item.username}
        </Typography>
        <Typography variant="body1" className="mt-2">
          {item.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing className="mt-auto">
        {!onProfile && (
          <IconButton
            onClick={handleFavoriteToggle}
            variant="contained"
            color={isFavorite ? "error" : "default"}
            aria-label="add to favorites"
          >
            <FavoriteIcon className={isFavorite ? "text-red-600" : ""} />
          </IconButton>
        )}
        {!onProfile && (
          <Link to="/inbox" state={{ item: item }}>
            <IconButton aria-label="go to inbox">
              <MapsUgcIcon />
            </IconButton>
          </Link>
        )}
        {onDelete && (
          <IconButton
            onClick={handleDeletePost}
            aria-label="delete post"
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <DeleteIcon />
          </IconButton>
        )}
        {allowStatusChange && (
          <FormControl variant="outlined" size="small" sx={{ minWidth: 120, ml: 1 }}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status-select"
            value={itemStatus}
            onChange={handleStatusChange}
            label="Status"
          >
            <MenuItem value="FOR_SALE">For Sale</MenuItem>
            <MenuItem value="SOLD">Sold</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
          </Select>
        </FormControl>
        )}
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            <strong>Date Posted:</strong> {formatDate(item.date_posted)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Category:</strong> {item.category || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Sell by:</strong> {formatDate(item.date_sellby) || "N/A"}
          </Typography>
          {item.date_sold && (
            <Typography variant="body2" color="text.secondary">
              <strong>Date Sold:</strong> {formatDate(item.date_sold)}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
