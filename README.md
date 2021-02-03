<p align="center">
<img src="https://nodei.co/npm/djs-economy.js.png?downloads=true&downloadRank=true&stars=true"/>
<br>
</br>
<img src="https://img.shields.io/npm/v/djs-economy.js/latest?color=%23FF0000&style=for-the-badge" />
<img src="https://img.shields.io/npm/l/djs-economy.js?color=%23FF0000&style=for-the-badge" />
</p>

# djs-economy.js

A economy for discord

# Contents
- [Installation](#installation)
- [Overview](#overview)
- [Usage](#usage)
  - [Constructor](#constructor)
  - [Methods](#methods)
  - [Events](#events)
- [Example](#example)

## Installation

```
npm install djs-economy.js
```

## Overview

djs-economy.js helps you to make a easy economy for your discord server, 
the only thing you need is a mongodb cluster, 
but don't worry I already did that for you

## Usage

### Constructor

`Client()`

```js
new Client()
```

### Methods

**Client**

|        Method        |   Parameter  |   Type        |               Description                |    Default    |     Notes     |
| :------------------: | :-----------------: |:-----------------: | :-------------------------------------:  | :-----------: |  :---------:  |
|    `mongoConnect`    | url |     string         |             Connect mongoDB              |      n/a      |               |
|    `deletePlayer`    |  id |    string         | Delete a player from the DB using his ID |      n/a      |               |
|      `addMoney`      | id/money/bank  |string/number/boolean|Addmoney to a user using his ID the money, and if it is for the bank|    n/a    |Emits the addmoney event|
|      `removeMoney`     | id/number/bank |string/number/boolean|Remove money to a user using his ID the money, and if it is for the bank|      n/a      |Emits the removemoney event|
|       `searchPlayer`       | id  |       string           |   Search a user using his ID     |      n/a      | It returns the class Player  |
|    `pay`    |   player1/player2/money/bank   | string/string/number/boolean  |   Pays a user, and if it is the money to the bank    |   n/a \| n/a \| n/a \|false  | |

**Player**

|        Method        |  Parameter  |    Type     |               Description               |     Default      |     Notes     |
| :------------------: |:----------: |:--------------: | :-------------------------------------: | :-----------: |  :---------:  |
|      `toData`        |    n/a      |  n/a        | Returns the raw data of the user |     n/a      |Its a getter no function|
|    `addMoney`        | money/bank  | number/boolean      | Adds the money to the actual user, and if it is for the bank |   n/a |false    |        |
|      `removeMoney`   |  money/bank   | number/boolean  |   Removes the money to the actual user, and if it is for the bank    |    n/a |false   ||
|      `delete`        |      n/a      | n/a  |   Deletes the actual user    |      n/a      | |
|      `pay`        |      id/money/bank      | string/number/boolean  |   Pays a user, and if it is the money to the bank    |   n/a \| n/a \|false  |      |
### Events

**addmoney**

|  Parameter  |    Type     |               Description               |
|:----------: |:--------------: | :-------------------------------------: |
|    id      |  string        | The ID of the user |
| player  | Player      | The actual user in the class Player |
|  bank   | boolean  |  If the money is going to the bank is true    |
|      date      | Date  |   The timestamp when the user got the money    |

**removemoney**

|  Parameter  |    Type     |               Description               |
|:----------: |:--------------: | :-------------------------------------: |
|    id      |  string        | The ID of the user |
| player  | Player      | The actual user in the class Player |
|  bank   | boolean  |  If the money is removing from the bank is true    |
|      date      | Date  |   The timestamp when the user lost the money    |

## Example

```js
import { Client } from "djs-economy.js"

const Economy = new Client()
.mongoConnect(`mongodb+srv://<user>:<password>@<cluster>.<port>.mongodb.net/<dbname>?retryWrites=true&w=majority`)

if(command === 'work'){
    message.reply(`You won 100$`)

    Economy.addMoney(message.author.id, 100)
}

```

More examples are coming...