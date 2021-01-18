import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce, timeout } from "rxjs/operators";
const url = 'http://35.221.47.246:3200/diary/save';
//const url = 'http://localhost:3500/diary/save'
const saveFood = activity => {
    console.log("save food to diary", activity);

    return from(
        Axios.post(url, { activity })
            .pipe(

                catchError(err => of(err))
            )
    )
}

export default saveFood;