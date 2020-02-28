import {
    Event
} from "./event.interface";
import {
    Events
} from "./events.interface";

const events: Events = {
    1: {
        id: 1,
        title: 'Event 1',
        region_id: 1,
        sport_id: 8,
        longitude: 33.749788,
        latitude: -84.31685,
        winner_id: 2,
        date: new Date(),
        description: 'This is the first event.',
        photo: null,
        is_public: true,
        event_occured_on: new Date()
    },
    2: {
        id: 2,
        title: 'Event 2',
        region_id: 3,
        sport_id: 3,
        longitude: 33.749788,
        latitude: -84.31685,
        winner_id: 5,
        date: new Date(),
        description: 'This is the second event.',
        photo: null,
        is_public: false,
        event_occured_on: new Date()
    },
    3: {
        id: 3,
        title: 'Event 3',
        region_id: 5,
        sport_id: 13,
        longitude: 33.749788,
        latitude: -84.31685,
        winner_id: 9,
        date: new Date(),
        description: 'This is the third event.',
        photo: null,
        is_public: true,
        event_occured_on: new Date()
    }
};

/**
 * Service Methods
 */

// Find all events
export const findAll = async (): Promise < Events > => {
    return events;
};

// Find a single event
export const find = async (id: number): Promise < Event > => {
    const record: Event = events[id];

    if (record) {
        return record;
    };

    throw new Error("No record found");
};

// Create an event
export const create = async (newEvent: Event): Promise < void > => {
    const id = new Date().valueOf();
    events[id] = {
        ...newEvent,
        id
    };
};

// Update an event
export const update = async (updatedEvent: Event): Promise < void > => {
    if (events[updatedEvent.id]) {
        events[updatedEvent.id] = updatedEvent;
        return;
    }

    throw new Error("No record found to update");
};

// Removes an event
export const remove = async (id: number): Promise < void > => {
    const record: Event = events[id];

    if (record) {
        delete events[id];
        return;
    }

    throw new Error("No record found to delete");
};