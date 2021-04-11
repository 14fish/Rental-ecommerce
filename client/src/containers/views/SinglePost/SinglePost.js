import React, { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import Grid from '@material-ui/core/Grid';
import { Button } from '@material-ui/core';
import { Spinner } from '../../../components';
import { config } from '../../../config/config.js';
import { getAuthToken } from '../../../_helpers/isAuth';
import 'react-image-gallery/styles/css/image-gallery.css';
import './SinglePost.css';

export const SinglePost = ({ history }) => {
  const postId = history.location.pathname.split('/')[2];
  const [images, setImages] = useState([]);
  const [postData, setPostData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [msgErr, setMsgErr] = useState(false);
  const [msgSuccess, setMsgSuccess] = useState(false);

  useEffect(() => {
    fetch(config.getSinglePost + `/id/${postId}`, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        if (!res) {
          history.push('/');
        }
        setPostData(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      })
      .catch(() => history.push('/'));
  }, [postId]);

  const {
    id,
    UserId,
    category,
    createdAt,
    description,
    feature,
    isArchive,
    isUnderOffer,
    location,
    price,
    title,
    updatedAt,
  } = !isLoading && postData;

  useEffect(() => {
    if (postData) {
      const { imageURL, UserId } = postData;
      let imgArr = imageURL.split(';');
      for (let img of imgArr) {
        if (img) {
          setImages((prev) => [
            ...prev,
            {
              original: `http://localhost:5000/static/${UserId}/${img}`,
              thumbnail: `http://localhost:5000/static/${UserId}/${img}`,
            },
          ]);
        }
      }
    }
  }, [postData]);

  const onClickSendMessage = () => {
    setMsgSuccess(false);

    const requestOptions = {
      method: 'POST',
      headers: {
        'Auth-token': getAuthToken(),
      },
    };

    fetch(
      config.sendMessage + `?propertyId=${postId}&context=${message}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        setMsgSuccess(true);
        setMsgErr(false);
      })
      .catch((err) => {
        console.log(err);
        setMsgSuccess(false);
        setMsgErr(true);
      });
  };

  return isLoading ? (
    <div className='spinner-container'>
      <Spinner />
    </div>
  ) : (
    <div className='single-post-container' key={id} user-id={UserId}>
      <Grid container spacing={5}>
        <Grid container item xs={12} md={12} lg={5} xl={5} alignItems="baseline">
          {images.length ? (
            <div className='img-gallery-container'>
              <ImageGallery items={images} />
            </div>
          ) : (
            ''
          )}
          <div className='single-post-price'>
            <div className='single-post-price-inner-price'>{price}</div>
          </div>
        </Grid>
        <Grid container item xs={12} md={12} lg={7} xl={7}>
          <div className='single-post-detail'>
            <div className='post-title'>
              <span>{title.toUpperCase()}</span>
            </div>
            <hr />
            <div className='post-detail'>
              <span className='detail-text'>Category: </span>
              <span>{category}</span>
            </div>
            <div className='post-detail'>
              <span className='detail-text'>Features: </span>
              <span>{feature}</span>
            </div>
            <div className='post-detail'>
              <span className='detail-text'>Location: </span>
              <span>{location}</span>
            </div>
            <div className='post-detail'>
              <span className='detail-text'>Created at: </span>
              <span>{createdAt && createdAt.split('T')[0]}</span>
            </div>
            {description && (
              <div className='post-detail'>
                <span className='detail-text'>Description: </span>
                <span>{description}</span>
              </div>
            )}

            {createdAt &&
              updatedAt &&
              createdAt.split('T')[0] !== updatedAt.split('T')[0] && (
                <div className='post-detail'>
                  <span className='detail-text'>Updated at: </span>
                  <span>{updatedAt.split('T')[0]}</span>
                </div>
              )}
            <hr />
            <div className='post-contact-seller'>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className='contact-seller-message'
                cols='30'
                rows='10'
                disabled={msgSuccess}
              />
              <Button
                onClick={onClickSendMessage}
                disabled={msgSuccess}
                className='contact-seller-btn'
              >
                Contact Seller
              </Button>
            </div>
            {msgSuccess && (
              <b style={{ color: 'green', marginBottom: '10px' }}>
                Successfully sent
              </b>
            )}
            {msgErr && (
              <b style={{ color: 'red', marginBottom: '10px' }}>
                Something is wrong. Try again later
              </b>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
