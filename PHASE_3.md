# FAZA 3 – Backend lokalny i projekty (PostgreSQL + Docker)

Cel: Trwałe zapisywanie projektów lokalnie, logowanie opcjonalne, brak zewnętrznych usług.

1) Składniki rozwiązania
- API: Node.js + Express.
- Baza: PostgreSQL w kontenerze Docker; katalog danych zamontowany do ./data/db.
- Pliki: projekty/wersje/assets w ./data/{projects,versions,assets,thumbs}.
- Auth (minimalny): email+hasło (bcrypt) lub tryb single-user bez logowania.

2) Schemat DB (DDL – zarys)
- users(id, email UNIQUE, password_hash, created_at)
- projects(id, owner_id, name, width, height, updated_at)
- project_versions(id, project_id, version, snapshot JSONB, created_at)
- assets(id, owner_id, filename, hash, mime, size, created_at)
Indeksy: btree(updated_at), GIN(snapshot) dla wyszukiwania pól (name/tags jeśli w snapshot).

3) API (v1)
- POST /auth/register, POST /auth/login
- GET/POST/PUT/DELETE /projects
- GET /projects/:id, POST /projects/:id/version
- POST /assets (upload do ./data/assets, nazwa = hash.ext)
- GET /search?query=...
Token: proste JWT lokalne (krótki TTL) albo sesja w pamięci (in-memory store).

4) Migracje i konfiguracja
- Migracje: Drizzle/Knex (skrypty w /server/migrations).
- docker-compose.yml: services: db (postgres), api (node) z volume ./data.
- ENV lokalne: DB_URL, JWT_SECRET, DATA_DIR (bez wrzucania do repo – .env.local).

5) Zmiany w froncie
- Service layer: apiClient (axios/fetch) z bazowym URL http://localhost:PORT.
- Auto-save co 30s → POST /projects/:id/version (snapshot całego modelu).
- Ekran Dashboard: lista projektów z miniaturami z ./data/thumbs (serwowane przez API).

6) Testy i akceptacja
- Jednostkowe: walidacja DTO, repozytoria.
- Integracyjne: rejestracja/logowanie, CRUD projektów, upload assetu, wersjonowanie.
- Kryteria: min. 3 projekty zapisane/odtworzone, działa auto-save i przywracanie wersji.

7) Ryzyka
- Spójność snapshotów – wersjonowanie atomowe w transakcji.
- Konflikty plików – nazwy plików po hashach, walidacja MIME.
