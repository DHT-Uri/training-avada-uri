const admin = require('firebase-admin');
const serviceAccount = require('../../../../firestore/serviceAccount.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const todos = [];

const getData = async () => {
    const snapshot = await db.collection("Todoes").get();
    return snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    });
}

/**
 *
 * * @returns todos
 */
function getAll() {
    return getData();
}

/**
 *
 * @param data
 */
async function add(data) {
    try {
        db.collection("Todoes").add(data)
            .then(() => {
                return true;
            })
            .catch((error) => {
                console.error(error);
                return false;
            });
    }catch (e) {
        console.error(e);
        return false;
    }
}

/**
 *
 * @param id
 * @param data
 * @returns {Promise<FirebaseFirestore.WriteResult>|{message, status: boolean}}
 */
async function update(id, data) {
    try{
        return await db.collection("Todoes").doc(id).update(data);
    }catch (e) {
        return {
            status: false,
            message: e
        }
    }
}

/**
 *
 * @param id
 */
async function remove(id) {
    return await db.collection("Todoes").doc(id).delete();
}

module.exports = {
    getAll,
    add,
    update,
    remove
};