import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import {
  extractPopularNutrients,
  extractNutrients,
  foodLookupUrl,
  findCalories,
} from "./nutrition";
 

const transformFoodList = (foodList) => {

  const data = foodList.reduce((nonDuplicates, food) => {
    nonDuplicates.set(food.description, food);
    return nonDuplicates;
  }, new Map());

  return Array.from(data.entries())
    .map(([key, val]) => {
      return {
        description: val.description,
        id: val.fdcId,
        cal: findCalories(val.foodNutrients),
        nutrition: extractNutrients(val.foodNutrients),
        popularNutrition: extractPopularNutrients(val.foodNutrients)
      };
    })
    .filter((v) => v);

}

const foodLookup = (query) => {
  return getFood(query, 1).pipe(
    switchMap(res => {

      if (res.error) {
        return throwError(res.error);
      }

      return of(res.data);

    }),
    //map((res) => res.data),
    switchMap((res) => {
      return createPageRequests(res, query);
    }),

    map((data) => {
      return Object.values(data)
        .map((entry) => entry.data)
        .filter((data) => data)
        .map((data) => data.foods);
    }),
    map((allPages) => {
      return allPages.flatMap((data) => data);
    }),
    map((foodList) => {
      return transformFoodList(foodList)
    }),
    catchError(err => {
      console.log("error getting food lookup", err);
      return of({ errorMessage: err });
    })

  );
};

const foodLookupSplit = (query) => {
  return new Observable(subscriber => {


    const firstPage$ = getFood(query, 1).pipe(
      switchMap(res => {

        if (res.error) {
          return throwError(res.error);
        }

        return of(res.data);

      }),
      map((data) => {
        return {
          foods: transformFoodList(data.foods),
          pageData: data
        };
      }),
      map(data => {
        console.log("tap >>>>>>", data);
        subscriber.next(data.foods);
        return data.pageData;

      }), switchMap((pageData) => {
        return createPageRequests(pageData, query);
      }),

      map((data) => {
        return Object.values(data)
          .map((entry) => entry.data)
          .filter((data) => data)
          .map((data) => data.foods);
      }),
      map((allPages) => {
        return allPages.flatMap((data) => data);
      }),
      map((foodList) => {
        return transformFoodList(foodList)
      }),
      catchError(err => {
        console.log("error getting food lookup", err);
        return of({ errorMessage: err });
      })
    )
      .subscribe(page => {
        subscriber.next(page);
        firstPage$.unsubscribe();
      })



  });

};

export default foodLookup;
