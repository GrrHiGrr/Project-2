document.querySelector(".pet-reg-form").addEventListener("submit", async (e)=> {
    e.preventDefault();

    //grab input el values
    const name = document.querySelector("#pet-name").value;
    const species = document.querySelector("#species").value;
    const birthday = document.querySelector("#birthday").value;


    const payload = {
        name,species,birthday
    }
    console.log(payload);

    const res = await fetch("/petregister", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await res.json();
    console.log(data);
    location.replace("/profile")
})