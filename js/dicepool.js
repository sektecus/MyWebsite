
/******************************************************/
//RESULTS CONTROLLER
//Holds and returns all queried functions for calculations

let resultController = (function() {


    //Dice Pool object constructor and sum function to be used in returned functions below
    /*********************************************************************************** */
    let dicePoolItem = function(type, id, value) {
        this.type = type;
        this.id = id;
        this.value = value;
    };

    let calcSum = function(n) {
        let sum = 0;
        for(i = 0; i < n.length; i++) {
            sum += n[i];
        }
        return sum;
    };

    //Data objects used while calculating data
    /*************************************** */
    let data = {
        type: [],
        id: [],
        results: []
    };

    let dataBackup = [];

    let saved = {
        type: [],
        id: [],
        results: [],
        mod: 0
    };

    let saved2 = {
        type: [],
        id: [],
        results: [],
        mod: 0
    };

    let bank = [];

    //Functions triggered by and returned to the Global App Controller
    /*************************************************************** */
    return {
        sum: function() {
            let sum = calcSum(bank) + calcSum(data.results);
            return sum;
        },

        sumPool: function() {
            let pool = calcSum(data.results);
            return pool;
        },

        sumBank: function() {
            let bankTotal = calcSum(bank);
            return bankTotal;
        },

        returnBank: function() {
            return bank;
        },

        storeBank: function(total) {
            bank.push(total);
        },

        roll: function() {
            //console.log(data.results);
            dataBackup = data.results.slice();
            data.results = [];
            //console.log(dataBackup);
            
            for(let i = 0; i < data.type.length; i++) {
                if(data.type[i] === 'dx') {
                    data.results[i] = 0;
                }else {
                    let itemID, num, check;
                    itemID = data.type[i]; 
                    num = parseInt(itemID.split('D').pop());
                    if($(`#check-${itemID}-${[i]}`).is(":checked")) {
                        data.results[i] = dataBackup[i]
                        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
                    }else {
                        data.results[i] = Math.floor(Math.random() * num) + 1;
                        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
                    }
                }
           }
           dataBackup = [];
           //console.log(data.results);
        },

        addDiceItem: function(type, user) {
            let newItem, ID, value;

            if(data.id.length > 0) {
                ID = data.id.length;
            }else {
                ID = 0;
            }

            if(type === 'D3') {
                value = Math.floor(Math.random() * 3) + 1;
            }else if(type === 'D4') {
                value = Math.floor(Math.random() * 4) + 1;
            }else if(type === 'D6') {
                value = Math.floor(Math.random() * 6) + 1;
            }else if(type === 'D8') {
                value = Math.floor(Math.random() * 8) + 1;
            }else if(type === 'D10') {
                value = Math.floor(Math.random() * 10) + 1;
            }else if(type === 'D12') {
                value = Math.floor(Math.random() * 12) + 1;
            }else if(type === 'D20') {
                value = Math.floor(Math.random() * 20) + 1;
            }else if(type === 'D100') {
                value = Math.floor(Math.random() * 100) + 1;
            }else {
                value = Math.floor(Math.random() * user) + 1;
            }

            newItem = new dicePoolItem(type, ID, value);
            data.type.push(type);
            data.id.push(ID);
            data.results.push(value);
            return newItem;
        },

        deleteData: function(type, ID) {
            let ids1, ids2, ids3, index;
            ids1 = data.id.map(function(current) {
                return current;
            });
            index1 = ids1.indexOf(ID);
            data.id[index1] = 'x';
            data.results[index1] = 0;
            data.type[index1]= 'dx';
        },

        clearData: function() {
            data.id = [];
            data.results = [];
            data.type = [];
        },

        clearSaveData: function() {
            saved.id = [];
            saved.results = [];
            saved.type = [];
            saved.mod = 0;
        },

        clearSaveData2: function() {
            saved2.id = [];
            saved2.results = [];
            saved2.type = [];
            saved2.mod = 0;
        },

        saveData: function() {
            saved.id = data.id.slice();
            saved.results = data.results.slice();
            saved.type = data.type.slice();
            saved.mod = document.querySelector('#mod').value;
        },

        saveData2: function() {
            saved2.id = data.id.slice();
            saved2.results = data.results.slice();
            saved2.type = data.type.slice();
            saved2.mod = document.querySelector('#mod').value;
        },

        recallData: function() {
            data.id = saved.id.slice();
            data.results = saved.results.slice();
            data.type = saved.type.slice();
            document.querySelector('#mod').value = saved.mod;
        },

        recallData2: function() {
            data.id = saved2.id.slice();
            data.results = saved2.results.slice();
            data.type = saved2.type.slice();
            document.querySelector('#mod').value = saved2.mod;
        },
        
        clearBank: function() {
            bank = [];
        }
    }


})();

