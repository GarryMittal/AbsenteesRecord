import React, { useState } from 'react';
import "./Form.css";

import "./Success";




const Form = () => {
  const [error, setError] = useState(false);
  const [radioError, setRadioError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    let hasEmptyFields = false;
    for (let value of formData.values()) {
      if (value.trim() === '') {
        hasEmptyFields = true;
        break;
      }
    }

    const informedRadio = formData.get('Informed');
    if (!informedRadio) {
      setRadioError(true);
    } else {
      setRadioError(false);
    }

    if (hasEmptyFields || !informedRadio) {
      setError(true);
    } else {
      setError(false);
      try {
        const response = await fetch(
          'https://script.google.com/macros/s/AKfycbyd-lHnOmkSHOY00-CHpJUq7CxGzLxPWBARjM4tBgvtNnujAGD33pX1FQ6lKDZm4uyC/exec',
          {
            method: 'POST',
            body: formData,
          }
        );
        if (response.ok) {
          console.log('Fetch successful');
          setSubmitted(true);
          const btn = document.querySelector('button');
          btn.disabled = true;


        } else {
          console.log('Fetch failed with status:', response.status);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    }
  };
  return (
    <form class="form-labels-on-top" onSubmit={(e) => handleSubmit(e)}>
      <div class="form-title-row">
        <h1>Please Fill Absentees</h1>
      </div>

      {error && (
        <div className="form-row error-message">
          <h3>Please fill in all required fields before submitting.</h3>
        </div>
      )}

      {radioError && (
        <div className="form-row error-message">
          <h3>Please select an option for "Informed" before submitting.</h3>
        </div>
      )}

      {submitted && (
        <div className="form-row error-message">
        <h3>Form Submitted Successfully.Thanks !</h3>
      </div>
      )}
      <div class="form-row">
        <label>
          <span>Date Reported:</span>
          <input placeholder="Date Reported" name="Date_Reported" type="date" />
        </label>
      </div>

      <div class="form-row">
        <label>
          <span>Class Date:</span>
          <input placeholder="Class Date" name="Class_Date" type="date" />
        </label>
      </div>

      <div class="form-row">
        <label>
          <span>Student Name:</span>
          <input placeholder="Student Name" name="Student_Name" type="text" />
        </label>
      </div>


      <div class="form-row">
        <label><span>Informed</span></label>

        <div class="form-radio-buttons">

          <div>
            <label>
              <input name="Informed" value="yes" type="radio" />
              <span>Yes</span>
            </label>
          </div>


          <div>
            <label>
              <input name="Informed" value="no" type="radio" />
              <span>No</span>
            </label>
          </div>
        </div>

      </div>

      <div class="form-row">
        <label>
          <span>Modified By:</span>
          <input placeholder="Modified By" name="Modified_By" type="text" />
        </label>
      </div>

      <div class="form-row">
        <button type="submit">Submit Form</button>
      </div>






    </form>

  );
};

export default Form;