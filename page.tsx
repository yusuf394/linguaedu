import Link from "next/link";
import { Headphones, Youtube, Layers, BookOpen, ArrowRight } from "lucide-react";
import InstallButton from "@/components/InstallButton";
import Flashcards from "@/components/Flashcards";
import TrackLink from "@/components/TrackLink";

export default function Home() {
  return <main className="shell">
    <nav className="nav"><Link className="brand" href="/"><span className="brandmark">L</span> lingua edu</Link>
      <div className="navlinks"><a href="#fitur">Fitur</a><a href="#belajar">Belajar</a><Link href="/admin">Dashboard</Link></div><InstallButton />
    </nav>
    <section className="hero">
      <div><span className="eyebrow">PLATFORM BELAJAR BAHASA INDONESIA</span>
        <h1>Belajar Bahasa,<br/><span>Membangun Makna.</span></h1>
        <p>Eksplorasi Bahasa Indonesia melalui audio, video, dan pengalaman belajar interaktif. Belajar kapan saja, dari perangkat apa saja.</p>
        <div className="actions"><a className="btn" href="#fitur">Jelajahi materi <ArrowRight size={16} style={{verticalAlign:"middle"}}/></a><InstallButton/></div>
      </div>
      <div className="hero-card"><div><span className="mini-label">RUANG BELAJAR DIGITAL</span><h2 style={{fontFamily:"Plus Jakarta Sans",fontSize:28,marginBottom:8}}>Satu ruang, banyak cara belajar.</h2><p className="muted" style={{lineHeight:1.7,marginTop:0}}>Temukan cara belajar yang paling cocok dengan ritmemu.</p></div>
        <div className="learning-art"><div className="art-tile"><span className="art-icon">🎧</span><b>Audio learning</b></div><div className="art-tile"><span className="art-icon">▶️</span><b>Video learning</b></div><div className="art-tile"><span className="art-icon">🧠</span><b>Active recall</b></div><div className="art-tile"><span className="art-icon">📚</span><b>Literasi</b></div></div>
      </div>
    </section>
    <section className="section" id="fitur"><div className="section-head"><div><span className="eyebrow">PILIH CARA BELAJARMU</span><h2 style={{marginTop:12}}>Belajar sesuai gayamu</h2><p className="muted">Tiga jalur belajar dalam satu platform.</p></div></div>
      <div className="grid3">
        <article className="feature"><div className="feature-icon"><Headphones color="#2457d6"/></div><h3>Podcast</h3><p>Dengarkan pembahasan bahasa, sastra, kebahasaan, dan literasi dalam format audio.</p><TrackLink event="podcast_click" item="Podcast Bahasa Indonesia" href="https://open.spotify.com/" label="Jelajahi podcast →"/></article>
        <article className="feature"><div className="feature-icon"><Youtube color="#d92d20"/></div><h3>Video pembelajaran</h3><p>Belajar melalui video dan penjelasan visual yang lebih mudah diikuti.</p><TrackLink event="youtube_click" item="Video pembelajaran" href="https://www.youtube.com/" label="Tonton video →"/></article>
        <article className="feature"><div className="feature-icon"><Layers color="#2457d6"/></div><h3>Kartu pengingat</h3><p>Uji ingatan dengan flashcards untuk mengulang konsep dan istilah penting.</p><a href="#belajar" onClick={() => {}}>Mulai latihan ↓</a></article>
      </div>
    </section>
    <section className="section" id="belajar"><div className="section-head"><div><span className="eyebrow">ACTIVE RECALL</span><h2 style={{marginTop:12}}>Latihan kartu pengingat</h2><p className="muted">Coba jawab, lalu balik kartu untuk melihat pembahasannya.</p></div></div><Flashcards/></section>
    <footer className="footer"><div className="brand"><span className="brandmark">L</span> lingua edu</div><p>Belajar Bahasa, Membangun Makna. © {new Date().getFullYear()} Lingua Edu.</p></footer>
  </main>;
}
