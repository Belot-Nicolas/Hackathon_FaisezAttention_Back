CREATE TABLE `users` (
    `id_user` INT AUTO_INCREMENT NOT NULL ,
    `firstname` VARCHAR(255)  NOT NULL ,
    `lastname` VARCHAR(255)  NOT NULL ,
    `password` VARCHAR(255)  NOT NULL ,
    `email` VARCHAR(255)  NOT NULL ,
    `avatar` VARCHAR(255)  NOT NULL ,
    `role` VARCHAR(255)  NOT NULL ,
    PRIMARY KEY (
        `id_user`
    )
);

CREATE TABLE `games` (
    `id_game` INT AUTO_INCREMENT NOT NULL ,
    `name` VARCHAR(255)  NOT NULL ,
    `image` VARCHAR(255)  NOT NULL ,
    `gifwin` VARCHAR(255)  NOT NULL ,
    `gifloose` VARCHAR(255)  NOT NULL ,
    `anecdote_win` VARCHAR(255)  NOT NULL ,
    `anecdote_loose` VARCHAR(255)  NOT NULL ,
    PRIMARY KEY (
        `id_game`
    )
);

CREATE TABLE `game_session` (
    `id_user` INT  NOT NULL ,
    `id_game` INT  NOT NULL ,
    `played` BOOLEAN  NOT NULL ,
    `score` INT  NOT NULL 
);

CREATE TABLE `errors` (
    `id_error` INT AUTO_INCREMENT NOT NULL ,
    `name` VARCHAR(255)  NOT NULL ,
    `picture` VARCHAR(255)  NOT NULL ,
    `axe_x` INT  NOT NULL ,
    `axe_y` INT  NOT NULL ,
    `isClicked` BOOLEAN  NOT NULL ,
    `id_game` INT  NOT NULL ,
    PRIMARY KEY (
        `id_error`
    )
);

ALTER TABLE `game_session` ADD CONSTRAINT `fk_game_session_id_user` FOREIGN KEY(`id_user`)
REFERENCES `users` (`id_user`);

ALTER TABLE `game_session` ADD CONSTRAINT `fk_game_session_id_game` FOREIGN KEY(`id_game`)
REFERENCES `games` (`id_game`);

ALTER TABLE `errors` ADD CONSTRAINT `fk_errors_id_game` FOREIGN KEY(`id_game`)
REFERENCES `games` (`id_game`);