import { EventEmitter } from "events"

/**
 * Represent the error from the djs-economy.js module
 */
declare class EconomyError extends Error {}

/**
 * The raw data of a user
 */
interface PlayerModel {
    id: string,
    money: number,
    total: number,
    bank: number
}

declare class Player {
    /**
     * The client of the module
     */
    private client: Client;
    /**
     * The data of the player
     */
    private data: PlayerModel;

    /**
     * The class of a specified user
     * @param client - The client of the module
     * @param data - The player raw data
     */
    constructor(client: Client, data: PlayerModel);

    /**
     * Adds money to the user
     * @param money - The quantity of money to be added to the user
     * @param bank - If the money is going to the bank use true
     */
    public addMoney(money: number, bank: boolean): Promise<PlayerModel>

    /**
     * Get the raw data of an user
     */
    public toData(): Promise<PlayerModel>

    /**
     * Removes money from the actual user
     * @param money - The money to remove 
     * @param bank - If the money is going to remove from the bank use true
     */
    public removeMoney(money: number, bank: boolean): Promise<PlayerModel>

    /**
     * Deletes the actual user
     */
    public delete(): Promise<Boolean>
}

declare class Client extends EventEmitter {
    /**
     * If the module is connected to mongodb
     */
    public connected: boolean

    constructor();

    /**
     * Connect the module with mongoose
     * @param url - The URI of mongodb to connect to the DB
     */
    public mongoConnect(url: string): Promise<Client>

    /**
     * Removes money from the specified user
     * @param id - The ID of the user on the DB
     * @param money - The money to remove 
     * @param bank - If the money is going to remove from the bank use true
     * @fires Client#removemoney
     */
    public removeMoney(id: string, money: number, bank: boolean): Promise<PlayerModel>

    /**
     * Delete a player from the DB
     * @param id - The ID of the user on the db
     * @returns - If the delete of the user was succesfull it will returns a true
     */
    public deletePlayer(id): boolean

    /**
     * Adds money to a user from the DB
     * @param id - The ID of the user on the DB
     * @param money - The quantity of money to be added to the user
     * @param bank - If the money is going to the bank use true
     * @fires Client#addmoney
     */
    public addMoney(id: string, money: number, bank: boolean): Promise<PlayerModel>

    /**
     * Search a player on the DB
     * @param id - The ID of the user on the DB
     */
    public searchPlayer(id: string): Promise<Player>
}

declare module "djs-economy.js" {
    export {
        Client,
        Player
    }
}