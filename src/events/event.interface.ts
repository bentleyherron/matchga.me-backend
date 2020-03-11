export interface Event {
    id: number;
    title: string; 
    city_id: number;
    sport_id: number;
    longitude: number;
    latitude: number;
    winner_id: number;
    date: Date;
    description: string;
    photo: any;
    wager: number;
    is_public: boolean;
    event_occured_on: Date;
};