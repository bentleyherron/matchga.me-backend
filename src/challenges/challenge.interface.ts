export interface Challenge {
    id: number;
    title: string;
    team_from_id: number;
    team_to_id: number;
    city_id: number;
    sport_id: number;
    longitude: number;
    latitude: number;
    datetime: Date;
    message: string;
    wager: number;
    is_accepted: boolean;
};