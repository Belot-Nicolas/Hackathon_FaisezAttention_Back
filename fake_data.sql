INSERT INTO `games` (`name`, `image`, `gifwin`, `gifloose`, `anecdote_win`, `anecdote_loose`) VALUES
('game1', 'image_game1', 'gif_win', 'gif_loose', 'anecdote_win_game1', 'anecdote_loose_game1');

INSERT INTO `games` (`name`, `image`, `gifwin`, `gifloose`, `anecdote_win`, `anecdote_loose`) VALUES
('game2', 'image_game2', 'gif_win2', 'gif_loose2', 'anecdote_win_game2', 'anecdote_loose_game2');

INSERT INTO `game_session` (`id_user`, `id_game`, `played`, `score`) VALUES
('1', '1', true, 5);

INSERT INTO `game_session` (`id_user`, `id_game`, `played`, `score`) VALUES
('1', '2', true, 6);

INSERT INTO `game_session` (`id_user`, `id_game`, `played`, `score`) VALUES
('1', '4', true, 4);

INSERT INTO `game_session` (`id_user`, `id_game`, `played`, `score`) VALUES
('2', '1', true, 4);