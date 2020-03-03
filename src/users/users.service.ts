import { User } from "./user.interface";
import { Users } from "./users.interface";
import { db } from '../db/connect';

/**
 * Service Methods
 */

// Find all users
export const findAll = async (): Promise < Users > => {
    try {
        const users: Users = await db.any(`select * from users;`);
        return users;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No user records found");
};

// Find a single user
export const find = async (id: number): Promise < User > => {
    try {
        const record: User = await db.one(`select * from users where id=$1;`, [id]);

        if (record) {
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
        const usernameExists: any = await db.result(`select exists(select 1 from users where username=$1)`, [user.username]);
        const emailExists: any = await db.result(`select exists(select 1 from users where email=$1)`, [user.email]);
        const result: any = {usernameFound: false, emailFound: false}

        if (usernameExists.rows[0].exists == true && emailExists.rows[0].exists == true) {
            result.usernameFound = true;
            result.emailFound = true;
            return result;
        } else if (usernameExists.rows[0].exists == true && emailExists.rows[0].exists == false) {
            result.usernameFound = true;
            return result;
        } else if (usernameExists.rows[0].exists == false && emailExists.rows[0].exists == true) {
            result.emailFound = true;
            return result;
        } else {
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
        const result: any = await db.one(`insert into users (username, email, password, nickname, city_id, joined_date, player_rating, photo) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8) 
                                        returning *`, 
                                    [newUser.username, newUser.email, newUser.password, newUser.nickname, newUser.city_id, new Date(), 5, newUser.photo])
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
        const result: any = await db.result(`update users set username=$1, email=$2, password=$3, city_id=$4, player_rating=$5, photo=$6 where id=$7 returning id`, 
                        [updatedUser.username, updatedUser.email, updatedUser.password, updatedUser.city_id, updatedUser.player_rating,updatedUser.photo, updatedUser.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to update");
};

// Removes a user
export const remove = async (id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from users where id=$1`, [id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};