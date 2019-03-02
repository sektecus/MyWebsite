
/******************************************************/
//RESULTS CONTROLLER

let resultController = (function() {


//Track IDs for dice and values
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

    let data = {
        type: [],
        id: [],
        results: []
    }

    let bank = [];

// Sum dice totals
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

        storeBank: function(total) {
            bank.push(total);
        },

        roll: function() {
            data.results = [];
            
            for(let i = 0; i < data.type.length; i++) {
                if(data.type[i] === 'dx') {
                    data.results[i] = 0;
                }else {
                    let itemID, num;
                    itemID = data.type[i]; 
                    num = parseInt(itemID.split('D').pop());
                    data.results[i] = Math.floor(Math.random() * num) + 1;
                    document.getElementById(`value__${data.id[i]}`).textContent = `${data.results[i]}`;
                }
           }
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
        
        clearBank: function() {
            bank = [];
        }
    }


})();

//END RESULTS
/******************************************************/

/******************************************************/
//UI CONTROLLER

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
        rollBtn: '.roll-dice',
        sumID: 'sum',
        container: '.pool',
        clear: '.clearPage',
        poolTarget: 'dicePoolTarget',
        deleteDie: 'deleteDie',
        bank: '.bank-total',
        save: '.save-total'
    };


    return {
        addDice: function(obj){
            $('.dice-banner').empty();
            let element = DOMstrings.diceColumn
            let html = '<div class="added-dice" id="%type%__%id%"><button class="deleteDie" id="deleteDie">Delete</button>%type% ----> <span class="added-result" id="value__%id%">%value%</span></div>'
            html = html.replace('%id%', obj.id);
            html = html.replace('%id%', obj.id);
            //html = html.replace('%id%', obj.id);
            html = html.replace('%type%', obj.type);
            html = html.replace('%type%', obj.type);
            html = html.replace('%value%', obj.value);
            return document.querySelector(element).insertAdjacentHTML('beforeend', html)
        },
        bankTotal: function(total) {
            $('.locked-banner').empty();
            let element = DOMstrings.lockedColumn;
            let html = `<div class="added-total">${total}</div>`;
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
            return document.getElementById(element).textContent = `${sumPool} <= Pool Total | Bank Total => ${sumBank}`;
        },

        deleteDice: function(selectorID) {
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el); 
        },

        clearDice: function() {
            //console.log('Enter code to clear page here');
            let element = DOMstrings.diceColumn;
            $(element).empty();
            let html = '<p class="dice-banner">Click dice buttons (above) to add them to your pool</p>'
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        clearBank: function() {
            let element = DOMstrings.lockedColumn;
            $(element).empty();
            let html = '<p class="locked-banner">Click "Bank" buttons (above) to store your current total</p>'
            document.querySelector(element).insertAdjacentHTML('beforeend', html);
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    }

})();

//END UI
/******************************************************/

/******************************************************/
//GLOBAL APP CONTROLLER

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
            document.querySelector(DOM.container).addEventListener('click', ctrlDel);
            document.querySelector(DOM.clear).addEventListener('click', ctrlClear);
            document.querySelector(DOM.bank).addEventListener('click', ctrlBank);
            document.querySelector(DOM.save).addEventListener('click', ctrlSave);
            document.querySelector(DOM.dxAdd).addEventListener('click', ctrlAddDx);
        }
        
    };
    let ctrlAddDx = function() {
        let input = document.querySelector('#user').value;
        if(input) {
            input = input;
        }else {
            input = 0;
        }
        let type = `D${input}`;
        let newDie = resultCtrl.addDiceItem(type, input);
        UICtrl.addDice(newDie);
        ctrlSum();
    }
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
        //console.log('old code');
        //type = itemType;
        itemID = event.target.parentNode.id;
        console.log(itemID);
        //alert(`The id of the element you click is ${itemID}`);
        
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
        UICtrl.bankTotal(total);
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
        UICtrl.bankTotal(total);
        resultCtrl.storeBank(total);
        ctrlSum();
    }

    let ctrlClear = function() {
        UICtrl.clearDice();
        resultCtrl.clearData();
        UICtrl.clearBank();
        resultCtrl.clearBank();
        ctrlSum();
        
    };

    return {
        init: function() {
            console.log('Application has started...')

            //1. Clear dice pool

            //2. Setup event listeners
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