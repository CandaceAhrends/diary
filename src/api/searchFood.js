import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
//const fsDatabaseUrl = 'http://localhost:3300/fs/search?query=';
//const usdaUrl = 'http://localhost:3300/usda/search?query=';
const usdaUrl = 'http://ec2-54-86-134-25.compute-1.amazonaws.com:3000/usda/search?query=';
const fsDatabaseUrl = 'http://ec2-54-86-134-25.compute-1.amazonaws.com:3000/fs/search?query=';

const searchFood = (query,fsDatabase) => {

    return fsDatabase?fatSecret(query):usda(query);
}
const fatSecret = (query)=>{
    return from(
        Axios.get(`${fsDatabaseUrl}${encodeURIComponent(query)}`)
            .pipe(
                map(res => {
                     
                    const foodList = res.data.foods;
                    const food = foodList.total_results === '0' ? {
                        errorMessage: 'No Results Found'
                    } : Array.isArray(foodList.food) ? foodList.food : [foodList.food];
                    console.log("fat secret >>", food);

                    return food;
                }),
                catchError(err => of(err))
            )
    )

}

 

const usda = (query)=>{
    return from(
        Axios.get(`${usdaUrl}${encodeURIComponent(query)}`)
            .pipe(
                map(res => {
                    console.log("RESPONS data", res);
                    const foodList = res.data.map( item=>{

                        return{
                            food_description: item.popularNutrition.map(nutrition=>{
                                return `${nutrition.name}-${nutrition.value}`;
                            }).join(' - '),
                            food_id: item.id,
                            food_name: item.description
                            
                        }
                    });                    
                    return foodList;
                }),
                catchError(err => of(err))
            )
    )
}

export default searchFood;