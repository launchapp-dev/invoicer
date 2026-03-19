-- Brain Knowledge Base — SQLite Schema
-- Queryable index over all markdown knowledge types.
-- Markdown files remain the source of truth; this DB is a derived index.
-- Run migrate.ts to populate from knowledge/ directory.

CREATE TABLE IF NOT EXISTS knowledge_items (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  type         TEXT    NOT NULL,  -- repos, questions, actions, products, architecture, competitive, revenue, ideas, fleet, gtm, team
  slug         TEXT    NOT NULL,  -- filename without .md extension
  title        TEXT,              -- title from frontmatter or first H1
  status       TEXT,              -- status field (open, proposed, active, stale, archived, etc.)
  priority     TEXT,              -- priority field (critical, high, medium, low)
  effort       TEXT,              -- effort field for actions (small, medium, large)
  category     TEXT,              -- category/domain tag
  owner        TEXT,              -- owner or assignee
  body         TEXT    NOT NULL,  -- full markdown content
  metadata     TEXT    NOT NULL DEFAULT '{}',  -- JSON blob of all frontmatter fields
  file_path    TEXT    NOT NULL,  -- path relative to repo root (e.g. knowledge/repos/ao-cli.md)
  imported_at  TEXT    NOT NULL,  -- ISO 8601 timestamp of last import
  UNIQUE(type, slug)
);

CREATE INDEX IF NOT EXISTS idx_ki_type          ON knowledge_items(type);
CREATE INDEX IF NOT EXISTS idx_ki_status        ON knowledge_items(status);
CREATE INDEX IF NOT EXISTS idx_ki_priority      ON knowledge_items(priority);
CREATE INDEX IF NOT EXISTS idx_ki_type_status   ON knowledge_items(type, status);
CREATE INDEX IF NOT EXISTS idx_ki_type_priority ON knowledge_items(type, priority);
CREATE INDEX IF NOT EXISTS idx_ki_category      ON knowledge_items(category);

CREATE VIRTUAL TABLE IF NOT EXISTS knowledge_fts USING fts5(
  slug,
  title,
  body,
  content=knowledge_items,
  content_rowid=id
);

CREATE TRIGGER IF NOT EXISTS knowledge_fts_insert AFTER INSERT ON knowledge_items BEGIN
  INSERT INTO knowledge_fts(rowid, slug, title, body)
  VALUES (new.id, new.slug, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS knowledge_fts_update AFTER UPDATE ON knowledge_items BEGIN
  INSERT INTO knowledge_fts(knowledge_fts, rowid, slug, title, body)
  VALUES ('delete', old.id, old.slug, old.title, old.body);
  INSERT INTO knowledge_fts(rowid, slug, title, body)
  VALUES (new.id, new.slug, new.title, new.body);
END;

CREATE TRIGGER IF NOT EXISTS knowledge_fts_delete AFTER DELETE ON knowledge_items BEGIN
  INSERT INTO knowledge_fts(knowledge_fts, rowid, slug, title, body)
  VALUES ('delete', old.id, old.slug, old.title, old.body);
END;
