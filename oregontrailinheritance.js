
class Traveler {
    constructor(name){
        this.nome       = name
        this._food      = 1
        this._isHealthy = true
    }
    get food (){
        return this._food
    }
    set food (newFood){
        this._food=newFood
        return newFood
    }

    get isHealthy (){
        return this._isHealthy
    }
    set isHealthy (bool){
        return this._isHealthy=bool
    }
    hunt () {
        this.food+=2
        return this.food
    }
    eat () {
        if(this.food>0){
            this.food-=1
            return this.food
        }
        else{
            this._isHealthy=false
            return `${this.name} is sick!`
        }
    }
    
}


class Doctor extends Traveler {
    constructor(name){
        super(name)
        this._food = 1
        this._isHealthy = true
    }
    heal(traveler){
        traveler.isHealthy = true
    }
}


class Hunter extends Traveler {
    constructor(name){
        super(name)
        this._food = 2
        this._isHealthy = true
    }
    
    hunt(){
        this._food +=5
    }
    eat(){
        if(this.food>2){
            this.food-=2
            return this.food
        }
        else{
            this.food=0
            this.isHealthy=false
            return `${this.name} is sick!`
        }
    
    }
    giveFood(traveler, howMuchFood){
        if(this.food>0){
            traveler.food += howMuchFood
            this.food -= howMuchFood
            return this.food
        }
        else{
            if(this.food===0){
                this.isHealthy=false
                return `${this.name} is sick!`
            }
            else{
                this.isHealthy=false
                return `${this.name} is sick!`
            }
        }
    }
}

class Wagon {
    constructor (capacity){
        this.capacity=capacity
        this._passagers=[]
    }
    get passagers(){
        return _passagers
    }
    getAvailableSeatCount () {
        return this.capacity-this._passagers.length
    }
    join (newPassager){
        if(this.getAvailableSeatCount()>0){
            this._passagers.push(newPassager)
            return this._passagers
        }
        else{
            return `${this.name} has no more open seats`
        }
    }

    shouldQuarantine () {
        for (let i=0 ; i<this._passagers.length ; i++ ){
            // console.log(this._passagers[i])
            if (this._passagers[i].isHealthy===false){
                return true
            }
        }
        return false
    }
    totalFood () {
        let totalFood = 0
        for (let i=0 ; i<this._passagers.length ; i++ ){
            totalFood+=this._passagers[i].food
        }
        return totalFood
    }
}


// Código Teste(Não modificar)

// Cria uma carroça que comporta 4 pessoas
let wagon = new Wagon(4);
// Cria cinco viajantes
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');

console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);

wagon.join(maude); // Não tem espaço para ela!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);

console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);

sarahunter.hunt(); // pega mais 5 comidas
drsmith.hunt();

console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);

henrietta.eat();
sarahunter.eat();
drsmith.eat();
juan.eat();
juan.eat(); // juan agora está doente (sick)

console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);

drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
console.log(sarahunter.food)
sarahunter.giveFood(juan, 4);
console.log(sarahunter.food)
sarahunter.eat(); // Ela só tem um, então ela come e fica doente
console.log(sarahunter.food)
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);