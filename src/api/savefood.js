import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce , timeout} from "rxjs/operators";
const url = 'http://35.221.47.246:3200/diary/save';
//const url = 'http://localhost:3200/diary/save'
const saveFood = foodItem => {
console.log("save food to diary", foodItem);

    return from(
        Axios.post(url, { foodItem})
            .pipe(
                timeout(10000),
                catchError(err => of(err))
            )
    )
}

export default saveFood;