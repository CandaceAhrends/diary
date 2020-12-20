import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
const url = 'http://ec2-54-86-134-25.compute-1.amazonaws.com:3200/diary/save';
//const url = 'http://localhost:3500/diary/save'
const saveFood = foodItem => {
console.log("save food to diary", foodItem);

    return from(
        Axios.post(url, { foodItem})
            .pipe(
                catchError(err => of(err))
            )
    )
}

export default saveFood;