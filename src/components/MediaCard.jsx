import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard({name, description, user, price, location, status, date_posted, sellby_date, date_sold}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 50 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="item card"
      />
      <CardContent className="bg-blue-100">
        <Typography gutterBottom variant="h5" component="div">
          {name} ${price}
        </Typography>
        <Typography gutterBottom variant="h4" component="div">
          Posted By: {user}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Message</Button>
        {/*<Button size="small">Learn More</Button>*/}
      </CardActions>
    </Card>
  );
}