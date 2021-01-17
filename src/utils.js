import moment from 'moment';
const DIARY_STATE = 'diarystate';
const SAVE_DATE_FORMAT = 'MMDDYYYY';

export const getcurrentDate = () => {

        return moment().format(SAVE_DATE_FORMAT);
}

export const stripIphoneQuotes = text => {
        return text.replace(/[\u2018\u2019\u201C\u201D]/g, (c) => '\'\'""'.substr('\u2018\u2019\u201C\u201D'.indexOf(c), 1));

}
export const inputValidator = (text = stripIphoneQuotes(text)) => {
        const INVALID_CHAR_ERROR = "Invalid characters used";
        const INVALID_LEN_ERROR = "Enter at least 3 characters";
        const MIN_CHAR_SIZE = 3;

        const isValidChar = /^[a-zA-Z0-9‘’'_.-\s]+$/.test(text);
        const isValidLen = text.length >= MIN_CHAR_SIZE;
        if (!isValidLen) {
                return (INVALID_LEN_ERROR);
        }
        else if (!isValidChar) {
                return (INVALID_CHAR_ERROR);
        }


};

export const addElipses = (text, maxLength = 10) => {
        console.log(text.length, String(text).length, `${text}`)
        if (String(text).length > maxLength) {
                return `${text.slice(0, maxLength)}...`;
        }

        return text;
}

export const stripAllAfterFirstComma = text => {
        const comma = text.indexOf(",");
        return comma > 0 ? text.slice(0, comma) : text;

}
export const stripAllBeforeFirstComma = text => {
        const comma = text.indexOf(",");
        return comma > 0 ? text.slice(comma + 1) : '';
}

export const stripUnwantedChars = description => {
        return description ? description.replace(/[^\w\s]/g, '') : '';
}
export const saveSessionData = sessionData => {
        window.sessionStorage.setItem(DIARY_STATE, JSON.stringify(sessionData));
}
export const getSessionData = () => {
        return JSON.parse(window.sessionStorage.getItem(DIARY_STATE));
}

