const bnUtil = require('../util/bn-connection-util');

module.exports = {

    connect: function connect(studentNamespace,resourceName ) {
        var registry = {}

        return bnUtil.connection.getAssetRegistry(studentNamespace + '.' + resourceName).then((reg) => {
            registry = reg;

            console.log('Received Registry: ', registry.id);

            return registry.getAll();
        }).then((studentsObjects) => {
            bnUtil.disconnect();
            students = JSON.stringify(studentsObjects);
        }).catch((error) => {
            console.log(error);
            bnUtil.disconnect();
        });
    },

    hello: ()=> console.log("hello "),
    b: ()=> console.log("b ______________________ "),

}
