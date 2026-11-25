# Lingua Edu — Next.js starter

Starter website pendidikan Bahasa Indonesia dengan:
- Podcast dan YouTube link yang melacak klik.
- Flashcards interaktif.
- Event analytics dan dashboard realtime melalui Supabase.
- PWA manifest, service worker, dan tombol install.

## 1. Jalankan lokal
```bash
npm install
cp .env.example .env.local
npm run dev
```
Buka http://localhost:3000

## 2. Hubungkan Supabase
1. Buat project di https://supabase.com.
2. Buka SQL Editor, jalankan isi `supabase/schema.sql`.
3. Ambil Project URL dan anon/public key dari Project Settings → API.
4. Isi `.env.local` berdasarkan `.env.example`.
5. Restart `npm run dev`.

Jika belum mengisi Supabase, website tetap bisa dibuka tetapi event hanya muncul di console browser dan dashboard tidak berisi data.

## 3. PWA / instalasi HP
Deploy website ke HTTPS (misalnya Vercel). Browser yang mendukung PWA dapat menampilkan tombol install atau menu "Add to Home Screen". Pengguna memasang aplikasi langsung dari website, bukan mengunduh APK dari Play Store.
Untuk ikon PWA, tambahkan file `public/icon-192.png` dan `public/icon-512.png` (PNG persegi). Tombol install bergantung dukungan browser/perangkat; iOS biasanya memakai Share → Add to Home Screen.

## 4. Deploy ke Vercel
Push project ke GitHub, import repository di Vercel, lalu tambahkan environment variables yang sama dengan `.env.local`.

## Penting sebelum produksi
## Admin dashboard
1. Di Supabase → Authentication → Users, buat akun admin secara manual.
2. Login melalui `/admin` menggunakan akun tersebut.
3. Kebijakan SELECT pada SQL starter mengizinkan user yang sudah terautentikasi membaca event. Untuk produksi dengan banyak akun, batasi policy dengan role admin khusus.
- Jangan pernah menaruh `service_role` key di browser. Gunakan hanya anon/public key.
- Tambahkan consent/cookie notice dan kebijakan privasi. Hindari merekam kata sandi, isi formulir sensitif, atau data pribadi yang tidak diperlukan.
- Untuk metrik pengguna aktif yang akurat, implementasikan identitas pengguna/login dan aturan definisi active session. `session_id` di starter ini hanya ID sesi browser.
- Service worker starter ini cache dasar; optimalkan strategi cache dan versi aset sebelum penggunaan skala besar.
