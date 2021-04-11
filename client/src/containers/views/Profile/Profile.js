import React, { useState, useEffect } from 'react';
import { ProfileInfo } from '../../../components';
import Grid from '@material-ui/core/Grid';
import { CustomCheckbox } from '../../../_helpers/customCheckBox.js';
import ReactPaginate from 'react-paginate';
import { getAuthToken, isAuth } from '../../../_helpers/isAuth.js';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Post, Search, Filter } from '../../../components';
import { Spinner } from '../../../components';
import { config } from '../../../config/config.js';
import './Profile.css';

export const Profile = ({ history }) => {
  if (!isAuth()) history.push('/login');

  // user property
  const [searchKeyword, setSearchKeyword] = useState('');
  const [chosenCategory, setChosenCategory] = useState('');
  const [chosenFeature, setChosenFeature] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isPostDataLoading, setIsPostDataLoading] = useState(true);
  const [userProperty, setUserProperty] = useState();
  const [highPriority, setHighPriority] = useState(false);

  // user profile info
  const [userData, setUserData] = useState({});
  const [shouldMakeRequest, setShouldMakeRequest] = useState(true);
  const [isLoading, setIsloading] = useState(true);

  const [err, setErr] = useState(false);

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Auth-token': getAuthToken(),
      },
    };

    setIsPostDataLoading(true);
    fetch(
      config.userProperties +
        `?page=${currentPage}&keyword=${searchKeyword}&category=${chosenCategory}&feature=${chosenFeature}&highPriority=${highPriority}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((res) => {
        setUserProperty(res);
        setTimeout(() => {
          setIsPostDataLoading(false);
        }, 500);
      })
      .catch((err) => setErr(err));
  }, [searchKeyword, chosenCategory, chosenFeature, currentPage, highPriority]);

  const getUserProfileData = () => {
    if (isAuth()) {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Auth-token': getAuthToken(),
        },
      };

      // get name, surname, email
      fetch(config.userInfo, requestOptions)
        .then((res) => {
          setTimeout(() => {
            setIsloading(false);
          }, 1000);
          if (!res.ok) {
            setErr(true);
            setTimeout(() => {
              localStorage.removeItem('we_sell_houses_auth');
              history.push('/login');
            }, 2000);
          }
          return res.json();
        })
        .then((res) => {
          setUserData(res);
        })
        .catch((err) => setErr(err));
    }

    setShouldMakeRequest(false);
  };

  useEffect(() => {
    shouldMakeRequest && getUserProfileData();
  }, []);

  return isLoading ? (
    <div className='spinner-container'>
      <Spinner />
    </div>
  ) : err ? (
    <div className='err-msg msg'>Something went wrong. Try again</div>
  ) : (
    <div className='profile-container'>
      <Search setSearchKeyword={setSearchKeyword} />
      <div className='vertical-line'></div>
      <Grid container>
        <Grid
          container
          item
          xs={12}
          md={12}
          lg={2}
          xl={2}
          alignContent='flex-start'
        >
          <ProfileInfo userData={userData} />
          <FormControlLabel
            control={
              <CustomCheckbox
                checked={highPriority}
                onChange={(e) => setHighPriority(e.target.checked)}
                name='highPriority'
              />
            }
            label={'High Priority'}
            className='high-priority'
          />
          <Filter
            setChosenCategory={setChosenCategory}
            setChosenFeature={setChosenFeature}
          />
        </Grid>
        <Grid container item xs={12} md={12} lg={10} xl={10}>
          <Grid container>
            {isPostDataLoading ? (
              <div className='spinner-container'>
                <Spinner />
              </div>
            ) : (
              userProperty &&
              userProperty.rows &&
              userProperty.rows.map((property) => {
                return (
                  <Grid
                    container
                    item
                    xs={12}
                    md={6}
                    lg={4}
                    xl={4}
                    justify='center'
                    key={property.id}
                  >
                    <Post
                      key={property.id}
                      postId={property.id}
                      userId={property.UserId}
                      title={property.title}
                      price={property.price}
                      img={property.imageURL}
                      categories={property.category}
                      features={property.feature}
                      location={property.location}
                      isUnderOffer={property.isUnderOffer}
                      history={history}
                    />
                  </Grid>
                );
              })
            )}
          </Grid>
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            breakLabel={'...'}
            breakClassName={'break-me'}
            pageCount={(userProperty && userProperty.count / 12) || 1}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={(e) => setCurrentPage(e.selected + 1)}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
          />
        </Grid>
      </Grid>
    </div>
  );
};
