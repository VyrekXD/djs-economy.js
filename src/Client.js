import { EventEmitter } from "events"
import { EconomyError } from "./Util/EconomyError"
import { connect } from "mongoose"
import { Player } from "./Util/Player"
import PlayerModel from "./Util/PlayerModel"

export class Client extends EventEmitter {
    constructor(){
        super()

        this.connected = false
    }

    /**
     * Connect the module with mongoose
     * @param {string} url - The URI of mongodb to connect to the DB
     */
    async mongoConnect(url){
        if(!url)throw new EconomyError(`You need to put a url to connect mongo`)
        try {
            await connect(url, {
                useUnifiedTopology: true,
                useNewUrlParser: true,
                useFindAndModify: false,
                useCreateIndex: true
            })
            this.connected = true
            return this
        } catch (e) {
            new EconomyError(e)
        }
    }
    
    /**
     * Delete a player from the DB
     * @param {string} id - The ID of the user on the db
     * @returns {boolean} - If the delete of the user was succesfull it will returns a true
     */
    async deletePlayer(id){
        if(!id)throw new EconomyError(`You need to put the ID of the user`)
        try {
            let find = await PlayerModel.findOne({id})
            if(!find)throw new EconomyError(`That user isnt on the DB`)

            await PlayerModel.deleteOne({id})
            return true
        } catch (e) {
            new EconomyError(e)
        }
    }

    /**
     * Adds money to a user from the DB
     * @param {string} id - The ID of the user on the DB
     * @param {number} money - The quantity of money to be added to the user
     * @param {boolean} bank - If the money is going to the bank use true
     * @fires Client#addmoney
     */
    async addMoney(id, money, bank = false){
        if(!id)throw new EconomyError(`You need to put the ID of the user`)
        if(!money)throw new EconomyError(`You need to put the quantity of money`)
        if(isNaN(money))throw new EconomyError(`The money need to be a valid number`)
        if(money <= 0)throw new EconomyError(`The money need to be more than 0`)
        if(!isFinite(money))throw new EconomyError(`The money need to be a finite number`)

        try {
            let find = await PlayerModel.findOne({id})

            if(!find){
                if(!bank){
                    let n = new PlayerModel({id, money, total: money})
                    find = await n.save()
                } else {
                    let n = new PlayerModel({id, bank: money, total: money})
                    find = await n.save()
                }
            } else {
                await PlayerModel.updateOne({id}, {$inc: {money, total: money}})
                find = {id, money: (find.money + money), total: (find.total + money), bank: find.bank}
            }

            /**
             * @event Client#addmoney
             * @property {string} id - The ID of the user on the DB
             * @property {Player} player - The player data
             * @property {boolean} bank - If the money goes to the bank
             * @property {Date} date - The timestamp when the user recieve the money
             */
            this.emit('addmoney', (find.id, new Player(this, find)), bank, Date.now())

            find = await PlayerModel.findOne({id})
            return find 
        } catch(e){
            new EconomyError(e)
        }

    }
    /**
     * Removes money from the specified user
     * @param {string} id - The ID of the user on the DB
     * @param {number} money - The money to remove 
     * @param {boolean} bank - If the money is going to remove from the bank use true
     * @fires Client#removemoney
     */
    async removeMoney(id, money, bank = false){
        if(!id)throw new EconomyError(`You need to put the ID of the user`)
        if(!money)throw new EconomyError(`You need to put the quantity of money`)
        if(isNaN(money))throw new EconomyError(`The money need to be a valid number`)
        if(money <= 0)throw new EconomyError(`The money need to be more than 0`)
        if(!isFinite(money))throw new EconomyError(`The money need to be a finite number`)

        try {
            let find = await PlayerModel.findOne({id})
            if(!find)throw new EconomyError(`That user isnt on the DB`)

            if(!bank){
                await PlayerModel.updateOne({id}, {$inc: {money: -money, total: -money}})
            } else {
                await PlayerModel.updateOne({id}, {$inc: {bank: -money, total: -money}})
            }

            /**
             * @event Client#removemoney
             * @property {string} id - The ID of the user on the DB
             * @property {Player} player - The player data
             * @property {boolean} bank - If the money goes to the bank
             * @property {Date} date - The timestamp when the user lost the money
             */
            this.emit('removemoney', (find.id, new Player(this, find)), bank, Date.now())

            find = await PlayerModel.findOne({id})
            return find
        } catch (e) {
            new EconomyError(e)
        }
    }

    /**
     * Search a player on the DB
     * @param {string} id - The ID of the user on the DB
     * @return {Player}
     */
    async searchPlayer(id){
        if(!id)throw new EconomyError(`You need to put the ID of the user`)

        try {
            let find = await PlayerModel.findOne({id})
            if(!find)return undefined;

            return new Player(this, find)
        } catch (e) {
            new EconomyError(e)
        }
    }
}