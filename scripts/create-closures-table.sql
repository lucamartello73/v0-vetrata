-- Create closures table for managing perimeter closures
CREATE TABLE IF NOT EXISTS closures (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  icon_name VARCHAR(100),
  image_name VARCHAR(255),
  features TEXT[] DEFAULT '{}',
  benefits TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the 4 closure types from the client page
INSERT INTO closures (title, description, icon_name, image_name, features, benefits, display_order) VALUES
(
  'Chiusure in Vetro',
  'Eleganti pannelli in vetro temperato per una protezione trasparente e moderna.',
  'Eye',
  'glass-closure-pergola-autumn.jpg',
  ARRAY['Vetro temperato di sicurezza', 'Profili in alluminio', 'Apertura scorrevole', 'Protezione UV', 'Facile manutenzione'],
  ARRAY['Massima luminosità', 'Protezione dal vento', 'Design moderno'],
  1
),
(
  'Chiusure in PVC',
  'Soluzioni pratiche e versatili per proteggere i tuoi spazi con materiali resistenti.',
  'Shield',
  'pvc-closure-pergola-autumn.jpg',
  ARRAY['PVC cristallino resistente', 'Sistema di fissaggio sicuro', 'Protezione da pioggia e vento', 'Facile installazione', 'Costi contenuti'],
  ARRAY['Economico', 'Resistente alle intemperie', 'Versatile'],
  2
),
(
  'Chiusure in Tessuto',
  'Tende tecniche e tessuti tecnici per un comfort ottimale in ogni stagione.',
  'Wind',
  'fabric-closure-pergola-autumn.jpg',
  ARRAY['Tessuti tecnici impermeabili', 'Protezione UV 50+', 'Sistema di tensionamento', 'Colori personalizzabili', 'Facile rimozione'],
  ARRAY['Comfort termico', 'Protezione solare', 'Estetica personalizzabile'],
  3
),
(
  'Chiusure Termiche',
  'Sistemi isolanti per mantenere il calore e creare ambienti confortevoli tutto l''anno.',
  'Thermometer',
  'thermal-closure-pergola-autumn.jpg',
  ARRAY['Isolamento termico superiore', 'Doppio vetro camera', 'Guarnizioni ermetiche', 'Controllo condensa', 'Efficienza energetica'],
  ARRAY['Isolamento termico', 'Risparmio energetico', 'Comfort invernale'],
  4
);

-- Insert page content for chiusure perimetrali
INSERT INTO site_content (section, content_key, content_value, content_type) VALUES
('chiusure_perimetrali', 'hero_title', 'Chiusure Perimetrali', 'text'),
('chiusure_perimetrali', 'hero_description', 'Completa la tua pergola con le nostre soluzioni di chiusura perimetrale, per godere dei tuoi spazi esterni in ogni stagione dell''anno.', 'text'),
('chiusure_perimetrali', 'intro_title', 'Protezione e Comfort in Ogni Stagione', 'text'),
('chiusure_perimetrali', 'intro_description', 'Le chiusure perimetrali trasformano la tua pergola in uno spazio vivibile tutto l''anno, proteggendoti da vento, pioggia e temperature rigide senza rinunciare alla bellezza dell''ambiente esterno.', 'text'),
('chiusure_perimetrali', 'intro_image', 'pergola-with-glass-closures-autumn.jpg', 'image'),
('chiusure_perimetrali', 'types_title', 'Tipologie di Chiusure', 'text'),
('chiusure_perimetrali', 'types_description', 'Scegli la soluzione più adatta alle tue esigenze tra le nostre diverse tipologie di chiusure perimetrali.', 'text'),
('chiusure_perimetrali', 'advantages_title', 'Perché Scegliere le Nostre Chiusure', 'text'),
('chiusure_perimetrali', 'cta_title', 'Pronto per le Chiusure Perimetrali?', 'text'),
('chiusure_perimetrali', 'cta_description', 'Contattaci per una consulenza personalizzata e scopri quale soluzione di chiusura è più adatta alla tua pergola e alle tue esigenze.', 'text')
ON CONFLICT (section, content_key) DO UPDATE SET
  content_value = EXCLUDED.content_value,
  updated_at = NOW();
