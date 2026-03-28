ALTER TABLE invoices ADD COLUMN client_id TEXT REFERENCES clients(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS invoices_client_id_idx ON invoices(client_id);
