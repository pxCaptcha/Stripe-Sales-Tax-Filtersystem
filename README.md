# Stripe-Sales-Tax-Filtersystem

What is this program doing?
A tax sales filter system for Stripe, where your exported sales in a csv, would filter you out that for example 21 people out of Italy paid 495,34€ this month and for Germany 23 people paid * and so going on...
With this you can do your tax really easy, as for example in Germany and in many other countries you need to protocol how many people from where paid how much and pay instead of 19% sales tax for your country, then 21% then to Italy for the people coming out of Italy as the sales tax is 21% there instead of 19%. With this you can clearly oversee already directly how much from where how much money you made, and with this you can calculate your sales tax super easy.

## Setup
To run this project, first install package.json, package-lock.json and the filter.js file, after you did this install all npm modules with

```
$ npm install -i
```
<br/>
After you have installed everything, we need to get the csv file from Stripe. Under Payments -> Succeeded, on the right top you can find "Export", there at the bottom you select 
under "Columns" Custom. Select at least these values:
<br/><br/>

![g](https://user-images.githubusercontent.com/53152165/116849253-b7d9c300-abee-11eb-8b4d-cceaae96d8b9.PNG)


After you got the new file, which should be called "unified_payments.csv" you just drag it into the filter system folder, and run

```
$ node filter.js
```

It will now filter all your data, obviously only on your end!, and create a new file called "filteredPayment.json", if you dont want it to export in a .json you can change this at line 39!
<br/><br/>
Dont forget to ⭐ and if you need more help feel free to contact me on discord 𝕷𝖚𝖈𝖆#0001 or on Twitter [@pxCaptcha](https://twitter.com/pxCaptcha)
