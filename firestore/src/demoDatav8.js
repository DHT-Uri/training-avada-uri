const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccount.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

(async () => {

    // let data = [];
    // await db.collection("Todoes").get().then((querySnapshot) => {
    //     querySnapshot.forEach((doc) => {
    //         data = [{id: doc.id, todo: doc.data().todo, isCompleted: doc.data().isCompleted}, ...data];
    //     });
    // }).then(() => {
    //     console.log(data);
    // })

    //------------------------------------------------------add
    // Add a new document in collection "cities" - Id = doc
    // await db.collection("cities").doc("LA").set({
    //     name: "Los Angeles",
    //     state: "CA",
    //     country: "USA"
    // })
    //     .then(() => {
    //         console.log("Document successfully written!");
    //     })
    //     .catch((error) => {
    //         console.error("Error writing document: ", error);
    //     });

    //------------------------------------------------------add
    // Add a new document in collection "posts" - Id = auto
    // const postRef = db.collection("posts");
    // await postRef.add({
    //     title: "This is a title 2",
    //     body: "This is a body 2"
    // })
    //     .then(() => {
    //         console.log("Successfully added");
    //     })
    //     .catch((error) => {
    //         console.error(error);
    //     })

    //------------------------------------------------------update
    // const washingtonRef = db.collection("cities").doc("LA");
    //
    // // Update file "name" field of the city id 'LA'
    // return washingtonRef.update({
    //     name: "VietNam"
    // })
    //     .then(() => {
    //         console.log("Document successfully updated!");
    //     })
    //     .catch((error) => {
    //         // The document probably doesn't exist.
    //         console.error("Error updating document: ", error);
    //     });

    //------------------------------------------------------delete
    // db.collection("cities").doc("DC").delete()
    //     .then(() => {
    //         console.log("Document successfully deleted!");
    //     }).catch((error) => {
    //         console.error("Error removing document: ", error);
    //     });

    //------------------------------------------------------delete filed
    // var cityRef = db.collection('cities').doc('BJ');
    //
    // // Remove the 'capital' field from the document
    // var removeCapital = cityRef.update({
    //     capital: firebase.firestore.FieldValue.delete()
    // });


    //------------------------------------------------------transactions
    // Nhóm nhiều hoạt động thành một
    // (Hữu ích khi muốn cập nhật giá trị của một field dựa trên giá trị hiện tại của nó hoặc giá trị của một số field khác.)

    // Create a reference to the SF doc.
    // const sfDocRef = db.collection("cities").doc("LA");
    //
    // db.runTransaction((transaction) => {
    //     return transaction.get(sfDocRef)
    //         .then((sfDoc) => {
    //             if (!sfDoc.exists) {
    //                 throw "Document does not exist!";
    //             }
    //
    //             const newPopulation = sfDoc.data().population + 1;
    //             if (newPopulation <= 1000000) {
    //                 transaction.update(sfDocRef, { population: newPopulation });
    //                 return newPopulation;
    //             } else {
    //                 return Promise.reject("Sorry! Population is too big.");
    //             }
    //         });
    //     }).then((newPopulation) => {
    //         console.log("Population increased to ", newPopulation);
    //     }).catch((err) => {
    //         // This will be an "population is too big" error.
    //         console.error(err);
    //     });

    //------------------------------------------------------Batched writes
    // (Nếu không cần get bất kỳ data nào, có thể thực hiện nhiều thao tác ghi dưới dạng một batch)

    // Get a new write batch
    // const batch = db.batch();
    //
    // // Set the value of 'NYC'
    // const nycRef = db.collection("cities").doc("NYC");
    // batch.set(nycRef, {name: "New York City"});
    //
    // // Update the population of 'NYC'
    // const sfRef = db.collection("cities").doc("NYC");
    // batch.update(sfRef, {"population": 1000000});
    //
    // // Delete the city 'CE'
    // const laRef = db.collection("cities").doc("CE");
    // batch.delete(laRef);
    //
    // // Commit the batch
    // batch.commit().then(() => {
    //     console.log("Batch successfully committed");
    // });
})();
