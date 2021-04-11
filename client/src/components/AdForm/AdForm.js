import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import './AdForm.css';

const categories = [
  {
    value: 'apartment',
    label: 'Apartment',
  },
  {
    value: 'residence',
    label: 'Residence',
  },
  {
    value: 'villa',
    label: 'Villa',
  },
  {
    value: 'garage',
    label: 'Garage',
  },
];

const features = [
  {
    value: '1 room',
    label: '1 room',
  },
  {
    value: '2 rooms',
    label: '2 rooms',
  },
  {
    value: '3 rooms',
    label: '3 rooms',
  },
  {
    value: '4 or more rooms',
    label: '4 or more rooms',
  },
];

export const AdForm = ({ editable, postData, setData }) => {
  const [media, setMedia] = useState([]);

  const {
    id,
    UserId,
    category,
    description,
    feature,
    imageURL,
    isArchive,
    isUnderOffer,
    highPriority,
    location,
    price,
    title,
  } = editable && postData.val;

  return (
    <div className='form-container'>
      <h1 className='new-ad-title'>
        {editable ? 'Edit Property' : 'Add new property'}
      </h1>
      <Formik
        initialValues={{
          title: title || '',
          price: price || '',
          location: location || '',
          category: category || 'apartment',
          feature: feature || '1 room',
          imageURL: imageURL || [],
          isUnderOffer: isUnderOffer || false,
          isArchive: isArchive || false,
          highPriority: highPriority || false,
          description: description || '',
        }}
        validate={({ title, price, location }) => {
          const errors = {};
          if (!price) {
            errors.price = 'Required';
          }
          if (!title) {
            errors.title = 'Required';
          }
          if (!location) {
            errors.location = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setData({val: {...values, imageURL: media, postId: id }, makeReq: true });
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form>
            <Field
              component={TextField}
              name='title'
              type='text'
              label='Title'
              className={'add-input'}
            />
            <br />
            <Field
              component={TextField}
              type='text'
              label='Price'
              name='price'
              className={'add-input'}
            />
            <br />
            <Field
              component={TextField}
              type='text'
              label='Location'
              name='location'
              className={'add-input'}
            />
            <br />
            <Field
              component={TextField}
              type='text'
              name='category'
              label='Category'
              select
              variant='standard'
              helperText='Please select category'
              margin='normal'
              className={'add-input'}
            >
              {categories.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
            <br />
            <Field
              component={TextField}
              type='text'
              name='feature'
              label='Feature'
              select
              variant='standard'
              helperText='Please select feature'
              margin='normal'
              className={'add-input'}
            >
              {features.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Field>
            <br />
            <DropzoneArea
              className={'add-input'}
              value={media}
              initialFiles={
                editable && 
                typeof imageURL === "string" &&
                imageURL.split(';').slice(0, -1).map(img => `http://localhost:5000/static/${UserId}/${img}`)}
              filesLimit={10}
              onChange={(e) => setMedia(e)}
            />
            <br />
            {editable && (
              <div className='form-checkbox-container'>
                <label className={'add-input checkbox'}>
                  <Field type='checkbox' name='isUnderOffer' />
                  Under Offer
                </label>
                <label className={'add-input checkbox'}>
                  <Field type='checkbox' name='isArchive' />
                  Archive Ad
                </label>
                <label className={'add-input checkbox'}>
                  <Field type='checkbox' name='highPriority' />
                  High Priority
                </label>
              </div>
            )}
            <br />
            <Field
              component={'textarea'}
              type='text'
              label='Description'
              name='description'
              rows={10}
              className={'add-input add-textarea'}
              placeholder={'Description'}
            />
            <br />
            <Button
              variant='contained'
              color='primary'
              disabled={isSubmitting}
              onClick={submitForm}
              className={'add-input add-btn'}
            >
              {editable ? 'Update' : 'Add'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
