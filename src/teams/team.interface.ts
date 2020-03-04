export interface Team {
    id: number;
    name: string;
    city_id: number;
    sport_id?: number;
    rating: number;
    photo: any;
    captain_id: number;
    creation_date: Date;
    is_solo: boolean;
};