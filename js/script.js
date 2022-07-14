const Calculator = {
    add(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a + b;
    },

    substract(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a - b;
    },

    multiply(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a * b;
    },

    divide(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a / b;
    },

    power(a,b) {
        a = this.checkInput(a);
        b = this.checkInput(b);
        return a ** b;
    },

    checkInput(input) {
        if (typeof input !== 'number') {
            return parseInt(input);
        }
        return input;
    },

    operate(a,b,operator) {
        switch(operator) {
            case '+': this.add(a,b);
            case '-': this.substract(a,b);
            case '*': this.multiply(a,b);
            case '/': this.divide(a,b);
            case '**': this.power(a,b);
            default: console.log('empty choice');
        }
    }


}

