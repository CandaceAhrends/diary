import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import moment from 'moment';

const url = (date,userId)=>`http://35.221.47.246:3200/diary/list?date=${date}&userId=${userId}`;
//const url = (date,userId)=>`http://localhost:3200/diary/list?date=${date}&userId=${userId}`;

const SAVE_DATE_FORMAT = 'MMDDYYYY';

export const getDiaryForDate = (date, userId) => {

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

