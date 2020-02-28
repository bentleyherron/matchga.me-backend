import {
    Team
} from "./team.interface";
import {
    Teams
} from "./teams.interface";

const teams: Teams = {
    1: {
        id: 1,
        name: 'Team 1',
        region_id: 1,
        rating: 4,
        photo: null,
        creation_date: new Date()
    },
    2: {
        id: 2,
        name: 'Team 2',
        region_id: 8,
        rating: 2,
        photo: null,
        creation_date: new Date()
    },
    3: {
        id: 3,
        name: 'Team 3',
        region_id: 123,
        rating: 1,
        photo: null,
        creation_date: new Date()
    }
};

/**
 * Service Methods
 */

// Find all teams
export const findAll = async (): Promise < Teams > => {
    return teams;
};

// Find a single team
export const find = async (id: number): Promise < Team > => {
    const record: Team = teams[id];

    if (record) {
        return record;
    };

    throw new Error("No record found");
};

// Create a team
export const create = async (newTeam: Team): Promise < void > => {
    const id = new Date().valueOf();
    teams[id] = {
        ...newTeam,
        id
    };
};

// Update a team
export const update = async (updatedTeam: Team): Promise < void > => {
    if (teams[updatedTeam.id]) {
        teams[updatedTeam.id] = updatedTeam;
        return;
    }

    throw new Error("No record found to update");
};

// Removes a team
export const remove = async (id: number): Promise < void > => {
    const record: Team = teams[id];

    if (record) {
        delete teams[id];
        return;
    }

    throw new Error("No record found to delete");
};