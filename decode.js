function monthDecoder(month){
    switch (month){ // Decodes the month number to month name
        case "01":
            return "jaanuaril";
        case "02":
            return "veebruaril";
        case "03":
            return "martsil";
        case "04":
            return "aprillil";       
        case "05":
            return "mail";
        case "06":
            return "juunil";
        case "07":
            return "juulil";
        case "08":
            return "augustil";        
        case "09":
            return "septembril";
        case "10":
            return "oktoobril";
        case "11":
            return "novembril";
        case "12":
            return "detsembril";
    }
}
function hospitalDecoder(hospitalID){ // Decodes hospital code to hospital location and calculates
    id = parseInt(hospitalID)         // given person's nr based on the location
    let hospital = ""
    let nr = ""
    if (id >= 1 && id <= 10){  
        hospital = "Kuressaare haiglas" 
        nr = hospitalID
    } else if (id >= 11 && id <= 19){
        hospital = "Tartu ylikooli naistekliinikus"
        nr = hospitalID - 10
    } else if (id >= 21 && id <= 150){
        hospital = "Tallinna haiglas"
        nr = hospitalID - 20
    } else if (id >= 151 && id <= 160){
        hospital = "Keila haiglas"
        nr = hospitalID - 150
    } else if (id >= 161 && id <= 220){
        hospital = "Rapla, Loksa voi Hiiumaa haiglas"
        nr = hospitalID - 160
    } else if (id >= 221 && id <= 270){
        hospital = "Ida-viru keskhaiglas"
        nr = hospitalID - 220
    } else if (id >= 271 && id <= 370){
        hospital = "Maarjamoisa kliinikumis, Jogeva haiglas"
        nr = hospitalID - 270
    } else if (id >= 371 && id <= 420){
        hospital = "Narva haiglas"
        nr = hospitalID - 370
    } else if (id >= 421 && id <= 470){
        hospital = "Parnu haiglas"
        nr = hospitalID - 420
    } else if (id >= 471 && id <= 490){
        hospital = "Haapsalu haiglas"
        nr = hospitalID - 470
    } else if (id >= 491 && id <= 520){
        hospital = "J2rvamaa haiglas"
        nr = hospitalID - 490
    } else if (id >= 521 && id <= 570){
        hospital = "Rakvere, Tapa haiglas"
        nr = hospitalID - 520
    } else if (id >= 571 && id <= 600){
        hospital = "Valga Haiglas"
        nr = hospitalID - 570
    } else if (id >= 601 && id <= 650){
        hospital = "Viljandi haiglas"
        nr = hospitalID - 600
    } else if (id >= 651 && id <= 700){
        hospital = "Louna-Eesti haiglas"
        nr = hospitalID - 650
    }
    return ". Isik on syndinud " + hospital + " " + nr.toString() + ". inimesena"
}

function controlNumber(id){
    const weight1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 1]
    const weight2 = [3, 4, 5, 6, 7, 8, 9, 1, 2, 3]
    let result = 0
    id = id.slice(0, 10)
    for (let i = 0; i < id.length; i++){
        result += id[i] * weight1[i]
    }
    result = result % 11
    if (result == 10){
        let result2 = 0
        for (let i = 0; i < id.length; i++){
            result2 += id[i] * weight2[i]
        }
        result = result2 % 11
    }
    if(result == 10){
        result = 0
    }
    return result
}

function idDecoder(id){
    let gender = id[0];
    let year = id.slice(1, 3);
    let sex = ""

    let month = id.slice(3, 5);
    month = monthDecoder(month);

    let day = id.slice(5, 7);

    let hospitalID = id.slice(7, 10)
    let hospital = hospitalDecoder(hospitalID)
    let cntrlNr = controlNumber(id)

    if (gender === "1" || gender === "3" || gender === "5" || gender === "7"){ // Outputs if the person in male or female
        sex = "mees"
    } else if (gender === "2" || gender === "4" || gender === "6" || gender === "8"){
        sex = "naine"
    }
    
    if (gender <= 2){ // Calculates the century the person was born based on gender marker
        year = "18" + year
    } else if (gender <= 4){ 
        year = "19" + year
    } else if (gender >= 5) {
        year = "20" + year
    }
    return `<body>
    Isik isikukoodiga ${id} on ${sex} kes on syndinud ${day} ${month} ${year}. aastal ${hospital} kontrollnumbriga ${cntrlNr}</body>
    <br>
    <a href="/">Uus isikukood</a>`

}

module.exports = {
    idDecoder
}
