class Counter {
  constructor(value = 0, step = 1){
    typeCheck(
      [value, "number"],
      [step, "number"],
    )

    this.value = value;
    this.step = step;
  }

  getValue(){
    const value = this.value;
    
    this.next();
    
    return value;
  }

  next(){
    this.value += this.step;
  }
}