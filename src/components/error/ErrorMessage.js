
import React from 'react';
import classNames from 'classnames';
import './errorMessage.scss';

export const ErrorMessage = ({ errorMessage , hasError }) => {
    var errorClasses = classNames({
        'error-msg': true,
        'error': true,
        'hide': !hasError,
        'show': hasError
      });
    return <label className={errorClasses} 
    onClick={() => setShowError(false)}>{errorMessage}</label>
}