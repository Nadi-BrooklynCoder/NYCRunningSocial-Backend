const express = require("express");
const locations = express.Router( { mergeParams: true } );

const { getUser } = require ('../queries/users');

const {
    getAllLocations,
    getLocation,
    addLocation
} = require("../queries/locations");

locations.get("/", async (req, res) => {
    const { user_id } = req.params;
    const locations = await getAllLocations(user_id);

    if(user_id) {
        const user = await getUser(user_id);
        if(user.id) {
        res.status(200).json({ ...user, locations })
        }   else {
        res.status(500).json( { error: "User not found" });
        };
    }  else {
        res.status(200).json(locations);
    }   
});

locations.get("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    const location = await getLocation(id);

    if(location) {
        if(user_id) {
            const user = await getUser(user_id);
            res.json({ ...user, location});
        } else {
            res.json(location)
        }
    }   else {
            res.status(404).json({ error: "Location not found" });
    };
});


locations.post("/", async (req, res) => {
    const { user_id } = req.params;
    const { street, borough, zipCode } = req.body;

    const url = `https://api.nyc.gov/geo/geoclient/v1/address.json?street=${street}&borough=${borough}&zipCode=${zipCode}`;
    console.log(url);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Cache-Control': 'no-cache',
                'Ocp-Apim-Subscription-Key': process.env.OCP_APIM_SUBSCRIPTION_KEY,
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const location = data.address.boePreferredStreetName;
        const address = {
            borough: data.address.firstBoroughName,
            zipcode: data.address.zipCode
        };

        const result = await addLocation(location, address, user_id);

        res.status(201).json(result);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: "Failed to add location" });
    }
});

module.exports = locations;

