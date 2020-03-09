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

// Find all events by city id
export const findAllByCity = async (cityId: number): Promise < Events > => {
    try {
        const events: Events = await db.any(`select * from events where city_id=$1`, [cityId]);
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
        const eventTeams: any = await db.any(`select * from event_teams where event_id=$1`, [eventId]);
        if (event) {
            const eventInfo: any = {event, eventTeams};
            return eventInfo;
        };

    } catch (err) {
        console.log(err)
    }

    throw new Error("No event record found");
};

// Create an event
export const create = async (newEvent: Event, eventTeams: any): Promise < void > => {
    try {
        const result: any = await db.one(`insert into events (title, team_id, city_id, sport_id, longitude, latitude, winner_id, date, description, photo, is_public, event_occured_on) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
                                        returning *`, 
                                    [newEvent.title, newEvent.team_id, newEvent.city_id, newEvent.sport_id, newEvent.longitude, newEvent.latitude, newEvent.winner_id, newEvent.date, newEvent.description, newEvent.photo, newEvent.is_public || true, newEvent.event_occured_on]);
        const eventTeamsReturn: any = eventTeams.map(async (team: any) => {
            return await db.one(`insert into event_teams (event_id, team_id) values ($1, $2) returning *`, [result.id, team]);
        });
        const eventTeamsResult: any = await Promise.all(eventTeamsReturn);
        if (result) {
            const eventCreated: any = {event: result, eventTeams: eventTeamsResult};
            return eventCreated;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("Could not create event");
};

// Update an event
export const update = async (updatedEvent: Event): Promise < void > => {
    try {
        const result: any = await db.result(`update events set title=COALESCE($1, title), team_id=COALESCE($2, team_id), city_id=COALESCE($3, city_id), sport_id=COALESCE($4, sport_id), longitude=COALESCE($5, longitude), latitude=COALESCE($6, latitude), winner_id=COALESCE($7, winner_id), date=COALESCE($8, date), description=COALESCE($9, description), photo=COALESCE($10, photo), is_public=COALESCE($11, is_public), event_occured_on=COALESCE($12, event_occured_on) where id=$13 returning id`, 
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