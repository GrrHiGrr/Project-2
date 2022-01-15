const fs = require("fs");
const locations = require("./dummyLocations.json");
const species = require("./species.json");

const clean = locations.map(a => {
    return {
        name: `${a.name.title} ${a.name.first} ${a.name.last}`,
        birthday: a.dob.date,
        species: species[Math.floor(Math.random() * species.length)]
    }
})

fs.writeFileSync("petData.json", JSON.stringify(clean))
