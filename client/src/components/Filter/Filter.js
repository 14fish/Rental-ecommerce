import React, { useEffect, useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { CustomCheckbox } from '../../_helpers/customCheckBox.js';
import RadioGroup from '@material-ui/core/RadioGroup';
import { CustomRadioButton } from '../../_helpers/customRadioButton.js';
import './Filter.css';

const getDynamicState = (arr) => {
  let obj = {};
  arr.map(({ value }) => (obj[value] = false));
  return obj;
};

const getChosenFilter = (state) => {
  let chosenArr = [];
  let keys = Object.keys(state);

  for (let el of keys) {
    if (state[el] === true) chosenArr.push(el);
  }

  return chosenArr.toString();
};

const categoryArr = [
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

const featureArr = [
  {
    value: '1_room',
    label: '1 room',
  },
  {
    value: '2_rooms',
    label: '2 rooms',
  },
  {
    value: '3_rooms',
    label: '3 rooms',
  },
  {
    value: '4_or_more_rooms',
    label: '4 or more rooms',
  },
];

export const Filter = ({ setChosenFeature, setChosenCategory }) => {
  const [categories, setCategories] = useState('');
  const [features, setFeatures] = useState(getDynamicState(featureArr));

  useEffect(() => {
    setChosenCategory(categories);
  }, [categories]);

  useEffect(() => {
    setChosenFeature(getChosenFilter(features));
  }, [features]);

  return (
    <div className='filter-container'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <RadioGroup
          aria-label='category'
          name='Category'
          value={categories}
          className='category-filter-container'
          onChange={(e) => setCategories(e.target.value)}
        >
          {categoryArr.map(({ value, label }, i) => {
            return (
              <FormControlLabel
                key={i}
                value={value}
                control={<CustomRadioButton />}
                label={label}
              />
            );
          })}
        </RadioGroup>
      </Accordion>

      {/* Features */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Typography>Features</Typography>
        </AccordionSummary>
        {featureArr.map(({ value, label }, id) => {
          return (
            <AccordionDetails key={id}>
              <Typography>
                <FormControlLabel
                  control={
                    <CustomCheckbox
                      checked={categories[value]}
                      onChange={(e) =>
                        setFeatures(() => {
                          return {
                            ...features,
                            [value]: e.target.checked,
                          };
                        })
                      }
                      name='checkedA'
                    />
                  }
                  label={label}
                />
              </Typography>
            </AccordionDetails>
          );
        })}
      </Accordion>
    </div>
  );
};
