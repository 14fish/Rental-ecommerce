import React, { useEffect, useState } from 'react';
import { AdForm } from '../../../components/AdForm';
import { config } from '../../../config/config.js';
import { Spinner } from '../../../components';
import { isAuth, getAuthToken } from '../../../_helpers/isAuth.js';
import './NewAd.css';

export const NewAd = ({ history }) => {
  if (!isAuth()) history.push('/login');

  const [data, setData] = useState({val: null, makeReq: false});
  const [isLoading, setIsloading] = useState(false);
  const [err, setErr] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (data.makeReq) {
      setIsloading(true);
      const {
        UserId,
        category,
        description,
        feature,
        imageURL,
        isArchive,
        isUnderOffer,
        location,
        price,
        title,
      } = data.val;

      let formData = new FormData();

      for (let img of imageURL) {
        formData.append('photos', img);
      }

      const requestOptions = {
        method: 'POST',
        headers: {
          'Auth-token': getAuthToken(),
        },
        body: formData,
      };

      fetch(
        config.addNewProperty +
          `?title=${title}&price=$${price}&location=${location}&description=${description}&category=${category}&feature=${feature}`,
        requestOptions
      ).then((res) => {
        setTimeout(() => {
          setIsloading(false);

          if (res.ok) {
            setSuccess(true);
            console.log(res);

            setTimeout(() => {
              history.push('/');
            }, 1500);
          } else {
            setErr(true);
            console.log(res);
            setTimeout(() => {
              history.push('/');
            }, 1500);
          }
        }, 1000);
      });
    }
    console.log(data);
  }, [data]);

  return isLoading ? (
    <div className='spinner-container'>
      <Spinner />
    </div>
  ) : err ? (
    <div> There's a error try again. Redirecting to home page...</div>
  ) : success ? (
    <div> Successfully created!. Redirecting to home page...</div>
  ) : (
    <AdForm editable={false} setData={setData} />
  );
};
