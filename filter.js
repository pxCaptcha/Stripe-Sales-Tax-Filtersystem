const fs = require('fs');
const path = require('path');

async function filterData(settingNames){
    console.log("Filtering data...")
    var data = await getFile()
    var superData = { }

    var totalprice = 0,
    priceWOFees = 0,
    currency = "";

    superData[settingNames[0]] = 0;
    superData[settingNames[1]] = 0;
    superData[settingNames[2]] = JSON.parse("{}");

    if(data[0].settings.currency == "eur")
    currency = "€"
    else 
    currency = "$"

    for (var counter = 0; counter < data.length; counter++) {
        totalprice += (parseInt(data[counter].settings.amount) - parseInt(data[counter].settings.amount_refunded) - parseInt(data[counter].settings.fee))
        priceWOFees += (parseInt(data[counter].settings.amount))

        if(!superData.regions.hasOwnProperty(data[counter].settings.card_address_country))
        superData.regions[data[counter].settings.card_address_country] = {amount:1,customer:[data[counter].settings.customer_email],money_spent:parseInt(data[counter].settings.amount),money_spent_after_fees:(parseInt(data[counter].settings.amount) - parseInt(data[counter].settings.amount_refunded) - parseInt(data[counter].settings.fee))}
        else
        superData.regions[data[counter].settings.card_address_country].amount += 1, superData.regions[data[counter].settings.card_address_country].money_spent += parseInt(data[counter].settings.amount), superData.regions[data[counter].settings.card_address_country].money_spent_after_fees += (parseInt(data[counter].settings.amount) - parseInt(data[counter].settings.amount_refunded) - parseInt(data[counter].settings.fee)), superData.regions[data[counter].settings.card_address_country].customer.push(data[counter].settings.customer_email)
    }

    for (var counter = 0; counter < Object.keys(superData.regions).length; counter++) {
      superData.regions[Object.keys(superData.regions)[counter]].money_spent += currency
      superData.regions[Object.keys(superData.regions)[counter]].money_spent_after_fees += currency
    }

    superData[settingNames[0]] = priceWOFees + currency;
    superData[settingNames[1]] = totalprice + currency;
    fs.writeFileSync(path.join("filteredPayment.json"), JSON.stringify(superData));
    console.log("Data filtered and saved!")
}


async function getFile(){
    var lines = fs.readFileSync(path.join("unified_payments.csv"), "utf8").split(/\r?\n/);
    var arrayLength = "";
    let tasks = [];

    var settingNames = lines[0].split('","');
    settingNames[0] = settingNames[0].split('"')[1];
    settingNames[settingNames.length - 1] = settingNames[settingNames.length - 1].split('"')[0];

    for (var lineNumber = 1; lineNumber < lines.length; lineNumber++) {
      var config = lines[lineNumber].split('","');
      var task = {
        settings:{}
      }

      for (var configNumber = 0; configNumber < config.length; configNumber++)
        task.settings[settingNames[configNumber]] = config[configNumber];
        task.settings.amount = task.settings.amount.split('"')[1]
        arrayLength = Object.keys(task.settings).length - 1
        task.settings[Object.keys(task.settings)[arrayLength]] = task.settings[Object.keys(task.settings)[arrayLength]].split('"')[0]
        tasks.push(task);
    }
    return tasks;
}

filterData(["Revenues","Revenues after taxes and fees","regions"])