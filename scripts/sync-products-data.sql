-- Sync products data between admin and client
-- Clear existing products and insert the correct ones
DELETE FROM products;

-- Insert the 4 main products that match the client side
INSERT INTO products (name, title, description, features, image_name, icon_name, configurator_url, display_order, created_at, updated_at) VALUES
(
  'pergole-legno',
  'Pergole in Legno Premium',
  'Eleganti pergole in legno massello, perfette per creare spazi esterni accoglienti e naturali.',
  ARRAY['Legno massello di alta qualità', 'Trattamento anti-intemperie', 'Design personalizzabile', 'Installazione professionale'],
  'pergola-legno-autumn.jpg',
  'TreePine',
  NULL,
  1,
  NOW(),
  NOW()
),
(
  'pergole-ferro',
  'Pergole in Ferro Premium',
  'Strutture robuste e durature in ferro battuto, ideali per uno stile classico ed elegante.',
  ARRAY['Ferro battuto di qualità', 'Verniciatura antiruggine', 'Resistenza agli agenti atmosferici', 'Manutenzione minima'],
  'pergola-ferro-autumn.jpg',
  'Wrench',
  NULL,
  2,
  NOW(),
  NOW()
),
(
  'pergole-bioclimatiche',
  'Pergole Bioclimatiche Premium',
  'Soluzioni innovative con lamelle orientabili per il controllo ottimale di luce e ventilazione.',
  ARRAY['Lamelle orientabili motorizzate', 'Controllo automatico', 'Sensori pioggia e vento', 'App di controllo remoto'],
  'pergola-bioclimatica-autumn.jpg',
  'Zap',
  '/configuratore-bioclimatica',
  3,
  NOW(),
  NOW()
),
(
  'coperture-auto',
  'Coperture Auto Premium',
  'Protezione completa per i tuoi veicoli con coperture resistenti e funzionali.',
  ARRAY['Protezione UV completa', 'Resistenza a grandine', 'Struttura autoportante', 'Facile installazione'],
  'copertura-auto-autumn.jpg',
  'Car',
  NULL,
  4,
  NOW(),
  NOW()
);
