-- ============================================================
-- Schema
-- ============================================================

CREATE TABLE player (
  id    SERIAL PRIMARY KEY,
  name  TEXT NOT NULL UNIQUE
);

CREATE TABLE tournament (
  id    TEXT NOT NULL,
  name  TEXT NOT NULL,
  year  INT  NOT NULL,
  PRIMARY KEY (id, year)
);

CREATE TABLE game (
  id              SERIAL PRIMARY KEY,
  tournament_id   TEXT NOT NULL,
  tournament_year INT  NOT NULL,
  FOREIGN KEY (tournament_id, tournament_year) REFERENCES tournament(id, year)
);

CREATE TABLE entry (
  id         SERIAL PRIMARY KEY,
  game_id    INT NOT NULL REFERENCES game(id),
  player_id  INT NOT NULL REFERENCES player(id),
  UNIQUE (game_id, player_id)
);

CREATE TABLE pick (
  id              SERIAL PRIMARY KEY,
  entry_id        INT  NOT NULL REFERENCES entry(id),
  pga_player_id   TEXT NOT NULL,
  UNIQUE (entry_id, pga_player_id)
);


-- ============================================================
-- Seed data
-- ============================================================

INSERT INTO player (name) VALUES
  ('Michael Mills'),
  ('Mauro Ormedilla'),
  ('Jon Yi'),
  ('Anthony Artuso'),
  ('Patrick Podue');

INSERT INTO tournament (id, name, year) VALUES
  ('033', 'PGA Championship',      2025),
  ('026', 'U.S. Open',             2025),
  ('100', 'The Open Championship', 2025);

INSERT INTO game (tournament_id, tournament_year) VALUES
  ('033', 2025),
  ('026', 2025),
  ('100', 2025);

-- Entries (game_id 1 = PGA Championship)
INSERT INTO entry (game_id, player_id)
SELECT 1, id FROM player WHERE name IN (
  'Michael Mills', 'Mauro Ormedilla', 'Jon Yi', 'Anthony Artuso', 'Patrick Podue'
);

-- Entries (game_id 2 = U.S. Open)
INSERT INTO entry (game_id, player_id)
SELECT 2, id FROM player WHERE name IN (
  'Michael Mills', 'Mauro Ormedilla', 'Jon Yi', 'Anthony Artuso', 'Patrick Podue'
);

-- Entries (game_id 3 = The Open Championship)
INSERT INTO entry (game_id, player_id)
SELECT 3, id FROM player WHERE name IN (
  'Michael Mills', 'Mauro Ormedilla', 'Jon Yi', 'Anthony Artuso', 'Patrick Podue'
);

-- Picks — PGA Championship (game_id 1)
INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['46046','28089','32839','55182'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 1 AND p.name = 'Michael Mills';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['28237','52955','34046','35891'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 1 AND p.name = 'Mauro Ormedilla';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['33448','30911','37455','39997'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 1 AND p.name = 'Jon Yi';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['47959','46970','45486','36689'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 1 AND p.name = 'Anthony Artuso';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['48081','50525','35450','33204'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 1 AND p.name = 'Patrick Podue';

-- Picks — U.S. Open (game_id 2)
INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['45486','49960','47504','48887'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 2 AND p.name = 'Michael Mills';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['47959','52955','46717','33141'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 2 AND p.name = 'Mauro Ormedilla';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['50525','28237','35450','54591'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 2 AND p.name = 'Jon Yi';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['46970','48081','33448','39997'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 2 AND p.name = 'Anthony Artuso';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['46046','33204','30911','34046'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 2 AND p.name = 'Patrick Podue';

-- Picks — The Open Championship (game_id 3)
INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['48081','24502','22405','52955'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 3 AND p.name = 'Michael Mills';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['47959','50525','51766','57366'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 3 AND p.name = 'Mauro Ormedilla';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['28237','46970','33204','34098'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 3 AND p.name = 'Jon Yi';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['30911','46717','49960','45486'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 3 AND p.name = 'Anthony Artuso';

INSERT INTO pick (entry_id, pga_player_id)
SELECT e.id, unnest(ARRAY['46046','34363','52215','47504'])
FROM entry e JOIN player p ON e.player_id = p.id
WHERE e.game_id = 3 AND p.name = 'Patrick Podue';


-- ============================================================
-- Useful queries
-- ============================================================

-- All picks for a given tournament
SELECT p.name AS player, pick.pga_player_id
FROM pick
JOIN entry e  ON pick.entry_id = e.id
JOIN game  g  ON e.game_id = g.id
JOIN player p ON e.player_id = p.id
WHERE g.tournament_id = '100' AND g.tournament_year = 2025
ORDER BY p.name;

-- All golfers a player has ever picked
SELECT t.name AS tournament, t.year, pick.pga_player_id
FROM pick
JOIN entry e       ON pick.entry_id = e.id
JOIN game  g       ON e.game_id = g.id
JOIN tournament t  ON g.tournament_id = t.id AND g.tournament_year = t.year
JOIN player p      ON e.player_id = p.id
WHERE p.name = 'Michael Mills'
ORDER BY t.year, t.name;
