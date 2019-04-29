let startBtn = document.getElementById("start"),
    budgetValue = document.getElementsByClassName("budget-value")[0],
    dayBudgetValue = document.getElementsByClassName("daybudget-value")[0],
    levelValue = document.getElementsByClassName("level-value")[0],
    expValue = document.getElementsByClassName("expenses-value")[0],
    optExpValue = document.getElementsByClassName("optionalexpenses-value")[0],
    incValue = document.getElementsByClassName("income-value")[0],
    monthSaveValue = document.getElementsByClassName("monthsavings-value")[0],
    yearSaveValue = document.getElementsByClassName("yearsavings-value")[0],

    expInput = document.querySelectorAll(".expenses-item"),
    expBtn = document.getElementsByTagName("button")[0],
    optExpBtn = document.getElementsByTagName("button")[1],
    calcBtn = document.getElementsByTagName("button")[2],
    optExpInput = document.querySelectorAll(".optionalexpenses-item"),
    incItems = document.querySelector(".choose-income"),
    chckSavings = document.querySelector(".checksavings"),
    sumSavings = document.querySelector(".choose-sum"),
    percSavings = document.querySelector(".choose-percent"),
    year = document.querySelector(".year-value"),
    month = document.querySelector(".month-value"),
    day = document.querySelector(".day-value");

    
let money, time, appData;

appData = {
    budget: money,
    timeData: time,
    expenses: {}, 
    optionalExpenses: {},
    income: [],
    savings: false  
 };

startBtn.addEventListener("click", function(){
    time = prompt("Введите дату в формате YYYY-MM-DD", "");
    money = +prompt("Ваш бюджет на месяц?", "");

    while(isNaN(money) || money == "" || money == null) {
        money = +prompt("Ваш бюджет на месяц?");
    }
    appData.budget = money;
    appData.timeData = time;
    budgetValue.textContent = money.toFixed();
    year.value = new Date(Date.parse(time)).getFullYear();
    month.value = new Date(Date.parse(time)).getMonth() + 1;
    day.value = new Date(Date.parse(time)).getDate();
});
var sum;
expBtn.addEventListener("click", function(){
    sum = 0;

    for (let i = 0; i < expInput.length; i++){
        var a = expInput[i].value,
            b = expInput[++i].value;
    
        if ((typeof(a)) === "string" && (typeof(a)) != null && (typeof(b)) != null
        && a != "" && b != "" && a.length < 50) {
            console.log("done");
            appData.expenses[a] = b;
            sum += +b;
        } else {
            i--;
        }
    
    }
    expValue.textContent = +sum;
    

});

optExpBtn.addEventListener("click", function(){
    for (let i = 0; i < optExpInput.length; i++){
        
        let a = optExpInput[i].value;
        appData.optionalExpenses[i] = a; 
        optExpValue.textContent += appData.optionalExpenses[i] + " ";
      }
});

calcBtn.addEventListener("click", function(){
    if(appData.budget != undefined){
        appData.moneyPerDay = ((appData.budget - sum) / 30).toFixed();
        dayBudgetValue.textContent = appData.moneyPerDay;
        
        if(appData.moneyPerDay < 100) {
            levelValue.textContent = "Минимальный уровень достатка";
        } else if (appData.moneyPerDay >100 && appData.moneyPerDay < 2000) {
            levelValue.textContent = "Средний уровень достатка";
        } else if (appData.moneyPerDay > 2000) {
            levelValue.textContent = "Высокий уровень достатка";
        } else {
            levelValue.textContent = "Произошла ошибка";
        }
    } else {
            dayBudgetValue.textContent = "Произошла ошибка";
    }
    
});

incItems.addEventListener("input", function(){
    let items = incItems.value;
    appData.income = items.split(", ");
    incValue.textContent = appData.income;
});

chckSavings.addEventListener("click", function(){
    if(appData.savings == true){
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumSavings.addEventListener("input", function(){
    if(appData.savings == true){
        let sum = +sumSavings.value,
            percent = +percSavings.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSaveValue.textContent =  appData.monthIncome.toFixed(1);
        yearSaveValue.textContent =  appData.yearIncome.toFixed(1);
    }
});

percSavings.addEventListener("input", function(){
    if(appData.savings == true){
        let sum = +sumSavings.value,
        percent = +percSavings.value;
        appData.monthIncome = sum/100/12*percent;
        appData.yearIncome = sum/100*percent;

        monthSaveValue.textContent =  appData.monthIncome.toFixed(1);
        yearSaveValue.textContent =  appData.yearIncome.toFixed(1);
    }
});

expBtn.disabled = true;
expInput.forEach(function(item, i) {
    expInput[i].addEventListener("input", function(){
        if(expInput[i].value !== ""){
            expBtn.disabled = false;
        }
    });
});

optExpBtn.disabled = true;
optExpInput.forEach(function(item, i) {
    optExpInput[i].addEventListener("input", function(){
        if(optExpInput[i].value !== ""){
            optExpBtn.disabled = false;
        }
    });
});