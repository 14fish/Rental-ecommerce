import React, { useEffect, useState } from 'react';
import { AdForm, Spinner } from '../../../components';
import { connect } from 'react-redux';
import { propertyActions } from '../../../actions/property.actions';
import { isAuth, getAuthToken } from '../../../_helpers/isAuth';
import { config } from '../../../config/config';
import './EditAd.css';

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSinglePost: (id) => dispatch(propertyActions.getSinglePost(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    postData: state.property.singlePost,
  };
};

export const EditAd = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ history, fetchSinglePost, postData }) => {
  if (!isAuth()) history.push('/login');
  const postId = history.location.pathname.split('/')[2];
  const [data, setData] = useState({ val: null, makeReq: false });
  const [isFetchingDone, setIsFetchingDone] = useState(false);

  const isObjEmpty = (obj) => Object.keys(obj).length === 0;

  useEffect(() => {
    setIsFetchingDone(false);
    setData({ val: null, makeReq: false });
    fetchSinglePost(postId);
  }, [fetchSinglePost, postId]);

  useEffect(() => {
    setIsFetchingDone(false);
    if (!isObjEmpty(postData.data)) {
      setData({ val: postData.data, makeReq: false });
      setIsFetchingDone(true);
    }
  }, [postData]);

  useEffect(() => {
    if (data.makeReq) {
      const {
        postId,
        title,
        price,
        description,
        feature,
        category,
        imageURL,
        isArchive,
        isUnderOffer,
        highPriority,
        location,
      } = data.val;

      let formData = new FormData();

      for (let img of imageURL) {
        formData.append('photos', img);
      }

      const requestOptions = {
        method: 'PUT',
        headers: {
          'Auth-token': getAuthToken(),
        },
        body: formData,
      };

      fetch(
        config.userUpdateProperty +
          `?title=${title}&location=${location}&description=${description}&isArchive=${isArchive}&isUnderOffer=${isUnderOffer}&highPriority=${highPriority}&price=${price}&category=${category}&feature=${feature}&id=${postId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then(() => history.push('/'))
        .catch((err) => console.log(err));
    }
  }, [data]);

  return !isFetchingDone ? (
    <div className='spinner-container'>
      <Spinner />
    </div>
  ) : (
    <AdForm editable postData={data} setData={setData} />
  );
});
