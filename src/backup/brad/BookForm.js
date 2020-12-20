import React, { useState, useEffect } from "react";
import "./bookform.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import Select from "@material-ui/core/Select";
import moment from 'moment';

const DATE_PKR_FORMAT = 'YYYY-MM-DD';
const BookForm = () => {
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState( {
      pickupDate: new moment().format(DATE_PKR_FORMAT)
  });


  useEffect(() => {
  console.log('new date > ', formData.pickupDate);
    setLoad(true);
  });
  const handleChange = (change) => {};
  return load ? (
    <div className="book-container">
      <nav></nav>
      <div className="content">
        <form class="book-form">
          <ul>
            <li>
              <label for="pickup-date">Pick up When</label>
              <TextField
                id="pickup-date"
                type="date"
                defaultValue={formData.pickupDate}
              />
            </li>
            <li>
              <label for="pickup-date">What Time</label>
              <TextField
                id="time"
                className="brad-timepicker"
                type="time"
                defaultValue="07:30"
                inputProps={{
                  step: 300, // 5 min
                }}
              />
            </li>
            <li>
              <label for="pickup-date">How many Guests</label>
              <Select
                value={10}
                onChange={handleChange}
                displayEmpty
                className="brad-select"
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>One</MenuItem>
                <MenuItem value={20}>Two</MenuItem>
                <MenuItem value={30}>Three</MenuItem>
              </Select>
            </li>
            {/* <li>
            <TextField id="standard-basic"   />
            </li> */}
          </ul>
          <div className="brad-quote-btn">
            <Button className="brad-primary">
              <p>Instant Quote</p>
            </Button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default BookForm;
