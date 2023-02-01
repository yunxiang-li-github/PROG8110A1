const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING: Symbol("welcoming"),
    SIZE: Symbol("size"),
    TOPPINGS: Symbol("toppings"),
    SECOND_ITEM: Symbol("2nd_item"),
    SIZE2: Symbol("size2"),
    TOPPINGS2: Symbol("toppings2"),
    THIRD_ITEM: Symbol("3rd_item"),
    FILLING: Symbol("filling"),
    UPSELL: Symbol("upsell"),
    DRINKS: Symbol("drinks"),
    FRIES: Symbol("fries")
});

module.exports = class ShwarmaOrder extends Order {
    constructor() {
        super();
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sDrinks = "";
        this.sItem = "shawarama";
        this.sSize2 = "";
        this.sToppings2 = "";
        this.sItem2 = "";
        this.sUpsell = "";
        this.sItem3 = "";
        this.sFilling = "";
        this.sFries = "";
        this.cost = 0;
    }
    handleInput(sInput) {
        let aReturn = [];
        switch (this.stateCur) {
            case OrderState.WELCOMING:
                this.stateCur = OrderState.SIZE;
                aReturn.push("Welcome to Yunxiang's Restaurant.");
                aReturn.push("What size of Shawarama would you like?");
                break;
            case OrderState.SIZE:
                this.stateCur = OrderState.TOPPINGS;
                this.sSize = sInput;
                // add cost based on size of shawarama
                if(this.sSize.toLowerCase() == "small"){
                    this.cost += 10;
                }
                else{
                    this.cost += 12;
                }
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.SECOND_ITEM;
                this.sToppings = sInput;
                // add cost based on toppings of shawarama
                if(this.sToppings.toLocaleLowerCase() == "cheese"){
                    this.cost += 3;
                }
                else {
                    this.cost += 5;
                }
                aReturn.push("Would you like a Pizza?");
                break;

            case OrderState.SECOND_ITEM:
                if (sInput.toLowerCase() != "no") {
                    this.sItem2 = "pizza";
                    this.stateCur = OrderState.SIZE2;
                    aReturn.push("What size of pizza would you like?");
                    break;
                }
                // else
                this.stateCur = OrderState.THIRD_ITEM;
                aReturn.push("Would you like a Baozi?");
                break;
            case OrderState.SIZE2:
                this.stateCur = OrderState.TOPPINGS2;
                this.sSize2 = sInput;
                // add cost based on size of pizza
                if(this.sSize2.toLocaleLowerCase() == "small"){
                    this.cost += 13;
                }
                else {
                    this.cost += 15;
                }
                aReturn.push("What toppings would you like?");
                break;
            case OrderState.TOPPINGS2:
                this.stateCur = OrderState.THIRD_ITEM;
                this.sToppings2 = sInput;
                // add cost based on toppings of pizza
                if(this.sToppings.toLocaleLowerCase() == "cheese"){
                    this.cost += 3;
                }
                else {
                    this.cost += 5;
                }
                aReturn.push("Would you like a Baozi?");
                break;

            case OrderState.THIRD_ITEM:
                // if yes to 3rd item
                if (sInput.toLowerCase() != "no") {
                    this.sItem3 = "baozi";
                    this.stateCur = OrderState.FILLING;
                    aReturn.push("What filling would you like? (beef,chicken,vegetable)");
                    break;
                }
                // else
                this.stateCur = OrderState.DRINKS;
                aReturn.push("Would you like drinks with that? If yes, Enter drink name:");
                break;
            case OrderState.FILLING:
                this.stateCur = OrderState.DRINKS;
                this.sFilling = sInput;
                // add cost based on fillings of baozi
                if(this.sFilling.toLocaleLowerCase() == "beef" || this.sFilling.toLocaleLowerCase() == "chicken"){
                    this.cost += 13;
                }
                else {
                    this.cost += 10;
                }
                aReturn.push("Would you like drinks with that? If yes, Enter drink name:");
                break;

            case OrderState.DRINKS:
                if (sInput.toLowerCase() != "no") {
                    this.sDrinks = sInput;
                    this.cost += 3;
                }
                this.stateCur = OrderState.FRIES;
                aReturn.push("Would you like fries with that?");
                break;

            case OrderState.FRIES:
                if (sInput.toLowerCase() != "no") {
                    this.sFries = sInput;
                    this.cost += 4;
                }
                this.isDone(true);
                aReturn.push("Thank you for your order of");
                aReturn.push(`${this.sSize} ${this.sItem} with ${this.sToppings}`);
                if (this.sItem2) {
                    aReturn.push(`${this.sSize2} ${this.sItem2} with ${this.sToppings2}`);
                }
                if (this.sItem3) {
                    aReturn.push(`${this.sItem3} with ${this.sFilling} filling`);
                }
                if (this.sDrinks) {
                    aReturn.push(`drink: ${this.sDrinks}`);
                }
                if (this.sFries) {
                    aReturn.push(`fries: ${this.sFries}`);
                }

                aReturn.push(`the total price is: ${this.cost}`);

                let d = new Date();
                d.setMinutes(d.getMinutes() + 20);
                aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                break;
        }
        return aReturn;
    }
}