import React, { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import { config } from '../../../config/config';
import { isAuth, getAuthToken } from '../../../_helpers/isAuth';
import './Messages.css';

export const Messages = ({ history }) => {
  if (!isAuth()) history.push('/login');
  const [tab, setTab] = useState('all');
  const [msgList, setMsgList] = useState([]);
  const [chosenMsg, setChosenMsg] = useState({});

  const onClickMessageList = (e) => {
    e.preventDefault();
    const messages = e.currentTarget.childNodes;

    for (let msg of messages) {
      msg.classList.remove('active-message');
    }
  };

  const onClickMessage = (e, postId) => {
    e.preventDefault();
    const messages = e.currentTarget;
    setTimeout(() => {
      messages.classList.add('active-message');
    }, 0);

    if (msgList.length)
      setChosenMsg(msgList.length && msgList.find(({ id }) => id === postId));
  };

  const fetchMessages = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Auth-token': getAuthToken(),
      },
    };
    fetch(config.messages + `?type=${tab}`, requestOptions)
      .then((res) => res.json())
      .then((res) => {
        setChosenMsg(res[0]);
        setMsgList([]);
        setMsgList(res);
      })
      .catch((err) => console.log(err));
  };

  const onClickDelete = () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Auth-token': getAuthToken(),
      },
    };
    fetch(config.messageDelete + `/${chosenMsg.id}`, requestOptions)
      .then((res) => res.json())
      .then(fetchMessages)
      .catch((err) => console.log(err));
  };

  const onClickArchive = () => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Auth-token': getAuthToken(),
      },
    };
    fetch(
      config.messageArchive +
        `?id=${chosenMsg.id}&isArchive=${!chosenMsg.isArchive}`,
      requestOptions
    )
      .then((res) => res.json())
      .then(fetchMessages)
      .catch((err) => console.log(err));
  };
  
  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line
  }, [tab]);

  return (
    <div className='messages'>
      <div className='messages-list'>
        <div className='message-tab'>
          <Button
            variant='contained'
            className='tab'
            color='primary'
            onClick={() => setTab('all')}
          >
            All
          </Button>
          <Button
            variant='contained'
            className='tab'
            color='primary'
            onClick={() => setTab('archive')}
          >
            Archive
          </Button>
        </div>
        <ul
          className='message-list-content'
          onClick={(e) => onClickMessageList(e)}
        >
          {msgList.length ? (
            msgList.map(({ context, id, createdAt }, i) => {
              return (
                <li
                  key={id}
                  className={`single-message-list ${
                    i === 0 ? 'active-message' : ''
                  }`}
                  onClick={(e) => onClickMessage(e, id)}
                >
                  <div className='sender-detail'>
                    <span className='sender'>Guest</span>
                    <span className='time'>
                      {createdAt && createdAt.split('T')[0]}
                    </span>
                  </div>
                  <p className='sender-message'>
                    {context.length > 30
                      ? context.substring(0, 30) + '...'
                      : context}
                  </p>
                </li>
              );
            })
          ) : (
            <span>No messages</span>
          )}
        </ul>
      </div>
      <div className='messages-content'>
        {chosenMsg && (
          <>
            <div className='messages-content-details'>
              <div className='message-content-sender'>
                <span>
                  <b>Sender: </b>Guest
                </span>
              </div>
              <div className='message-content-time'>
                <span>
                  <b>Time: </b>
                  {chosenMsg.createdAt &&
                    chosenMsg.createdAt.split('T')[0] +
                      ' ' +
                      chosenMsg.createdAt.split('T')[1].split('.')[0]}
                </span>
              </div>
            </div>
            <span>Message</span>
            <div className='message'>
              {chosenMsg.context && chosenMsg.context}
            </div>
            <Button
              color='primary'
              variant='outlined'
              onClick={() => history.push(`/post/${chosenMsg.propertyId}`)}
            >
              Go to post
            </Button>

            <div className='message-content-actions'>
              <Button
                onClick={onClickArchive}
                variant='contained'
                color='primary'
              >
                {chosenMsg.isArchive ? 'UnArchive' : 'Archive'}
              </Button>
              <Button
                onClick={onClickDelete}
                style={{ backgroundColor: 'rgb(255, 0, 0)', color: 'white' }}
                color='primary'
                variant='contained'
              >
                Delete
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
