-- Creating script to populate projects table with existing realizations data
-- Insert existing projects from client-side data into database
INSERT INTO projects (title, location, description, year, features, image_names, display_order) VALUES
(
  'Villa Residenziale - Pergola Bioclimatica',
  'Torino, Piemonte',
  'Realizzazione di una pergola bioclimatica di 40mq con sistema di controllo automatico per una villa residenziale. Il progetto include illuminazione LED integrata e sistema audio.',
  2024,
  ARRAY['Pergola Bioclimatica', '40mq', 'Controllo Automatico', 'LED Integrato'],
  ARRAY['villa-torino-1.jpg'],
  1
),
(
  'Ristorante All''Aperto - Pergola in Legno',
  'Milano, Lombardia',
  'Copertura per dehor ristorante con pergola in legno lamellare di 60mq. Struttura resistente alle intemperie con sistema di riscaldamento integrato.',
  2024,
  ARRAY['Pergola Legno', '60mq', 'Uso Commerciale', 'Riscaldamento'],
  ARRAY['ristorante-milano-1.jpg'],
  2
),
(
  'Condominio - Coperture Auto Multiple',
  'Genova, Liguria',
  'Installazione di 12 coperture auto in ferro per condominio residenziale. Strutture modulari con sistema di raccolta acque piovane.',
  2023,
  ARRAY['Coperture Auto', '12 Posti', 'Ferro', 'Raccolta Acque'],
  ARRAY['condominio-genova-1.jpg'],
  3
),
(
  'Casa Privata - Pergola con Chiusure',
  'Cuneo, Piemonte',
  'Pergola in ferro battuto con chiusure perimetrali in vetro temperato. Soluzione completa per utilizzo invernale dello spazio esterno.',
  2023,
  ARRAY['Pergola Ferro', 'Chiusure Vetro', 'Uso Invernale', '25mq'],
  ARRAY['casa-cuneo-1.jpg'],
  4
),
(
  'Hotel - Pergole Multiple per Terrazza',
  'Sanremo, Liguria',
  'Progetto complesso con 4 pergole bioclimatiche per terrazza hotel. Sistema centralizzato di controllo e integrazione con impianto di climatizzazione.',
  2023,
  ARRAY['4 Pergole', 'Hotel', 'Sistema Centralizzato', 'Climatizzazione'],
  ARRAY['hotel-sanremo-1.jpg'],
  5
),
(
  'Azienda - Copertura Parcheggio Dipendenti',
  'Alessandria, Piemonte',
  'Grande copertura per parcheggio aziendale da 200mq. Struttura in ferro con pannelli fotovoltaici integrati per produzione energia pulita.',
  2022,
  ARRAY['200mq', 'Fotovoltaico', 'Parcheggio Aziendale', 'Energia Pulita'],
  ARRAY['azienda-alessandria-1.jpg'],
  6
)
ON CONFLICT (id) DO NOTHING;
