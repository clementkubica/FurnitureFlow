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
import FavoriteIcon from '@mui/icons-material/Favorite';
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
}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{
      maxWidth: 300,
      minWidth: 300,
      minHeight: 400,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      backgroundColor: "#E6DFF1", 
      height: "100%",
    }}>
      <CardMedia
        sx={{ height: 150, width: 500 }}
        image="https://i5.walmartimages.com/seo/71-25-Modern-Chenille-Sofas-Couches-Living-Room-Deep-Seat-Sofa-Square-Armrest-Removable-Low-Back-Cushion-Detachable-Cover-Easy-Install-Blue_13bd9c8a-56bc-4dd5-89f2-2790e9f981be.7f4e9925e41fe68fbad9b786b7ff4747.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF"
        title="item card"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name} - ${price}
        </Typography>
        <Typography variant="subtitle1">
          Posted by: {user}
        </Typography>
        <Typography variant="body2">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
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
            <strong>Location:</strong> {location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Status:</strong> {status}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Date Posted:</strong> {date_posted}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Sell By:</strong> {sellby_date}
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
