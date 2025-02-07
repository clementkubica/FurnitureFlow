import * as React from "react";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
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

export default function MediaCard({ item, size, onDelete, onMarkerClick }) {
  const [expanded, setExpanded] = useState(false);
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isMap, setIsMap] = useState(true);
  const [loading, setLoading] = useState(true);

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
            data: {
              user_id: user.uid,
              item_id: item.item_id,
            },
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        await axios.post(
          "https://adduserfavorite-jbhycjd2za-uc.a.run.app",
          {
            user_id: user.uid,
            item_id: item.item_id,
          },
          { headers: { "Content-Type": "application/json" } }
        );
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite status:", error);
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

  const location = useLocation();
  const isMapPage = location.pathname === "/";
  const handleMapMediaCardMarkerFLink = () => {
    if (isMapPage && onMarkerClick) {
      onMarkerClick(item.item_id);
      console.log("TEST");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: `${size}%`,
        minWidth: `${size}%`,
        maxHeight: "20%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#E6DFF1",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#c0afdc",
        },
      }}
      onClick={handleMapMediaCardMarkerFLink}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={item.image_urls ? item.image_urls[0] : item.image_url} // temp fix
        title="item card"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name} - {formatPrice(item.price)}
        </Typography>
        <Typography variant="subtitle1">Posted by: {item.username}</Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleFavoriteToggle}
          variant="contained"
          color={isFavorite ? "error" : "default"}
          aria-label="add to favorites"
        >
          <FavoriteIcon className={isFavorite ? "text-red-600" : ""} />
        </IconButton>
        <Link to="/inbox" state={{ item: item }}>
          <IconButton className="hover:font-bold" aria-label="go to inbox">
            <MapsUgcIcon />
          </IconButton>
        </Link>
        {onDelete && (
          <IconButton
            onClick={handleDeletePost}
            aria-label="delete post"
            className="ml-auto text-red-500 hover:text-red-700"
          >
            <DeleteIcon />
          </IconButton>
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
