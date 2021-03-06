import { User } from "./user.interface";
import { Users } from "./users.interface";
import { db } from '../db/connect';
import { Helper } from "../utils/helpers";
import { v4 as uuidv4 } from 'uuid';

/**
 * Service Methods
 */

// Find all users
export const findAll = async (): Promise < Users > => {
    try {
        const users: Users = await db.any(`select id, username, email, nickname, city_id, joined_date, last_logged_in, player_rating, photo from users;`);
        return users;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No user records found");
};

// Find all users by city id
export const findAllByCity = async (cityId: number): Promise < Users > => {
    try {
        const users: Users = await db.any(`select id, username, email, nickname, city_id, joined_date, last_logged_in, player_rating, photo from users where city_id=$1;`, [cityId]);
        return users;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No user records found");
};

// Find a single user
export const find = async (id: number): Promise < User > => {
    try {
        const record: User = await db.one(`select id, username, email, nickname, city_id, joined_date, last_logged_in, player_rating, photo from users where id=$1;`, [id]);

        if (record) {
            delete record.password;
            delete record.uuid;
            delete record.token;
            return record;
        };

    } catch (err) {
        console.log(err)
    }
    
    throw new Error("No user record found");
};

// Check if a user exists
export const checkUser = async (user: User): Promise < User > => {
    try {
        if (user.username) {
            const usernameExists: any = await db.result(`select exists(select 1 from users where LOWER(username)=$1)`, [user.username.toLowerCase()]);
            const result: any = {usernameFound: usernameExists.rows[0].exists};
            return result;
        } else if (user.email) {
            const emailExists: any = await db.result(`select exists(select 1 from users where LOWER(email)=$1)`, [user.email.toLowerCase()]);
            const result: any = {emailFound: emailExists.rows[0].exists};
            return result;
        }

    } catch (err) {
        console.log(err)
    }
    
    throw new Error("No user record found");
};

// Create a user
export const create = async (newUser: User): Promise < void > => {
    try {
        const hashPassword: string = Helper.hashPassword(newUser.password);
        newUser.password = hashPassword;
        newUser.uuid = uuidv4();
        const result: any = await db.one(`insert into users (username, email, password, nickname, city_id, joined_date, player_rating, photo, uuid) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
                                        returning *`, 
                                    [newUser.username, newUser.email, newUser.password, newUser.nickname, newUser.city_id, new Date(), 5, newUser.photo, newUser.uuid])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};

// Update a user
export const update = async (updatedUser: User): Promise < void > => {
    try {
        const result: any = await db.result(`update users set username=COALESCE($1, username), email=COALESCE($2, email), password=COALESCE($3, password), city_id=COALESCE($4, city_id), player_rating=COALESCE($5, player_rating), photo=COALESCE($6, photo), nickname=COALESCE($7, nickname) where id=$8 returning id`, 
                        [updatedUser.username, updatedUser.email, updatedUser.password, updatedUser.city_id, updatedUser.player_rating,updatedUser.photo, updatedUser.nickname, updatedUser.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No user record found to update");
};

// Removes a user
export const remove = async (id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from users where id=$1 RETURNING *`, [id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No user record found to delete");
};