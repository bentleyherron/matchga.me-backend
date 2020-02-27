import {
    User
} from "./user.interface";
import {
    Users
} from "./users.interface";

const users: Users = {
    1: {
        id: 1,
        username: 'user_1',
        password: 'password',
        joined_date: new Date(),
        last_logged_in: new Date(),
        player_rating: 5,
        photo: null
    },
    2: {
        id: 2,
        username: 'user_2',
        password: 'password',
        joined_date: new Date(),
        last_logged_in: new Date(),
        player_rating: 4,
        photo: null
    },
    3: {
        id: 3,
        username: 'user_3',
        password: 'password',
        joined_date: new Date(),
        last_logged_in: new Date(),
        player_rating: 3,
        photo: null
    }
};

/**
 * Service Methods
 */

// Find all users
export const findAll = async (): Promise < Users > => {
    return users;
};

// Find a single user
export const find = async (id: number): Promise < User > => {
    const record: User = users[id];

    if (record) {
        return record;
    };

    throw new Error("No record found");
};

// Create a user
export const create = async (newUser: User): Promise < void > => {
    const id = new Date().valueOf();
    users[id] = {
        ...newUser,
        id
    };
};

// Update a user
export const update = async (updatedUser: User): Promise < void > => {
    if (users[updatedUser.id]) {
        users[updatedUser.id] = updatedUser;
        return;
    }

    throw new Error("No record found to update");
};

// Removes a user
export const remove = async (id: number): Promise < void > => {
    const record: User = users[id];

    if (record) {
        delete users[id];
        return;
    }

    throw new Error("No record found to delete");
};