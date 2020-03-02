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
	LONGITUDE float NOT NULL,
    PRIMARY KEY (ID)
);

create table users (
    id serial primary key,
    username text,
    email text,
    password text,
    nickname text,
    region_id integer references us_cities(id),
    joined_date date,
    last_logged_in date,
    player_rating float,
    photo text
);

create table teams (
    id serial primary key,
    name text,
    region_id integer references us_cities(id),
    captain_id integer references users(id),
    sport_id integer references sports(id),
    rating float,
    photo text,
    creation_date date,
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
    region_id integer references region(id),
    sport_id integer references sports(id),
    longitude float,
    latitude float,
    winner_id integer references teams(id),
    date date,
    description text,
    photo text,
    is_public boolean,
    event_occured_on date
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
    team_from_id integer references teams(id),
    team_to_id integer references teams(id),
    region_id integer references region(id),
    sport_id integer references sports(id),
    datetime date,
    message text,
    wager integer,
    is_accepted boolean
);