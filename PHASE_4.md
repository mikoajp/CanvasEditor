# FAZA 4 – Współpraca lokalna (real‑time) i podstawowe udostępnianie

Cel: Prosta współpraca w czasie rzeczywistym w środowisku lokalnym (ten sam komputer/LAN), bez publicznego hostingu.

1) Zakres
- Real‑time: Socket.io (kanał per projectId): join_project, leave_project, element_added/updated/removed, cursor_move, selection_change.
- Uprawnienia: tryb single-user lub proste role (viewer/editor) przechowywane lokalnie w DB.
- Komentarze: model Comment { id, project_id, author_id, text, created_at } + wątek na projekcie.

2) Architektura i zmiany
- Serwer: moduł socket z walidacją wiadomości i broadcastem; serwer jest „źródłem prawdy” (ostatni zapis wygrywa w MVP).
- Front: warstwa sync – nasłuch eventów i stosowanie UpdateElementCommand bez zapisu do historii (by nie dublować undo).
- Persystencja: zdarzenia zapisywane jako kolejne wersje snapshotu (co X sekund lub po commit akcji).

3) Implementacja krok po kroku
- [1] Uruchom socket namespace /projects.<id> i autoryzuj po tokenie lub local mode.
- [2] Zaimplementuj obsługę eventów (add/update/remove/cursor/selection) + throttling kursora.
- [3] Rozwiązywanie konfliktów: last-write-wins + timestamp; opcjonalnie merge dla niezależnych pól.
- [4] Komentarze: REST CRUD + lista w panelu bocznym.

4) Zmiany w UI/UX
- Wskaźniki kursorów innych uczestników (kolory), licznik osób online.
- Panel komentarzy z przypięciem do elementu (opcjonalnie pole elementId).

5) Testy i akceptacja
- Integracyjne: dwie sesje edytują ten sam projekt – aktualizacje < 500 ms.
- Kryteria: stabilna synchronizacja pozycji/edycji tekstu i kształtów, komentarze działają.

6) Ryzyka
- Utrata połączenia: kolejka lokalna i ponowne wysłanie po reconnect.
- Pętle aktualizacji: flagi źródła zmian (remote vs local) i ignorowanie echo.
