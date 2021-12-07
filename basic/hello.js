// const myTechStack = ['NodeJs', 'ReactJs', 'Firebase']; // It is recommended that you use camelcase for variable name
// const myTechStatus = myTechStack.map(stack => {
//     return {
//         name: stack,
//         status: 'not-finished'
//     }
// });
// console.log(myTechStatus);
//
// // Filter only unique item
// const list = [11, 24, 31, 24, 11, 56, 34];
// const onlyUnique = (value, index, self) => {
//     return self.indexOf(value) === index;
// }
// const filterList = list.filter(onlyUnique);
// console.log(filterList);
//

// //--------------------------------------------
// const getUser = () => {
//     // Mimic the process that we may retrieved the user data from the web somewhere
//     const user = {
//         id: 1,
//         name: "John Doe",
//         status: 'active'
//     };
//     // return the user object
//     return user;
// };

// const {name, status} = getUser(); // You can use DA to extract only needed info
// console.log(name, status);
//
// const logInfo = ({name, age = 19}) => { // default argument with age = 19
//     console.log(`Hi, I'm ${name}. I'm ${age}`);
//     return `Hello, I'm ${name}. I'm ${age}`;
// };
// // With destruction parameter, you can swap the parameters order as you like
// console.log(logInfo({age: 19, name: "John Doe"}));


//--------------------------------------------
// const person = {
//     id: 1,
//     name: "John Doe",
// };
//
// const job = {job: 'NodeJs Developer'};
// const mergePerson = {...person, ...job};
// console.log(mergePerson);
//
// // You can use this to pick/omit fields from object
// const post = {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
// };
//
// const {userId, id, ...otherInfo} = post; // post object should contain only title and body
// console.log(post);


//----------------------------------------------
// const delay = ms => new Promise(res => setTimeout(res, ms));
//
// const promise1 = async () => {
//     await delay(1000);
//     console.log("Promise 1 executed")
// };
//
// const promise2 = async () => {
//     await delay(3000)
//     console.log("Promise 2 executed")
// };
//
// // Consider this to be a controllers
// (async () => {
//     try {
//         const start = new Date();
//         await Promise.all([
//             promise2(),
//             promise1()
//         ]);
//         const end = new Date() - start
//         console.info('Execution time: %dms', end) // This will take 3s only
//     } catch (e){
//         console.log("Got an error here")
//     }
// })();


//--------------------------------------------------
// async function hello() {
//     return await Promise.resolve("Hello"); //await sẽ tạm dừng mã cho đến khi Promise hoàn thành
// };
//
// // hello().then((value) => console.log(value))
// hello().then(console.log);

// //-------------------------------------------------- //Callback and callback hell
// function getData(callback) {
//     setTimeout(() => {
//         const data = [
//             {id: 1, name: "Developer A"},
//             {id: 2, name: "Devloper B"}
//         ]; // Assume the data from API
//
//         callback(data); //Callback là cách đảm bảo code sẽ không hoạt động trước khi các code khác hoàn thành việc thực thi.
//                         //Không có data thì hàm k hàm k hoạt động tại các function khác gọi đến
//     }, 1000)
// }
// //
// // getData((data) => {
// //     const names = data.map(data => data.id);
// //     console.log(typeof(names));
// // });
//
// /**
//  * Fake like we are submitting the data to an API elsewhere
//  *
//  * @param inputData
//  * @param callback
//  */
// function submitData (inputData, callback) {
//     console.log('starting to submit');
//     setTimeout(() => {
//         // Act like we submit the inputData to the server and takes 1s
//         const status = randomStatus();
//         callback({
//             success: status
//         });
//     }, 1000)
// }
//
// /**
//  * Just a helper random the result of the submit: success or failed
//  *
//  * @returns {boolean}
//  */
// const randomStatus = () => [true, false][Math.floor(Math.random() * 2)];
//
// // Main body of the example
// getData((data) => {
//     const names = data.map(data => data.name);
//     console.log(names)
//     submitData(names, (response) => {
//         const {success} =  response;
//         if (success === true) {
//             console.log("This is a successful form")
//         } else {
//             console.log("This is a failed form")
//         }
//     })
// });

//----------------------------------------Promise
/**
 * Asynchronous programming with Promise
 */
function getData() {
    return new Promise((resolve, reject) => {
        const data = [
            {id: 1, name: "Developer A"},
            {id: 2, name: "Devloper B"}
        ];

        setTimeout(() => {
            resolve(data);
        }, 1000);
    });
}

/**
 * Fake like we are submitting the data to an API elsewhere
 *
 * @param inputData
 */
function submitData (inputData) {
    console.log('starting to submit');

    return new Promise((resolve, reject) => {
        // Act like we submit the inputData to the server and takes 1s
        const status = randomStatus();

        setTimeout(() => {
            resolve({
                success: status
            });
        }, 1000);
    });
}

/**
 * Just a helper random the result of the submit: success or failed
 *
 * @returns {boolean}
 */
const randomStatus = () => [true, false][Math.floor(Math.random() * 2)];

// Main body of the example
// getData().then(data => {
//     const names = data.map(data => data.name);
//     console.log(names);
//     submitData(names).then(response => {
//         const {success} =  response;
//         if (success === true) {
//             console.log("This is a successful form")
//         } else {
//             console.log("This is a failed form")
//         }
//     });
// });

(async () => {
    const data = await getData();
    const names = data.map(data => data.name);
    console.log(names);
    const {success} = await submitData(names);
    if (success === true) {
        console.log("This is a successful form")
    } else {
        console.log("This is a failed form")
    }
})();


