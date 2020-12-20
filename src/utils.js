import moment from 'moment';
console.log("loading utils");
const SAVE_DATE_FORMAT = 'MMDDYYYY';

export const getcurrentDate = ()=>{

        return moment().format(SAVE_DATE_FORMAT);
}

