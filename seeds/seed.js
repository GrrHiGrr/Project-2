const {User, Pet} = require("../models");
const userData = require("./userData.json")
const petData = require("./petData.json");
const sequelize = require("../config/connection");

const chunk = 500;


sequelize.sync({force:true}).then(async ()=> {
    for(let i = 0; i< userData.length; i+=chunk){
        console.log("working on users chunk ", i)
        const dataChunk = userData.slice(i, i+ chunk);
        const users = await User.bulkCreate(dataChunk);
    }

    for(let i = 0; i< petData.length; i+=chunk){
        console.log("working on pets chunk ", i);
        const dataChunk = petData.slice(i, i+chunk)
        const pets = await Pet.bulkCreate(dataChunk.map(a => ({...a, user_id: Math.ceil(Math.random()*petData.length)})));
    }
    return console.log("success!")
})