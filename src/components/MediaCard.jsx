import * as React from "react";
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
  name,
  description,
  user,
  price,
  location,
  status,
  date_posted,
  sellby_date,
  date_sold,
  image,
}) {
  const [expanded, setExpanded] = React.useState(false);

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

  return (
    <Card
      sx={{
        maxWidth: "50%",
        minWidth: "50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#E6DFF1",
      }}
    >
      <CardMedia
        sx={{ height: 200 }}
        image={image}
        title="item card"
        // className="w-5000"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} - {price}
        </Typography>
        <Typography variant="subtitle1">Posted by: {user}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon className="hover:text-red-500" />
        </IconButton>
        <Button size="small">Message</Button>
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
          {/* <Typography variant="body2" color="text.secondary">
            <strong>Sell By:</strong> {sellby_date}
          </Typography> */}
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
