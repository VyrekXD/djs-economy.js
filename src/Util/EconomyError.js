export class EconomyError extends Error {
    /**
     * The util error class for the module
     * @param {string} m - The message that will show on the error
     * @private
     */
    constructor(m){
        super()

        this.message = m
        this.name = `EconomyError`
    }
}