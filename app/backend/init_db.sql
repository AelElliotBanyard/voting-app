-- Erstellen der Tabelle 'votes'
CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    party VARCHAR(255) UNIQUE NOT NULL,
    votes INTEGER NOT NULL DEFAULT 0
);

-- Optional: Einige Anfangsdaten einfügen
INSERT INTO votes (party, votes) VALUES
    ('SVP', 0),
    ('SP', 0),
    ('FDP', 0),
    ('CVP', 0),
    ('GLP', 0)
ON CONFLICT (party) DO NOTHING;