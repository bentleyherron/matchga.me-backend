import { User } from "./user.interface";
import { Users } from "./users.interface";
import { db } from '../db/connect';

/**
 * Service Methods
 */

// Find all users
export const findAll = async (): Promise < Users > => {
    try {
        const users = await db.any(`select * from users;`);
        return users;
    } catch (err) {
        console.log(err)
        return [];
    }
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
    
    throw new Error("No record found");
};

// Create a user
export const create = async (newUser: User): Promise < void > => {
    try {
        const result: any = await db.one(`insert into users (username, email, password, region_id, joined_date, player_rating, photo) 
                                            values ($1, $2, $3, $4, $5, $6, $7) 
                                        returning id`, 
                                    [newUser.username, newUser.email, newUser.password, newUser.region_id, new Date(), 5, newUser.photo])
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
        const result: any = await db.result(`update users set username=$1, email=$2, password=$3, photo=$4 where id=$5`, 
                                            [updatedUser.username, updatedUser.email, updatedUser.password, updatedUser.photo, updatedUser.id])
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