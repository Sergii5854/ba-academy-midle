'use strict';
/**
 * Part of a course on Hyperledger Fabric:
 * http://ACloudFan.com
 *
 * Last Update: Dec 21, 2018
 * Tested with 0.20.5
 *
 * The modules exposes these functions:
 *
 * 1. connect - takes a callback function as an argument
 *        If Success : execute callback()
 *        Else : execute callback(error)
 * 2. disconnect
 * 3. ping - takes a callback(response, error) as an argument
 * invokes the callback.
 *
 * Purpose of this utility:
 * Boilerplate code to keep the other sample files CLEAN :)
 * You may change the constants in this code to connect to
 * your apps instead of the default airlinev7
 */


const cf = require("./../config");
console.log(cf.cardName);

module.exports = {
    // Properties used for creating instance of the BN connection
    cardStore : require('composer-common').FileSystemCardStore,
    BusinessNetworkConnection : require('composer-client').BusinessNetworkConnection,
    // Used for connect()
    cardName : cf.cardName,

    // Holds the Business Network Connection
    connection: {},

    // 1. This is the function that is called by the app
    connect : function(callback) {

        // Create instance of file system card store

        // Composer 0.19.0 Change
        //const cardStore = new this.cardStore();
        //this.connection = new this.BusinessNetworkConnection({ cardStore: cardStore });
        var cardType = { type: 'composer-wallet-filesystem' }
        this.connection = new this.BusinessNetworkConnection(cardType);

        // Invoke connect
        return this.connection.connect(this.cardName).then(function(){
            callback();
        }).catch((error)=>{
            callback(error);
        });
    },

    // 2. Disconnects the bn connection
    disconnect : function(callback) {
        this.connection.disconnect();
    },

    // 3. Pings the network
    ping : function(callback){
        return this.connection.ping().then((response)=>{
            callback(response);
        }).catch((error)=>{
            callback({}, error);
        });
    }
}
