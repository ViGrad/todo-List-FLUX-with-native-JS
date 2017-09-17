
/**
 * return a clone of object
 * @returns clone of object
 */
/*Object.prototype.clone = function(){
  return JSON.parse(JSON.stringify(this));
  //return Object.assign([], this);
}*/

var tools = {
  
/**
 * Check if the passed value is a nubmer
 * @param {*} value value to check
 * @returns {boolean} true if value is a number
 */
  isNumber(value){
    return typeof value === "number";
  }
}