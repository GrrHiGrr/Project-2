document.querySelector(".user-pets").addEventListener("submit", (e)=> {
    e.preventDefault();

    //grab input el values
    const name = document.querySelector("#pet-name").value;
    const species = document.querySelector("#species").value;
    const birthday = document.querySelector("#birthday").value;


    const payload = {
        name,species,birthday
    }
    console.log(payload)
})