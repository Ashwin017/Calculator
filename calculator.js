function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(operator, num1, num2) {
    var score;
    if(operator == '+') {
       score = add(num1, num2);
    } else if(operator == '-') {
       score = subtract(num1, num2);
    } else if(operator == '*') {
        score = multiply(num1, num2);
    } else if(operator == '/') {
        score = divide(num1, num2);
    }
    return score;
}

const history = document.querySelector('.history');
const result = document.querySelector('.result');
const digits = document.querySelectorAll('.digit');
const dot = document.querySelector('.dot');
const operators = document.querySelectorAll('.operator');
const equal = document.querySelector('.equal');
const purge = document.querySelector('.purge');
const tooltip = document.querySelector('.tooltiptext');

var ops = '';
var selections = [];
var nums = '';
var resultStore = '';
var nextRound = [];

function clear() {
    ops = '';
    selections = [];
    nums = '';
    history.textContent = '';
    resultStore = '';
    result.textContent = 0;
    nextRound = [];
}

purge.addEventListener('click', () => {
    clear();    
});

digits.forEach(button => {
    button.addEventListener('click', (e) => {
        history.textContent += e.target.textContent;
        resultStore += e.target.textContent;
        result.textContent = resultStore;
        nums += e.target.textContent;
        if(ops == '/' && nums == '0') {
            tooltip.setAttribute('style', 'visibility: visible; opacity: 1;');
            clear();
            setTimeout(() => { 
                tooltip.setAttribute('style', 'visibility: hidden; opacity: 0;');
            }, 3000);
        }
        if(nums.includes('.')) {
            dot.setAttribute('disabled', true);
        }
        if(nums.length > 12) {
            button.removeEventListener('click', (e) => {
                history.textContent += e.target.textContent;
                resultStore += e.target.textContent;
                result.textContent = resultStore;
                nums += e.target.textContent;
            });
        }
    });
});

operators.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        dot.removeAttribute('disabled');
        if(nextRound[0] === undefined) {
            if(selections[0] === undefined) {
                history.textContent += e.target.textContent;
                resultStore = '';
                selections.push(Number(nums));
                nums = '';
                ops = e.target.textContent;
            } else if(selections[0]) {
                selections.push(Number(nums));
                var outcome = operate(ops, selections[0], selections[1]);
                if(Number.isInteger(outcome)) {
                    result.textContent = outcome;
                } else {
                    result.textContent = outcome.toFixed(2);
                }
                nextRound.push(parseFloat(result.textContent));
                history.textContent += e.target.textContent;
                ops = e.target.textContent;
                resultStore = '';
                selections = [];
                selections.push(nextRound[nextRound.length-1]);
                nums = '';
            }
        } else if(nextRound[0]) {
            history.textContent += e.target.textContent;
            resultStore = '';
            selections = [];
            selections.push(nextRound[nextRound.length-1]);
            ops = e.target.textContent;
            nums = '';
        }
    });
});

equal.addEventListener('click', () => {
    selections.push(Number(nums));
    var outcome = operate(ops, selections[0], selections[1]);
    if(Number.isInteger(outcome)) {
        result.textContent = outcome;
    } else {
        result.textContent = outcome.toFixed(2);
    }
    nextRound.push(parseFloat(result.textContent));
    nums = '';
});

// keyboard support

window.addEventListener('keydown', (e) => {
    if(e.keyCode == 8) {
        clear();
    } else if(
        e.keyCode == 97 ||
        e.keyCode == 98 ||
        e.keyCode == 99 ||
        e.keyCode == 100 ||
        e.keyCode == 101 ||
        e.keyCode == 102 ||
        e.keyCode == 103 ||
        e.keyCode == 104 ||
        e.keyCode == 105 ||
        e.keyCode == 96 ||
        e.keyCode == 190
    ) {
        history.textContent += String(e.key);
        resultStore += String(e.key);
        result.textContent = resultStore;
        nums += String(e.key);
        if(ops == '/' && nums == '0') {
            tooltip.setAttribute('style', 'visibility: visible; opacity: 1;');
            clear();
            setTimeout(() => { 
                tooltip.setAttribute('style', 'visibility: hidden; opacity: 0;');
            }, 3000);
        }
        if(nums.includes('.')) {
            dot.setAttribute('disabled', true);
        }
        if(nums.length > 12) {
            history.textContent += String(e.key);
            resultStore += String(e.key);
            result.textContent = resultStore;
            nums += String(e.key);
        }
    } else if(
        e.keyCode == 111 ||
        e.keyCode == 106 ||
        e.keyCode == 109 ||
        e.keyCode == 107
    ) {
        dot.removeAttribute('disabled');
        if(nextRound[0] === undefined) {
            if(selections[0] === undefined) {
                history.textContent += String(e.key);
                resultStore = '';
                selections.push(Number(nums));
                nums = '';
                ops = String(e.key);
            } else if(selections[0]) {
                selections.push(Number(nums));
                var outcome = operate(ops, selections[0], selections[1]);
                if(Number.isInteger(outcome)) {
                    result.textContent = outcome;
                } else {
                    result.textContent = outcome.toFixed(2);
                }
                nextRound.push(parseFloat(result.textContent));
                history.textContent += String(e.key);
                ops = String(e.key);
                resultStore = '';
                selections = [];
                selections.push(nextRound[nextRound.length-1]);
                nums = '';
            }
        } else if(nextRound[0]) {
            history.textContent += String(e.key);
            resultStore = '';
            selections = [];
            selections.push(nextRound[nextRound.length-1]);
            ops = String(e.key);
            nums = '';
        }
    } else if(e.keyCode == 13) {
        selections.push(Number(nums));
        var outcome = operate(ops, selections[0], selections[1]);
        if(Number.isInteger(outcome)) {
            result.textContent = outcome;
        } else {
            result.textContent = outcome.toFixed(2);
        }
        nextRound.push(parseFloat(result.textContent));
        nums = '';
        resultStore = '';
    }
});

// window.addEventListener('keydown', (e) => {
//     console.log(e.keyCode);
    
// })