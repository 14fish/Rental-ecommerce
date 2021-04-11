import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { isAuth, getAuthToken } from '../../_helpers/isAuth.js';
import { Link } from 'react-router-dom';
import { config } from '../../config/config';
import './Post.css';

const useStyles = makeStyles({
  root: {
    width: 300,
    marginBottom: 20,
    border: '1px solid #a78b81',
    boxShadow: '0px 0px 10px 0px rgba(167,139,129,1)',
    '&:hover': {
      boxShadow: '0px 0px 0px 0px rgba(167,139,129,1)',
    },
  },
  media: {
    height: 150,
  },
  cardAction: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  category: {
    marginBottom: 10,
  },
  location: {
    marginTop: 10,
  },
});

export const Post = (props) => {
  const classes = useStyles();
  const {
    postId,
    userId,
    img,
    categories,
    title,
    features,
    price,
    isUnderOffer,
    location,
    history,
  } = props;

  let imgArr = img.split(';');

  const onClickDeletePost = () => {
    setTimeout(() => {
      history.push('/');
    }, 0);
    fetch(config.postDelete + `/${postId}`, {
      method: 'POST',
      headers: {
        'Auth-token': getAuthToken(),
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className='post-container'>
      <Link
        to={`post/${postId}`}
        style={{ textDecoration: 'none' }}
      >
        <Card className={classes.root} key={postId} user-id={userId}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={`http://localhost:5000/static/${userId}/${imgArr[0]}`}
              title='Property Advertisement'
            />
            <CardContent>
              <Typography gutterBottom variant='h5' component='h2'>
                {title}
              </Typography>
              <Typography
                className={classes.category}
                variant='body2'
                color='textPrimary'
                component='span'
              >
                {categories &&
                  categories.toString().charAt(0).toUpperCase() +
                    categories.toString().slice(1)}
              </Typography>
              <Typography variant='body2' color='textPrimary' component='span'>
                {' '}
                |{' '}
              </Typography>
              <Typography variant='body2' color='textPrimary' component='span'>
                {features &&
                  features.toString().charAt(0).toUpperCase() +
                    features.toString().slice(1)}
              </Typography>
              <Typography
                className={classes.location}
                variant='subtitle2'
                color='textSecondary'
                component='p'
              >
                {location}
              </Typography>
            </CardContent>
          </CardActionArea>
          {isAuth() && history.location.pathname === '/profile' ? (
            <CardActions>
              <div className='auth-post-action'>
                <Button
                  color='primary'
                  variant='contained'
                  className='edit-btn'
                  onClick={() => {
                    setTimeout(() => {
                      history.push(`/post-edit/${postId}`);
                    }, 0);
                  }}
                >
                  Edit
                </Button>
                <Button className='delete-btn' onClick={onClickDeletePost}>
                  Delete
                </Button>
              </div>
            </CardActions>
          ) : (
            <CardActions className={classes.cardAction}>
              <Button size='small' color='primary'>
                {isUnderOffer ? 'Under Offer' : 'Learn more'}
              </Button>
              <Button size='small' color='primary'>
                {price}
              </Button>
            </CardActions>
          )}
        </Card>
      </Link>
    </div>
  );
};
