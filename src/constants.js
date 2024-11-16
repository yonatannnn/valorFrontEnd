import { collection } from "firebase/firestore";
import { firestore } from "./config/firebase";


export const profile_pictures = collection(firestore, "profile_pictures");
