import { model, Schema } from "mongoose"

const schema = new Schema({
    id: {type: String, required: true},
    money: {type: Number, default: 0},
    total: {type: Number, default: 0},
    bank: {type: Number, default: 0}
})

export default model('players', schema)