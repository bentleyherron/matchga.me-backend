import { Event } from "./event.interface";
import { Events } from "./events.interface";
import { db } from '../db/connect';


/**
 * Service Methods
 */

// Find all events
export const findAll = async (): Promise < Events > => {
    try {
        const events: Events = await db.any(`select * from events;`);
        return events;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No event records found");
};

// Find a single event
export const find = async (eventId: number): Promise < Event > => {
    try {
        const event: Event = await db.one(`select * from events where id=$1;`, [eventId]);

        if (event) {
            return event;
        };

    } catch (err) {
        console.log(err)
    }

    throw new Error("No event record found");
};

// Create an event
export const create = async (newEvent: Event): Promise < void > => {
    try {
        const result: any = await db.one(`insert into events (title, team_id, city_id, sport_id, longitude, latitude, winner_id, date, description, photo, is_public, event_occured_on) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
                                        returning *`, 
                                    [newEvent.title, newEvent.team_id, newEvent.city_id, newEvent.sport_id, newEvent.longitude, newEvent.latitude, newEvent.winner_id, newEvent.date, newEvent.description, newEvent.photo, newEvent.is_public || true, newEvent.event_occured_on])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("Could not create event");
};

// Update an event
export const update = async (updatedEvent: Event): Promise < void > => {
    try {
        const result: any = await db.result(`update events set title=$1, team_id=$2, city_id=$3, sport_id=$4, longitude=$5, latitude=$6, winner_id=$7, date=$8, description=$9, photo=$10, is_public=$11, event_occured_on=$12 where id=$13 returning id`, 
                                            [updatedEvent.title, updatedEvent.team_id, updatedEvent.city_id, updatedEvent.sport_id, updatedEvent.longitude, updatedEvent.latitude, updatedEvent.winner_id, updatedEvent.date, updatedEvent.description, updatedEvent.photo, updatedEvent.is_public, updatedEvent.event_occured_on, updatedEvent.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No event record found to update");
};

// Removes an event
export const remove = async (eventId: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from events where id=$1 RETURNING *`, [eventId])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No event record found to delete");
};