//END RESULTS
/******************************************************/

/******************************************************/
//UI CONTROLLER
//Stores and returns DOM items and functions, used by the Gobal App Controller, for the purpose of changing the UI

let UIController = (function() {

    let DOMstrings = {
        d6Add: '.d6-add',
        d3Add: '.d3-add',
        d4Add: '.d4-add',
        d8Add: '.d8-add',
        d10Add: '.d10-add',
        d12Add: '.d12-add',
        d20Add: '.d20-add',
        d100Add: '.d100-add',
        dxAdd: '.dx-add',
        diceColumn: '.dice',
        lockedColumn: '.locked',
        savedPoolColumn: '.saved-pool',
        savedPoolColumn2: '.saved-pool-2',
        rollBtn: '.roll-dice',
        sumID: 'sum',
        container: '.pool',
        clear: '.clearPage',
        poolTarget: 'dicePoolTarget',
        deleteDie: 'deleteDie',
        bank: '.bank-total',
        save: '.save-total',
        savePoolBtn: '.save-pool-btn',
        savePoolBtn2: '.save-pool-btn-2',
        recallPoolBtn: '.recall-pool-btn',
        recallPoolBtn2: '.recall-pool-btn-2',
        addedDice: '.added-dice',
        clearChecks: '.clear-checks'
    };

    //Functions triggered by and returned to the Global App Controller
    /*************************************************************** */
    return {
        addDice: function(obj){
            $('.dice-banner').empty();
            let element = DOMstrings.diceColumn
            let html = '<div class="added-dice" id="%type%__%id%"><button class="deleteDie" id="deleteDie">X</button><img class="dice-pics" src="images/%type%.png"> : <span class="added-result" id="value__%id%">%value%</span><div class="check"><input type="checkbox" id="check-%type%-%id%"></div></div>'
            html = html.replace('%id%', obj.id);
            html = html.replace('%id%', obj.id);
            html = html.replace('%id%', obj.id);
            html = html.replace('%type%', obj.type);
            html = html.replace('%type%', obj.type);
            html = html.replace('%type%', obj.type);
            html = html.replace('%value%', obj.value);
            return document.querySelector(element).insertAdjacentHTML('beforeend', html)
        },
        addDiceX: function(obj){
            $('.dice-banner').empty();
            let element = DOMstrings.diceColumn
            let html = '<div class="added-dice" id="%type%__%id%"><button class="deleteDie" id="deleteDie">X</button>%type%: <span class="added-result" id="value__%id%">%value%</span><div class="check"><input type="checkbox" id="check-%type%-%id%"></div></div>'
            html = html.replace('%id%', obj.id);
            html = html.replace('%id%', obj.id);
            html = html.replace('%id%', obj.id);
            html = html.replace('%type%', obj.type);
            html = html.replace('%type%', obj.type);
            html = html.replace('%type%', obj.type);
            html = html.replace('%value%', obj.value);
            return document.querySelector(element).insertAdjacentHTML('beforeend', html)
        },
        bankTotal: function(total, bankID) {
            $('.locked-banner').empty();
            let element = DOMstrings.lockedColumn;
            let html = `<div class="added-total">${bankID}) ${total}</div>`;
            return document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },
        /*
        addResult: function(obj){
            let element = DOMstrings.resultColumn
            let html = '<div class="added-result" id="value__%id%">%value%</div>'
            html = html.replace('%id%', obj.id);
            html = html.replace('%type%', obj.type);
            html = html.replace('%value%', obj.value);
            return document.querySelector(element).insertAdjacentHTML('beforeend', html)
        },
        */
        displayRoll: function(sumPool, sumBank) {
            let element = DOMstrings.sumID   
            return document.getElementById(element).textContent = `${sumPool} = Pool Total | Bank Total = ${sumBank}`;
        },

        deleteDice: function(selectorID) {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el); 
        },

        clearDice: function() {
            //console.log('Enter code to clear page here');
            let element = DOMstrings.diceColumn;
            $(element).empty();
            let html = '<div class="pool-label"><p class="sec-label">Current Pool:</p></div><p class="dice-banner">Click dice buttons (above) to add them to your pool</p>'
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        clearBank: function() {
            let element = DOMstrings.lockedColumn;
            $(element).empty();
            let html = '<div class="bank-label"><p class="sec-label">Banked Values:</p></div><p class="locked-banner">Click "Bank" buttons (above) to store your current total</p>'
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        getDOMstrings: function() {
            return DOMstrings;
        },
        clearQty: function() {
            document.querySelector('#qty3').value = '';
            document.querySelector('#qty4').value = '';
            document.querySelector('#qty6').value = '';
            document.querySelector('#qty8').value = '';
            document.querySelector('#qty10').value = '';
            document.querySelector('#qty12').value = '';
            document.querySelector('#qty20').value = '';
            document.querySelector('#qty100').value = '';
            document.querySelector('#qtyx').value = '';
            document.querySelector('#mod').value = '';
            document.querySelector('#user').value = '';
        }
    }

})();

//END UI
/******************************************************/

/******************************************************/
//GLOBAL APP CONTROLLER
//Directs actions and functions, utilizing both the UI Controller and the Results Controller

let controller = (function(resultCtrl, UICtrl) {

    let setupEventListeners = function() {
        let DOM = UICtrl.getDOMstrings();
        
        window.onload=function(){
            document.querySelector(DOM.d3Add).addEventListener('click', ctrlAddD3);
            document.querySelector(DOM.d4Add).addEventListener('click', ctrlAddD4);
            document.querySelector(DOM.d6Add).addEventListener('click', ctrlAddD6);
            document.querySelector(DOM.d8Add).addEventListener('click', ctrlAddD8);
            document.querySelector(DOM.d10Add).addEventListener('click', ctrlAddD10);
            document.querySelector(DOM.d12Add).addEventListener('click', ctrlAddD12);
            document.querySelector(DOM.d20Add).addEventListener('click', ctrlAddD20);
            document.querySelector(DOM.d100Add).addEventListener('click', ctrlAddD100);
            document.querySelector(DOM.rollBtn).addEventListener('click', ctrlRoll);
            //document.querySelector(DOM.container).addEventListener('click', ctrlDel);
            document.querySelector(DOM.clear).addEventListener('click', ctrlClear);
            document.querySelector(DOM.bank).addEventListener('click', ctrlBank);
            document.querySelector(DOM.save).addEventListener('click', ctrlSave);
            document.querySelector(DOM.dxAdd).addEventListener('click', ctrlAddDx);
            document.querySelector(DOM.savePoolBtn).addEventListener('click', ctrlSavePool);
            document.querySelector(DOM.recallPoolBtn).addEventListener('click', ctrlRecallPool);
            document.querySelector(DOM.savePoolBtn2).addEventListener('click', ctrlSavePool2);
            document.querySelector(DOM.recallPoolBtn2).addEventListener('click', ctrlRecallPool2);
            document.querySelector(DOM.clearChecks).addEventListener('click', ctrlChecks);
        }
        
    };

    //New delete function, added to fix bug wherein dice would be deleted when clicking on white space around value
    /************************************************************************************************************ */
    $(document).on('click', '#deleteDie', function(event) {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.id;
        //console.log(itemID);
        if(itemID) {
            splitID = itemID.split('__'); 
            type = splitID[0];
            ID = parseInt(splitID[1]);
            resultCtrl.deleteData(type, ID);
            UICtrl.deleteDice(itemID);
            ctrlSum();
        }
    });
    //Functions for adding dice - Triggered by Event Listeners above
    /************************************************************* */
    let ctrlChecks = function() {
        $('input:checkbox').removeAttr('checked');
    }
    let ctrlAddDx = function() {
        let input = document.querySelector('#user').value;
        let qty = document.querySelector('#qtyx').value;
        if(input) {
            input = input;
        }else {
            input = 0;
        }
        if(qty) {
            qty = qty;
        }else {
            qty = 1;
        }
        for(let i = 0; i<qty; i++) {
            let type = `D${input}`;
            let newDie = resultCtrl.addDiceItem(type, input);
            UICtrl.addDiceX(newDie);
            ctrlSum();
        }
    }
    let genAdd = function(type, qty) {
        if(qty) {
            qty = qty;
        }else {
            qty = 1;
        }
        for(let i = 0; i<qty; i++) {
            let newDie = resultCtrl.addDiceItem(type);
            UICtrl.addDice(newDie);
            //UICtrl.addResult(newDie);
            ctrlSum();
        }
    };
    let ctrlAddD3 = function() {
        let qty = document.querySelector('#qty3').value;
        let type = 'D3';
        genAdd(type, qty);
    };
    let ctrlAddD4 = function() {
        let qty = document.querySelector('#qty4').value;
        let type = 'D4';
        genAdd(type, qty);
    };
    let ctrlAddD6 = function() {
        let qty = document.querySelector('#qty6').value;
        let type = 'D6';
        genAdd(type, qty);
    };
    let ctrlAddD8 = function() {
        let qty = document.querySelector('#qty8').value;
        let type = 'D8';
        genAdd(type, qty);
    };
    let ctrlAddD10 = function() {
        let qty = document.querySelector('#qty10').value;
        let type = 'D10';
        genAdd(type, qty);
    };
    let ctrlAddD12 = function() {
        let qty = document.querySelector('#qty12').value;
        let type = 'D12';
        genAdd(type, qty);
    };
    let ctrlAddD20 = function() {
        let qty = document.querySelector('#qty20').value;
        let type = 'D20';
        genAdd(type, qty);
    };
    let ctrlAddD100 = function() {
        let qty = document.querySelector('#qty100').value;
        let type = 'D100';
        genAdd(type, qty);
    };

    //Functions for adding and deleting items, as well as summing and displaying calculations
    /************************************************************************************** */
    let ctrlSum = function(){
        let sum = resultCtrl.sumPool();
        let sumBank = resultCtrl.sumBank();
        //let sumAll = resultCtrl.sum();
        UICtrl.displayRoll(sum,sumBank);
    };

    let ctrlRoll = function() {
        resultCtrl.roll();
        ctrlSum();
    };

    let ctrlDel = function(event) {
        let itemID, splitID, type, ID;
        itemID = event.target.parentNode.id;
        //console.log(itemID);
        if(itemID) {
            splitID = itemID.split('__'); 
            //console.log(splitID);
            type = splitID[0];
            //console.log(type);
            ID = parseInt(splitID[1]);
            //console.log(ID);
            resultCtrl.deleteData(type, ID);
            UICtrl.deleteDice(itemID);
            ctrlSum();
        }
    };

    let ctrlBank = function() {
        let pool = resultCtrl.sumPool();
        let input = document.querySelector('#mod').value;
        if(input) {
            input = input;
        }else {
            input = 0;
        }
        let n = parseInt(input);
        let total = pool + n;
        let bankArray = resultCtrl.returnBank();
        let bankID = bankArray.length + 1;
        //console.log(bankID);
        UICtrl.bankTotal(total, bankID);
        UICtrl.clearDice();
        resultCtrl.clearData();
        resultCtrl.storeBank(total);
        ctrlSum();
    };

    let ctrlSave = function() {
        let pool = resultCtrl.sumPool();
        let input = document.querySelector('#mod').value;
        if(input) {
            input = input;
        }else {
            input = 0;
        }
        let n = parseInt(input);
        let total = pool + n;
        let bankArray = resultCtrl.returnBank();
        let bankID = bankArray.length + 1;
        UICtrl.bankTotal(total, bankID);
        resultCtrl.storeBank(total);
        ctrlSum();
    }

    let ctrlClear = function() {
        UICtrl.clearDice();
        resultCtrl.clearData();
        UICtrl.clearBank();
        resultCtrl.clearBank();
        UICtrl.clearQty();
        ctrlSum();
        
    };

    let ctrlSavePool = function() {
        let DOM = UICtrl.getDOMstrings();
        $(DOM.savedPoolColumn).empty();
        let poolEl = document.querySelector(DOM.diceColumn).children;
        $(poolEl).clone().appendTo(DOM.savedPoolColumn);
        resultCtrl.clearSaveData();
        resultCtrl.saveData();
        alert('Dice Pool 1 Saved!');
    };

    let ctrlSavePool2 = function() {
        let DOM = UICtrl.getDOMstrings();
        $(DOM.savedPoolColumn2).empty();
        let poolEl = document.querySelector(DOM.diceColumn).children;
        $(poolEl).clone().appendTo(DOM.savedPoolColumn2);
        resultCtrl.clearSaveData2();
        resultCtrl.saveData2();
        alert('Dice Pool 2 Saved!');
    };

    let ctrlRecallPool = function() {
        let DOM = UICtrl.getDOMstrings();
        $(DOM.diceColumn).empty();
        let html = '<p class="dice-banner"></p>'
        document.querySelector(DOM.diceColumn).insertAdjacentHTML('beforeend', html);
        let poolEl = document.querySelector(DOM.savedPoolColumn).children;
        $(poolEl).clone().appendTo(DOM.diceColumn);
        resultCtrl.clearData();
        resultCtrl.recallData();
        ctrlSum();
        alert('Dice Pool 1 Recalled Successfully');
    };

    let ctrlRecallPool2 = function() {
        let DOM = UICtrl.getDOMstrings();
        $(DOM.diceColumn).empty();
        let html = '<p class="dice-banner"></p>'
        document.querySelector(DOM.diceColumn).insertAdjacentHTML('beforeend', html);
        let poolEl = document.querySelector(DOM.savedPoolColumn2).children;
        $(poolEl).clone().appendTo(DOM.diceColumn);
        resultCtrl.clearData();
        resultCtrl.recallData2();
        ctrlSum();
        alert('Dice Pool 2 Recalled Successfully');
    };

    return {
        init: function() {
            console.log('Application has started...')

            //Setup event listeners
            setupEventListeners();
        }
    }

})(resultController, UIController);

//END CONTROLLER
/******************************************************/

controller.init();

//Standalone Example
/*
window.onload=function() {
    document.querySelector('.d4-add').addEventListener('click', d4Add);
    document.querySelector('.d6-add').addEventListener('click', d6Add);
};

function d4Add () {
    document.querySelector('.dice').insertAdjacentHTML('beforeend', '<div class="added-dice" id="dice__%id%">D4: </div>');
    document.querySelector('.result').insertAdjacentHTML('beforeend', '<div class="added-result" id="value__%id%">3</div>');
};

function d6Add () {
    document.querySelector('.dice').insertAdjacentHTML('beforeend', '<div class="added-dice" id="dice__%id%">D6: </div>');
    document.querySelector('.result').insertAdjacentHTML('beforeend', '<div class="added-result" id="value__%id%">5</div>');
};
*/

//Old Random Num Roll Code
/*
for(let i = 0; i < data.type.length; i++) {
    if(data.type[i] === 'D3') {
        data.results[i] = Math.floor(Math.random() * 3) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D4') {
        data.results[i] = Math.floor(Math.random() * 4) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D6') {
        data.results[i] = Math.floor(Math.random() * 6) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D8') {
        data.results[i] = Math.floor(Math.random() * 8) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D10') {
        data.results[i] = Math.floor(Math.random() * 10) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D12') {
        data.results[i] = Math.floor(Math.random() * 12) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D20') {
        data.results[i] = Math.floor(Math.random() * 20) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'D100') {
        data.results[i] = Math.floor(Math.random() * 100) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }else if(data.type[i] === 'dx') {
        data.results[i] = 0;
    }else {
        let itemID, num;
        itemID = data.type[i]; 
        num = parseInt(itemID.split('D').pop());
        data.results[i] = Math.floor(Math.random() * num) + 1;
        document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
    }
}
*/

//Old Add Die Code, pre genAdd function
/*
let ctrlAddD3 = function() {
    let type = 'D3';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD4 = function() {
    let type = 'D4';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD6 = function() {
    let type = 'D6';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD8 = function() {
    let type = 'D8';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD10 = function() {
    let type = 'D10';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD12 = function() {
    let type = 'D12';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD20 = function() {
    let type = 'D20';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
let ctrlAddD100 = function() {
    let type = 'D100';
    let newDie = resultCtrl.addDiceItem(type);
    UICtrl.addDice(newDie);
    //UICtrl.addResult(newDie);
    ctrlSum();
};
*/