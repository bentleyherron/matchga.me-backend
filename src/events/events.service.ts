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
        const result: any = await db.one(`insert into events (title, city_id, sport_id, longitude, latitude, date, description, photo, is_public, event_occured_on) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
                                        returning *`, 
                                    [newEvent.title, newEvent.city_id, newEvent.sport_id, newEvent.longitude, newEvent.latitude, newEvent.date, newEvent.description, newEvent.photo, newEvent.is_public || true, newEvent.event_occured_on])
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
        const result: any = await db.result(`update events set title=$1, city_id=$2, sport_id=$3, longitude=$4, latitude=$5, date=$6, description=$7, photo=$8, is_public=$9, event_occured_on=$10 where id=$11 returning id`, 
                                    [updatedEvent.title, updatedEvent.city_id, updatedEvent.sport_id, updatedEvent.longitude, updatedEvent.latitude, updatedEvent.date, updatedEvent.description, updatedEvent.photo, updatedEvent.is_public, updatedEvent.event_occured_on])
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