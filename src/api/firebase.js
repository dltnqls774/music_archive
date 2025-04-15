import {v4 as uuid} from 'uuid';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged  } from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export async function addNewProduct(product,imageUrl){
    const id = uuid();
    return set(ref(database, `products/${uuid(id)}`), {
        ...product,
        id,
        price: parseInt(product.price),
        image:imageUrl,
        title: product.title.split('-'),
    })
}

export async function getProducts(){
    return get(ref(database, 'products')).then(snapshot => {
        if(snapshot.exists()) {
            return Object.values(snapshot.val());
        }
        return [];
    })
}

export async function getCart(userId) {
    return get(ref(database, `carts/${userId}`))
    .then(snapshot => {
        const items = snapshot.val() || {};
        return Object.values(items);
    })
}

export async function addOrUpdateToCart(userId, product) {
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

export async function removeFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}

export function login(){
    signInWithPopup(auth, provider)
    .catch(console.error);
}

export function logout(){
    signOut(auth).catch(console.error);
}

export function onUserStarteChange(callback){
    onAuthStateChanged(auth, async (user) => {
        const updatedUser = user ? await adminUser(user) : null;
        callback(updatedUser);
    });
}

async function adminUser(user) {
    return get(ref(database, 'admins'))
    .then((snapshot) => {
        if(snapshot.exists()) {
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.uid);
            return {...user, isAdmin}
        }

        return user;
    })
}

