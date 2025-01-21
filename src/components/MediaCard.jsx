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
import { Link } from "react-router-dom";

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
  item
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

  function formatPrice(price) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(price))
  }

  const [flag, setFlag] = React.useState(true);

  const handleClick = () => {
    setFlag(!flag);
  };

  return (
    <Card
      sx={{
        maxWidth: "50%",
        minWidth: "50%",
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
      <CardMedia sx={{ height: 200 }} image={item.image_url} title="item card" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.name} - {formatPrice(item.price)}
        </Typography>
        <Typography variant="subtitle1">Posted by: {item.username}</Typography>
        <Typography variant="body2">{item.description}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          onClick={handleClick}
          variant="contained"
          color={flag ? "default" : "error"}
          aria-label="add to favorites"
        >
          <FavoriteIcon className="hover:text-red-600" />
        </IconButton>
        <Link to="/inbox" state={{ item: item }}>
          <Button size="small" className="hover:font-bold">
            Message
          </Button>
        </Link>
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
          {/* <Typography variant="body2" color="text.secondary">
            <strong>Sell By:</strong> {sellby_date}
          </Typography> */}
          {item.date_sold && (
            <Typography variant="body2" color="text.secondary">
              <strong>Date Sold:</strong> {item.date_sold}
            </Typography>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}
