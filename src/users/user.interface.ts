export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    nickname: string;
    city_id: number;
    joined_date: Date;
    last_logged_in: Date;
    player_rating: number;
    photo: any;
    uuid: string;
    token: string;
};