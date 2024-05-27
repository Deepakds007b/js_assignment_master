-- create tables
create table if not exists mydb.sports (
    id int auto_increment not null primary key,
    name varchar(50) not null,
    status boolean not null default true,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp
);

create table if not exists mydb.news (
    id int auto_increment not null primary key,
    title varchar(50) not null,
    description varchar(255),
    sportId int not null,
    tourId int not null,
    matchId int,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    unique (sportId, tourId, matchId)
);

create table if not exists mydb.tours (
    id int auto_increment not null primary key,
    name varchar(50) not null,
    sportId int not null,
    newsId int,
    status boolean not null default true,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (sportId) references sports(id),
    foreign key (newsId) references news(id)
);

create table if not exists mydb.matches (
    id int auto_increment not null primary key,
    name varchar(50) not null,
    tourId int not null,
    newsId int,
    status boolean not null default true,
    format varchar(50) not null,
    startTime timestamp not null,
    endTime timestamp not null,
    recUpdatedAt timestamp not null default current_timestamp on update current_timestamp,
    createdAt timestamp not null default current_timestamp,
    foreign key (tourId) references tours(id),
    foreign key (newsId) references news(id)
);

CREATE INDEX idx_matches_tourId ON matches(tourId);
CREATE INDEX idx_tours_name ON tours(name);

-- seed data
insert ignore into mydb.sports (id, name) values (1, 'Cricket');
insert ignore into mydb.sports (id, name) values (2, 'Football');

insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (1, 'IPL, 2023 - Summary', 'All teams tried their best but CSK won eventually.', 1, 1, null);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (2, 'ISL, 2023 - Summary', 'Mumbai won ISL twice!!!', 1, 2, null);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (3, 'GT vs RCB - news', 'RCB won', 1, 1, 1);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (4, 'CSK vs MI - news', 'CSK won', 1, 1, 2);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (5, 'BLR vs BEN - news', 'BLR won', 2, 2, 5);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (6, 'ATK vs MCFC - news', 'Mumbai won', 2, 2, 6);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (7, 'KER vs JFC - news', 'JFC won', 2, 2, 7);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (8, 'IND vs WI - 2nd ODI news', 'IND level series 1-1', 1, 3, 8);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (9, 'IND vs WI - 3rd ODI news', 'IND won series 2-1', 1, 3, 9);
insert ignore into mydb.news (id, title, description, sportId, tourId, matchId) values (10, 'MNC vs MNU', 'Manchester won', 2, 4, 10);

insert ignore into mydb.tours (id, name, sportId, newsId, startTime, endTime) values (1, 'Indian Premier League, 2023', 1, 1, '2023-04-09 00:00:00', '2023-05-30 00:00:00');
insert ignore into mydb.tours (id, name, sportId, newsId, startTime, endTime) values (2, 'India Super League, 2023', 2, 2, '2023-04-21 00:00:00', '2023-06-20 00:00:00');
insert ignore into mydb.tours (id, name, sportId, newsId, startTime, endTime) values (3, 'India Tour of West Indies, 2023', 1, null, '2023-06-10 00:00:00', '2023-06-29 00:00:00');
insert ignore into mydb.tours (id, name, sportId, newsId, startTime, endTime) values (4, 'English Premier League, 2022', 2, null, '2022-04-09 00:00:00', '2022-05-30 00:00:00');

insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('GT vs RCB', 1, 3, 'T20', '2023-04-09 18:00:00', '2023-04-09 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('CSK vs MI', 1, 4, 'T20', '2023-04-10 18:00:00', '2021-04-10 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('LSG vs KXIP', 1, null, 'T20', '2023-04-11 18:00:00', '2023-04-11 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('RR vs SRH', 1, null, 'T20', '2023-04-12 18:00:00', '2023-04-12 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('BLR vs BEN', 2, 5, 'soccer', '2023-04-29 18:00:00', '2023-04-29 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('ATK vs MCFC', 2, 6, 'soccer', '2023-04-21 18:00:00', '2023-04-21 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('KER vs JFC', 2, 7, 'soccer', '2023-04-22 18:00:00', '2023-04-22 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('IND vs WI', 3, null, 'ODI', '2023-06-10 10:00:00', '2023-06-10 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('IND vs WI', 3, 8, 'ODI', '2023-06-12 10:00:00', '2023-06-12 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('IND vs WI', 3, 9, 'ODI', '2023-06-14 10:00:00', '2023-06-14 23:00:00');
insert ignore into mydb.matches (name, tourId, newsId, format, startTime, endTime) values ('MNC vs MNU', 4, 10, 'soccer', '2022-04-09 18:00:00', '2022-04-09 23:00:00');
