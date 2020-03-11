create table sports (
    id serial primary key,
    name text
);

CREATE TABLE us_states (
	id integer,
	STATE_CODE char(2) NOT NULL,
	STATE_NAME varchar(50) NOT NULL,
	PRIMARY KEY (ID)
);

CREATE TABLE us_cities (
	id integer,
	STATE_ID integer references us_states(id),
	CITY varchar(50) NOT NULL,
	COUNTY varchar(50) NOT NULL,
	LATITUDE float NOT NULL,
	LONGITUDE float NOT NULL,
    PRIMARY KEY (ID)
);

create table users (
    id serial primary key,
    username text,
    email text,
    password text,
    nickname text,
    city_id integer references us_cities(id),
    joined_date timestamptz,
    last_logged_in timestamptz,
    player_rating float,
    photo text,
    uuid uuid
);

create table teams (
    id serial primary key,
    name text,
    city_id integer references us_cities(id),
    captain_id integer references users(id),
    sport_id integer references sports(id),
    rating float,
    photo text,
    creation_date timestamptz,
    is_solo boolean
);

create table team_members (
    player_id integer references users(id),
    team_id integer references teams(id)
);

create table favorite_sports (
    id serial primary key,
    sport_id integer references sports(id),
    user_id integer references users(id),
    team_id integer references teams(id)
);

create table events (
    id serial primary key,
    title text,
    team_id integer references teams(id),
    city_id integer references us_cities(id),
    sport_id integer references sports(id),
    longitude float,
    latitude float,
    winner_id integer references teams(id),
    date timestamptz,
    description text,
    photo text,
    wager integer,
    is_public boolean,
    event_occured_on timestamptz
);

create table event_teams (
    id serial primary key,
    event_id integer references events(id),
    team_id integer references teams(id)
);

create table scores (
    team_id integer references teams(id),
    event_id integer references events(id),
    score integer
);

create table challenges (
    id serial primary key,
    title text,
    team_from_id integer references teams(id),
    team_to_id integer references teams(id),
    city_id integer references us_cities(id),
    sport_id integer references sports(id),
    longitude float,
    latitude float,
    datetime timestamptz,
    message text,
    wager integer,
    is_accepted boolean
);