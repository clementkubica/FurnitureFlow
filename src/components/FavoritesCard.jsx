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

export default function MediaCard({
  item_id,
  name,
  description,
  user,
  price,
  location,
  status,
  date_posted,
  sellby_date,
  date_sold,
  category,
  image,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const loggedInUser = useAuth();
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [loading, setLoading] = React.useState(true); // Track loading status

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  }

  function formatDateManually(inputDate) {
    if (!inputDate) {
      return "N/A";
    }

    const dateParts = inputDate.split("T")[0].split("-");
    const month = dateParts[1];
    const day = dateParts[2];
    const year = dateParts[0].slice(-2);

    return `${month}/${day}/${year}`;
  }

  useEffect(() => {
    const fetchFavoriteStatus = async () => {
      if (!loggedInUser) {
        console.error("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          "https://checkfavoritestatus-jbhycjd2za-uc.a.run.app",
          { user_id: loggedInUser.user.uid, item_id: item_id },
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
  }, [loggedInUser, item_id]);

  const handleFavoriteToggle = async () => {
    if (!loggedInUser) {
      console.error("User not logged in");
      return;
    }

    try {
      if (isFavorite) {
        await axios.delete(
          "https://removeuserfavorite-jbhycjd2za-uc.a.run.app",
          {
            data: {
              user_id: loggedInUser.user.uid,
              item_id: item_id,
            },
            headers: { "Content-Type": "application/json" },
          }
        );
      } else {
        await axios.post(
          "https://adduserfavorite-jbhycjd2za-uc.a.run.app",
          {
            user_id: loggedInUser.user.uid,
            item_id: item_id,
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
          maxWidth: "25%",
          minWidth: "25%",
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
        maxWidth: "24.55%",
        minWidth: "24.55%",
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
    >
      <CardMedia sx={{ height: 200 }} image={image} title="item card" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} - {price}
        </Typography>
        <Typography variant="subtitle1">Posted by: {user}</Typography>
        <Typography variant="body2">{description}</Typography>
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
        <Button size="small" className="hover:font-bold">
          Message
        </Button>
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
            <strong>Date Posted:</strong> {formatDate(date_posted)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Category: </strong> {category || "N/A"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Sell by: </strong>
            {formatDateManually(sellby_date) || "N/A"}
          </Typography>
          {date_sold && (
            <Typography variant="body2" color="text.secondary">
              <strong>Date Sold:</strong> {date_sold}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
