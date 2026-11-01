export const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    line TEXT NOT NULL DEFAULT '',
    subtitle TEXT NOT NULL DEFAULT '',
    description TEXT NOT NULL DEFAULT '',
    notes TEXT NOT NULL DEFAULT '',
    blend TEXT NOT NULL DEFAULT '',
    weight TEXT NOT NULL DEFAULT '1 kg',
    price INTEGER NOT NULL,
    image TEXT NOT NULL DEFAULT '',
    intensity INTEGER NOT NULL DEFAULT 3,
    accent TEXT NOT NULL DEFAULT '#002856',
    active BOOLEAN NOT NULL DEFAULT TRUE,
    stock INTEGER,
    sort INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1001`,
  `CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    number TEXT NOT NULL UNIQUE,
    token TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'open',
    salutation TEXT NOT NULL DEFAULT '',
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    company TEXT NOT NULL DEFAULT '',
    street TEXT NOT NULL,
    zip TEXT NOT NULL,
    city TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    note TEXT NOT NULL DEFAULT '',
    subtotal INTEGER NOT NULL,
    shipping INTEGER NOT NULL,
    total INTEGER NOT NULL,
    vat_rate NUMERIC(4,2) NOT NULL,
    vat_amount INTEGER NOT NULL,
    tracking TEXT NOT NULL DEFAULT '',
    admin_note TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    paid_at TIMESTAMPTZ,
    shipped_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ
  )`,
  `CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)`,
  `CREATE TABLE IF NOT EXISTS order_items (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER,
    name TEXT NOT NULL,
    weight TEXT NOT NULL DEFAULT '',
    unit_price INTEGER NOT NULL,
    qty INTEGER NOT NULL,
    line_total INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS order_log (
    id SERIAL PRIMARY KEY,
    order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    message TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS login_attempts (
    ip TEXT NOT NULL,
    at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL DEFAULT '',
    company TEXT NOT NULL DEFAULT '',
    topic TEXT NOT NULL DEFAULT '',
    message TEXT NOT NULL,
    done BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `CREATE TABLE IF NOT EXISTS app_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS push_subscriptions (
    id SERIAL PRIMARY KEY,
    admin_id INTEGER NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
    endpoint TEXT NOT NULL UNIQUE,
    p256dh TEXT NOT NULL,
    auth TEXT NOT NULL,
    device TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS translations JSONB NOT NULL DEFAULT '{}'`,
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS gallery JSONB NOT NULL DEFAULT '[]'`,
  `ALTER TABLE orders ADD COLUMN IF NOT EXISTS lang TEXT NOT NULL DEFAULT 'de'`,
  // Zahlungsart: 'prepay' (Vorauskasse) oder 'online' (Payrexx)
  `ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_method TEXT NOT NULL DEFAULT 'prepay'`,
  `ALTER TABLE orders ADD COLUMN IF NOT EXISTS payrexx_gateway_id BIGINT`,
  // Spamschutz Kontaktformular: Absender-IP (für Rate-Limit) und Spam-Markierung mit Grund
  `ALTER TABLE messages ADD COLUMN IF NOT EXISTS ip TEXT NOT NULL DEFAULT ''`,
  `ALTER TABLE messages ADD COLUMN IF NOT EXISTS spam TEXT NOT NULL DEFAULT ''`,
  // Hochgeladene Bilder (Produktfotos) liegen direkt in der Datenbank: kein zusätzlicher Speicher nötig
  `CREATE TABLE IF NOT EXISTS media (
    id SERIAL PRIMARY KEY,
    hash TEXT NOT NULL UNIQUE,
    mime TEXT NOT NULL,
    data BYTEA NOT NULL,
    width INTEGER NOT NULL DEFAULT 0,
    height INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  // Postfach im Admin: gelesen, Papierkorb und gesendete Antworten
  `ALTER TABLE messages ADD COLUMN IF NOT EXISTS read_at TIMESTAMPTZ`,
  `ALTER TABLE messages ADD COLUMN IF NOT EXISTS deleted_at TIMESTAMPTZ`,
  `CREATE TABLE IF NOT EXISTS mail_out (
    id SERIAL PRIMARY KEY,
    message_id INTEGER REFERENCES messages(id) ON DELETE SET NULL,
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    ok BOOLEAN NOT NULL DEFAULT TRUE,
    error TEXT NOT NULL DEFAULT '',
    sent_by TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  )`,
  // Kategorie eines Produkts (Kennung aus den Einstellungen, leer = keine)
  `ALTER TABLE products ADD COLUMN IF NOT EXISTS category TEXT NOT NULL DEFAULT ''`,
  // Test-Bestellungen mit dem geheimen Testcode aus dem Admin (Rabatt in Rappen)
  `ALTER TABLE orders ADD COLUMN IF NOT EXISTS discount INTEGER NOT NULL DEFAULT 0`,
  `ALTER TABLE orders ADD COLUMN IF NOT EXISTS is_test BOOLEAN NOT NULL DEFAULT false`,
  // Lagerbestand darf nie negativ werden: Zwei gleichzeitige Bestellungen für das letzte Stück scheitern so sauber
  `DO $$ BEGIN
     IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_stock_nonneg') THEN
       ALTER TABLE products ADD CONSTRAINT products_stock_nonneg CHECK (stock IS NULL OR stock >= 0) NOT VALID;
     END IF;
   END $$`,
];

export const SEED_PRODUCTS = [
  {
    slug: 'dersut-optimum-rosso-1kg',
    name: 'Dersut Optimum Rosso',
    line: 'Optimum',
    subtitle: 'Espressobohnen · 1 kg',
    description:
      'Optimum ist eine sorgfältig zusammengestellte Mischung aus den beliebtesten Arabica- und Robusta-Sorten, geröstet in Conegliano. Im Espresso zeigt sich eine angenehm langanhaltende Crema und ein ausgewogener Körper. Feine Noten von Kakao und Feingebäck prägen den umhüllenden Geschmack.',
    notes: 'Kakao, Feingebäck, langanhaltende Crema',
    blend: 'Arabica & Robusta',
    weight: '1 kg',
    price: 2990,
    image: 'brand:prod_optimum',
    intensity: 4,
    accent: '#A3142A',
    sort: 10,
  },
  {
    slug: 'dersut-domus-marrone-1kg',
    name: 'Dersut Domus Marrone',
    line: 'Domus',
    subtitle: 'Espressobohnen · 1 kg',
    description:
      'Domus ist eine Mischung aus ausgewählten Robusta- und Arabica-Sorten mit ausgesprochen intensivem Duft und rundem Körper. Ein angenehmer Hauch von Backwaren und ein feiner Nachklang von Trockenfrüchten geben diesem Espresso seinen kräftigen, entschlossenen Charakter. Ideal für alle, die ihren Espresso vollmundig und mit Kraft mögen.',
    notes: 'Backwaren, Trockenfrüchte, kräftig',
    blend: 'Robusta & Arabica',
    weight: '1 kg',
    price: 2690,
    image: 'brand:prod_domus',
    intensity: 5,
    accent: '#6B4430',
    sort: 20,
  },
  {
    slug: 'dersut-non-plus-ultra-1kg',
    name: 'Dersut Non Plus Ultra',
    line: 'Non Plus Ultra',
    subtitle: 'Espressobohnen · 1 kg',
    description:
      'Non Plus Ultra ist die edelste Mischung von Dersut: 100 % Arabica aus den feinsten gewaschenen und naturbelassenen Sorten, vor allem aus Mittelamerika und vom Horn von Afrika. Florale und fruchtige Noten, eine elegante Zitrusfrische und ein feiner Nachklang von Kakao und Nüssen machen ihn zum Espresso für besondere Momente. Ausgezeichnet mit der Gold Medal des International Coffee Tasting.',
    notes: 'Floral, Zitrus, Mandel, Kakao',
    blend: '100 % Arabica',
    weight: '1 kg',
    price: 3990,
    image: 'brand:prod_nonplusultra',
    intensity: 3,
    accent: '#B8913A',
    sort: 2,
  },
  {
    slug: 'dersut-plus-oro-1kg',
    name: 'Dersut Plus Oro',
    line: 'Plus Oro',
    subtitle: 'Espressobohnen · 1 kg',
    description:
      'Plus Oro ist die harmonische Goldmischung von Dersut: ausgewählte Arabica- und Robusta-Sorten, weich und zugleich intensiv, mit mittlerem Körper und feiner Säure. Noten von Feingebäck und Kakaobohne, ein Hauch von Gewürzen und ein Nachklang von Kakao und Haselnuss machen ihn rund und süss. Mehrfach mit der Gold Medal des International Coffee Tasting ausgezeichnet.',
    notes: 'Feingebäck, Kakao, Haselnuss, Gewürze',
    blend: 'Arabica & Robusta',
    weight: '1 kg',
    price: 3490,
    image: 'brand:prod_plusoro',
    intensity: 4,
    accent: '#8E7A45',
    sort: 4,
  },
];

/** Produkte, die nach dem Start ins bestehende Sortiment kamen: werden einmalig ergänzt (nicht erneut, falls im Admin gelöscht). */
export const ADDED_PRODUCTS = ['dersut-non-plus-ultra-1kg', 'dersut-plus-oro-1kg'];
