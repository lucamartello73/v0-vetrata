-- Tabella per i contatti del form di Natura Cube
CREATE TABLE contacts (
  id BIGSERIAL PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  telefono VARCHAR(50),
  utilizzo VARCHAR(100) NOT NULL,
  modello VARCHAR(100),
  opzioni TEXT,
  budget VARCHAR(50),
  tempistiche VARCHAR(100),
  messaggio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indice per migliorare le performance delle query per email
CREATE INDEX idx_contacts_email ON contacts(email);

-- Indice per le query per data di creazione
CREATE INDEX idx_contacts_created_at ON contacts(created_at);

-- RLS (Row Level Security) - opzionale, da configurare in base alle esigenze
-- ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Politica di esempio per permettere inserimenti pubblici (per il form)
-- CREATE POLICY "Allow public inserts" ON contacts FOR INSERT WITH CHECK (true);

-- Politica di esempio per permettere lettura solo agli admin autenticati
-- CREATE POLICY "Allow authenticated reads" ON contacts FOR SELECT USING (auth.role() = 'authenticated');
