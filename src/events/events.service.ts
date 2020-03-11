import { Event } from "./event.interface";
import { Events } from "./events.interface";
import { db } from '../db/connect';
import * as TeamService from "../teams/teams.service";
import * as StateService from "../states/states.service";


/**
 * Service Methods
 */

// Find all events
export const findAll = async (): Promise < Events > => {
    try {
        const events: any = await db.any(`select * from events;`);
        const eventsWithCity: any = await Promise.all(events.map(async (event: any) => {
            const city: any = await StateService.getCityInfo(event.city_id);
            const state: any = await StateService.getStateInfo(city[0].state_id);
            event.city_state = city[0].city + ', ' + state[0].state_name;
            return event;
        }));
        return eventsWithCity;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No event records found");
};

// Find all events by city id
export const findAllByCity = async (cityId: number): Promise < Events > => {
    try {
        const events: object[] = await db.any(`select * from events where city_id=$1`, [cityId]);
        const eventsWithCity: any = await Promise.all(events.map(async (event: any) => {
            const city: any = await StateService.getCityInfo(event.city_id);
            const state: any = await StateService.getStateInfo(city[0].state_id);
            event.city_state = city[0].city + ', ' + state[0].state_name;
            return event;
        }));
        const eventsWithTeams: any = await Promise.all(eventsWithCity.map(async (event: any) => {
            const eventTeams: any = await db.any(`select * from event_teams where event_id=$1`, [event.id]);
            const eventTeamsWithName: any = await Promise.all(eventTeams.map(async (eventTeam: any) => {
                const teamInfo = await TeamService.find(eventTeam.team_id);
                eventTeam.team_name = teamInfo.name;
                eventTeam.photo = teamInfo.photo;
                return {eventTeam};
            }));
            return {event, eventTeams: eventTeamsWithName};
        }));

        if (eventsWithTeams) {
            return eventsWithTeams;
        }
    } catch (err) {
        console.log(err)
    }

    throw new Error("No event records found");
};

// Find a single event
export const find = async (eventId: number): Promise < Event > => {
    try {
        const event: any = await db.one(`select * from events where id=$1;`, [eventId]);
        const city: any = await StateService.getCityInfo(event.city_id);
        const state: any = await StateService.getStateInfo(city[0].state_id);
        event.city_state = city[0].city + ', ' + state[0].state_name;
        const eventTeams: any = await db.any(`select * from event_teams where event_id=$1`, [eventId]);
        const eventTeamsWithName: any = await Promise.all(eventTeams.map(async (eventTeam: any) => {
            const teamInfo = await TeamService.find(eventTeam.team_id);
            eventTeam.team_name = teamInfo.name;
            return eventTeam;
        }));
        if (event) {
            const eventInfo: any = {event, eventTeams: eventTeamsWithName};
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
        const result: any = await db.one(`insert into events (title, city_id, sport_id, longitude, latitude, winner_id, date, description, photo, is_public, event_occured_on, wager) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) 
                                        returning *`, 
                                    [newEvent.title, newEvent.city_id, newEvent.sport_id, newEvent.longitude, newEvent.latitude, newEvent.winner_id, newEvent.date, newEvent.description, newEvent.photo, newEvent.is_public || true, newEvent.event_occured_on, newEvent.wager]);
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
        const result: any = await db.result(`update events set title=COALESCE($1, title), city_id=COALESCE($2, city_id), sport_id=COALESCE($3, sport_id), longitude=COALESCE($4, longitude), latitude=COALESCE($5, latitude), winner_id=COALESCE($6, winner_id), date=COALESCE($7, date), description=COALESCE($8, description), photo=COALESCE($9, photo), is_public=COALESCE($10, is_public), event_occured_on=COALESCE($11, event_occured_on), wager=COALESCE($12, wager) where id=$13 returning id`, 
                                            [updatedEvent.title, updatedEvent.city_id, updatedEvent.sport_id, updatedEvent.longitude, updatedEvent.latitude, updatedEvent.winner_id, updatedEvent.date, updatedEvent.description, updatedEvent.photo, updatedEvent.is_public, updatedEvent.event_occured_on, updatedEvent.wager, updatedEvent.id])
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