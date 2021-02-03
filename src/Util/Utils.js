import { EconomyError } from "./EconomyError.js"
import PlayerModel from "./PlayerModel"

/**
* Checks the params
* @param {any} param - The param of the function
* @param {string} type - The type to check
* @param {string} message - The message if the param is undefined
* @param {string} message2 - The message if the param is not an string
* @private
*/
export function checkParam(param, type ,message, message2) {
    if(!param)throw new EconomyError(message)
    if((typeof param) !== type)throw new EconomyError(message2)
    return true
}

/**
 * Check if mongo is connected
 * @param {object} _this - The instance
 * @private
 */
export function isConnected(_this){
    if(!_this.connected)throw new EconomyError(`You need to connect mongoDB first`)
    return true
}

/**
 * Checks if the player exist, if not create a new player and returns the new data
 * @param {string} id - The ID of the user
 * @private
 */
export async function checkPlayer(id, money = 0, bank = 0){
    if(!checkParam(id, `INTERNAL_ERROR: The id of the user is undefined in funcion: checkPlayer`, `INTERNAL_ERROR: The id is not a string`))return;

    try {
        let find = await PlayerModel.findOne({id})
        if(!find){
            let n = new PlayerModel({id, money, bank, total: (money + bank)})
            n.save()
            find = await PlayerModel.findOne({id})
        }
        return find
    } catch (e) {
        throw new EconomyError(e)
    }
}