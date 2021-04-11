import React, { useCallback, useEffect } from 'react';
import logo from '../../../assets/img/logo.png';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { isAuth } from '../../../_helpers/isAuth.js';
import { Link } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmailIcon from '@material-ui/icons/Email';
import './Header.css';

export const Header = ({ history }) => {
  const [, updateState] = React.useState();
  const forceUpdate = useCallback(() => updateState({}), []);

  return (
    <div className='header-container'>
      <div className='left'>
        <Link to='/'>
          <img className='logo' src={logo} alt='logo' />
        </Link>
      </div>
      <div className='right'>
        {isAuth() && (
          <>
            <Link to='/new-ad' style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                className='add-new-post'
                color='primary'
              >
                <AddIcon />
              </Button>
            </Link>
            <Link to='/inbox' style={{ textDecoration: 'none' }}>
              <Button
                variant='contained'
                className='add-new-post'
                color='primary'
              >
                <EmailIcon />
              </Button>
            </Link>
          </>
        )}
        <Link to={isAuth() ? '/profile' : '/login'}>
          <Button
            variant='contained'
            color='primary'
            className='profile-logo-container'
          >
            <PermIdentityIcon className='profile-logo' />
          </Button>
        </Link>

        {isAuth() && (
          <Link to='/login'>
            <Button
              variant='contained'
              color='primary'
              className='exit-logo-container'
              onClick={() => {
                localStorage.removeItem('we_sell_houses_auth');
                forceUpdate();
              }}
            >
              <ExitToAppIcon className='exit-logo' />
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};
