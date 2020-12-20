import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import moment from 'moment';
//const url = 'http://localhost:3200/food/diary?date=';
//const url = (date,userId)=>`http://ec2-54-86-134-25.compute-1.amazonaws.com:3200/diary/list?date=${date}&userId=${userId}`;
//const url = (date,userId)=>`http://localhost:3500/diary/remove?date=${date}&userId=${userId}`;
const url = (date,userId)=>`http://ec2-54-86-134-25.compute-1.amazonaws.com:3200/diary/remove?date=${date}&userId=${userId}`;

const SAVE_DATE_FORMAT = 'MMDDYYYY';

export const clearDiary = (date, userId) => {

    const currentDate = moment().format(SAVE_DATE_FORMAT);
    const requestUrl = url(currentDate,userId);
    return from(
        
        Axios.get(requestUrl)
            .pipe(
                map(diary=>diary.data),
                catchError(err => of(err))
            )
    )
}

