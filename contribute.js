const portions = [
    {
        "id": 264350,
        "portionDescription": "Quantity not specified",
        "gramWeight": 240.00000000,
        "sequenceNumber": 8,
        "modifier": "90000",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 259450,
        "portionDescription": "1 Keurig cup",
        "gramWeight": 170.00000000,
        "sequenceNumber": 6,
        "modifier": "64623",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 256003,
        "portionDescription": "1 single serving container",
        "gramWeight": 210.00000000,
        "sequenceNumber": 5,
        "modifier": "64226",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 250476,
        "portionDescription": "1 packet, dry, yields",
        "gramWeight": 148.00000000,
        "sequenceNumber": 4,
        "modifier": "61593",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 250055,
        "portionDescription": "1 microwave cup, prepared",
        "gramWeight": 210.00000000,
        "sequenceNumber": 7,
        "modifier": "61456",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 243605,
        "portionDescription": "1 oz, dry, yields",
        "gramWeight": 170.00000000,
        "sequenceNumber": 3,
        "modifier": "40049",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 243527,
        "portionDescription": "1 oz, cooked",
        "gramWeight": 28.35000000,
        "sequenceNumber": 2,
        "modifier": "40040",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    },
    {
        "id": 235894,
        "portionDescription": "1 cup, cooked",
        "gramWeight": 240.00000000,
        "sequenceNumber": 1,
        "modifier": "10043",
        "measureUnit": {
            "id": 9999,
            "name": "undetermined",
            "abbreviation": "undetermined"
        }
    }
];

const getPortions = () => {

    return portions.map(portion => {
        return {
            description: portion.portionDescription,
            weight: portion.gramWeight
        }


    })



}

const test = getPortions();

console.log(test);