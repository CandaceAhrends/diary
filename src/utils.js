import moment from 'moment';

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

export const stripAllAfterFirstComma = text =>{
        const comma = text.indexOf(",");
      return  comma > 0?text.slice( 0, comma):text;

}
export const stripAllBeforeFirstComma = text =>{
        const comma = text.indexOf(",");
        return comma > 0?text.slice(comma+1):'';
}
