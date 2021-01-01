import Axios from "./Axios";
import { of, from, forkJoin, throwError, Observable } from "rxjs";
import { switchMap, map, tap, catchError, reduce } from "rxjs/operators";
import moment from 'moment';
//const fatSecretUrl = 'http://localhost:3300/fs/detail?id=';
const fatSecretUrl = 'http://ec2-54-86-134-25.compute-1.amazonaws.com:3000/fs/detail?id=';
const usdaUrl = 'http://35.221.47.246:3000/usda/detail?id=';
//const usdaUrl = 'http://localhost:3300/usda/detail?id=';


const foodDetail = (foodId, useFatSecret) => {

    return from(
        Axios.get(`${useFatSecret ? fatSecretUrl : usdaUrl}${foodId}`)
            .pipe(
                map(res => res.data),
                catchError(err => of(err))
            )
    )

    //return of(dummy());
}

function dummy() {
    return { "nutrients": [{ "amount": 999.3, "id": 1003, "number": "203", "name": "Protein", "rank": 600, "unitName": "g" }, { "amount": 0, "id": 1004, "number": "204", "name": "Total lipid (fat)", "rank": 800, "unitName": "g" }, { "amount": 0, "id": 2039, "number": "956", "name": "Carbohydrates", "rank": 1100, "unitName": "g" }, { "amount": 0, "id": 1079, "number": "291", "name": "Fiber,  dietary", "rank": 1200, "unitName": "g" }, { "amount": 2, "id": 1087, "number": "301", "name": "Calcium, Ca", "rank": 5300, "unitName": "mg" }, { "amount": 0.02, "id": 1089, "number": "303", "name": "Iron, Fe", "rank": 5400, "unitName": "mg" }, { "amount": 4, "id": 1090, "number": "304", "name": "Magnesium, Mg", "rank": 5500, "unitName": "mg" }, { "amount": 3, "id": 1091, "number": "305", "name": "Phosphorus, P", "rank": 5600, "unitName": "mg" }, { "amount": 50, "id": 1092, "number": "306", "name": "Potassium, K", "rank": 5700, "unitName": "mg" }, { "amount": 1, "id": 1093, "number": "307", "name": "Sodium, Na", "rank": 5800, "unitName": "mg" }, { "amount": 0.02, "id": 1095, "number": "309", "name": "Zinc, Zn", "rank": 5900, "unitName": "mg" }, { "amount": 0.005, "id": 1098, "number": "312", "name": "Copper, Cu", "rank": 6000, "unitName": "mg" }, { "amount": 0.032, "id": 1101, "number": "315", "name": "Manganese, Mn", "rank": 6100, "unitName": "mg" }, { "amount": 0, "id": 1103, "number": "317", "name": "Selenium, Se", "rank": 6200, "unitName": "µg" }, { "amount": 0, "id": 1162, "number": "401", "name": "Vitamin C,  ascorbic acid", "rank": 6300, "unitName": "mg" }, { "amount": 0.02, "id": 1165, "number": "404", "name": "Thiamin", "rank": 6400, "unitName": "mg" }, { "amount": 0, "id": 1166, "number": "405", "name": "Riboflavin", "rank": 6500, "unitName": "mg" }, { "amount": 0, "id": 1175, "number": "415", "name": "Vitamin B-6", "rank": 6800, "unitName": "mg" }, { "amount": 0, "id": 1177, "number": "417", "name": "Folate, ", "rank": 6900, "unitName": "µg" }, { "amount": 0, "id": 1186, "number": "431", "name": "Folic acid", "rank": 7000, "unitName": "µg" }, { "amount": 0, "id": 1178, "number": "418", "name": "Vitamin B-12", "rank": 7300, "unitName": "µg" }, { "amount": 0, "id": 1104, "number": "318", "name": "Vitamin A, IU", "rank": 7500, "unitName": "IU" }, { "amount": 0, "id": 1110, "number": "324", "name": "Vitamin D (D2 + D3), IU", "rank": 8650, "unitName": "IU" }, { "amount": 0, "id": 1258, "number": "606", "name": "Fatty acids,  saturated", "rank": 9700, "unitName": "g" }, { "amount": 0, "id": 1292, "number": "645", "name": "Fatty acids,  monounsaturated", "rank": 11400, "unitName": "g" }, { "amount": 0, "id": 1293, "number": "646", "name": "Fatty acids,  polyunsaturated", "rank": 12900, "unitName": "g" }, { "amount": 37, "id": 1057, "number": "262", "name": "Caffeine", "rank": 18300, "unitName": "mg" }], "portions": [{ "amount": 1, "unit": "cup" }] };
}

export default foodDetail;