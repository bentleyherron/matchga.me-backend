import { db } from '../db/connect';


export const login = async (loginInfo: any) => {
    try {
        const email = loginInfo.email.toLowerCase();
        const result = await db.one('SELECT * FROM users WHERE LOWER(email) = $1', [email]);
        return result;
    } catch (err) {
        console.log(err);
    }

    throw new Error("Could not login user");
};