export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    region_id: number;
    joined_date: Date;
    last_logged_in: Date;
    player_rating: number;
    photo: any;
};