create table sports (
    id serial primary key,
    name text
);

create table region (
    id serial primary key,
    city text,
    latitude float,
    longitude float
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
	LONGITUDE float NOT NULL
);

create table users (
    id serial primary key,
    username text,
    email text,
    password text,
    joined_date date,
    last_logged_in date,
    player_rating float,
    -- favorite_sports integer references sports(id),
    photo text
);

create table team (
    id serial primary key,
    name text,
    region_id integer references region(id),
    rating float,
    photo text,
    captain_id integer references users(id)
);

create table team_players (
    player_id integer references users(id),
    team_id integer references team(id)
);

create table favorite_sports (
    id serial primary key,
    sport_id integer references sports(id),
    user_id integer references users(id),
    team_id integer references team(id)
);

create table events (
    id serial primary key,
    title text,
    region_id integer references region(id),
    sport_id integer references sports(id),
    longitude float,
    latitude float,
    winner_id integer references team(id),
    date date,
    description text,
    photo text,
    is_public boolean,
    event_occured_on date
);

create table event_teams (
    id serial primary key,
    event_id integer references events(id),
    team_id integer references team(id)
);

create table scores (
    team_id integer references team(id),
    event_id integer references events(id),
    score integer
);

create table challenges (
    team_from_id integer references team(id),
    team_to_id integer references team(id),
    datetime date,
    message text,
    wager integer,
    is_accepted boolean
);