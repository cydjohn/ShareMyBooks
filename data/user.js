userList = [  //user 1
{
"userUUID": "1",//in actual data will be much longer
"firstName": "John",
"lastName": "Doe",
"userID": "jdoe",
"passwordHash": "12345",//not hashed yet obviously
"address": "45 Elm Street New York, NY 10028",//made up the address
"email": "jdoe@gmail.com",
"phoneNumber": "2123456789",
"userPhotoID": "1",
"userTotalPoints": 16
},

//user 2
{
"userUUID": "2",//in actual data will be much longer
"firstName": "Sarah",
"lastName": "Lin",
"userID": "slin",
"passwordHash": "67890",//not hashed yet obviously
"address": "23 Madison Road San Fransisco, CA 09867",//made up the address
"email": "slin@gmail.com",
"phoneNumber": "9173247653",
"userPhotoID": "2",
"userTotalPoints": 16
},

  //user 3
{
"userUUID": "3",//in actual data will be much longer
"firstName": "Sam",
"lastName": "Thompson",
"userID": "sthompson",
"passwordHash": "24680",//not hashed yet obviously
"address": "45 Washington Street Hoboken, NJ 10028",//made up the address
"email": "sthompson@gmail.com",
"phoneNumber": "9175675478",
"userPhotoID": "3",
"userTotalPoints": 22
},

  //user 4
{
"userUUID": "4",//in actual data will be much longer
"firstName": "Lisa",
"lastName": "Johnson",
"userID": "ljohnson",
"passwordHash": "13579",//not hashed yet obviously
"address": "32 Pine Tree Road Ithaca, NY 14850",//made up the address
"email": "ljohnson@gmail.com",
"phoneNumber": "9172134543",
"userPhotoID": "4",
"userTotalPoints": 16
},

  //user 5
{
"userUUID": "5",//in actual data will be much longer
"firstName": "Jane",
"lastName": "Anderson",
"userID": "janderson",
"passwordHash": "abcde",//not hashed yet obviously
"address": "123 Cactus Lane Houston,TX 23415",//made up the address
"email": "janderson@gmail.com",
"phoneNumber": "9178736475",
"userPhotoID": "5",
"userTotalPoints": 16
}];


let exportedMethods = {
    getAllUsers() {
        return Promise.resolve(userList);
    },
    addUser(user) {
        for (let i = 0; i < userList.length; i++) {
            if (userList[i].email == user.email) {
                let duplicateEmail = { duplicate: true }
                return Promise.resolve(duplicateEmail);
            }
        }
        let newUser = userList.push(user);
        newUser.id = userList.length;
        return Promise.resolve(newUser);
    },
    getUserById(id) {
        if (id === undefined) return Promise.reject("No id provided");

        let user = userList.filter(x => x.id == id).shift();
        return new Promise((resolve, reject) => {
            if (!user) {
                reject("No product found")
            } else {
                resolve(user)
            }
        });

    }
}

module.exports = exportedMethods;