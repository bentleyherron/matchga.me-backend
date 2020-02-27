export interface User {
    id: number;
    username: string;
    password: string;
    joined_date: Date;
    last_logged_in: Date;
    player_rating: number;
    photo: any;
};