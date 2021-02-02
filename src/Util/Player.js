import PlayerModel from "./PlayerModel"
import { Client } from "../Client"

export class Player {
    /**
     * The class of the player
     * @param {Client} client - The client of the module
     * @param {PlayerModel} data - The data of the user
     */
    constructor(client, data){
        this.client = client
        this.data = data
        this.id = data.id
        this.money = data.money
        this.totalMoney = data.total
        this.bank = data.bank
    }

    /**
     * Returns the raw data of the user on the DB
     */
    get toData(){
        return this.data
    }

    /**
     * Adds money to the user
     * @param {number} money - The quantity of money to be added to the user
     * @param {boolean} bank - If the money is going to the bank use true
     */
    async addMoney(money, bank){
        return await this.client.addMoney(this.id, money, bank)
    }

    /**
     * Deletes the actual user
     */
    async delete(){
        return await this.client.deletePlayer(this.id)
    }
    
    /**
     * Removes money from the actual user
     * @param {number} money - The money to remove 
     * @param {boolean} bank - If the money is going to remove from the bank use true
     */
    async removeMoney(money, bank){
        return await this.client.removeMoney(this.id, money, bank)
    }

}