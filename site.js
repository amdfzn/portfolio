// Tema (gelap/terang) dan bahasa (en default, id opsional), disimpan di browser.
// Dimuat di <head> tanpa defer supaya tema terpasang sebelum halaman tampil (tidak berkedip).
// Teks dwibahasa ditulis berpasangan: <p lang="id">…</p><p lang="en">…</p>; CSS menyembunyikan yang tidak aktif.
(() => {
  const root = document.documentElement;
  const get = k => { try { return localStorage.getItem(k); } catch { return null; } };
  const set = (k, v) => { try { localStorage.setItem(k, v); } catch {} };

  const apply = () => {
    root.dataset.theme = get('tema') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    root.lang = get('bahasa') || 'en';
    const t = root.lang === 'en' ? root.dataset.titleEn : root.dataset.titleId;
    if (t) document.title = t;
  };
  apply();

  addEventListener('DOMContentLoaded', () => {
    const theme = document.getElementById('tema');
    const lang = document.getElementById('bahasa');
    const label = () => {
      const en = root.lang === 'en', light = root.dataset.theme === 'light';
      lang.textContent = en ? 'ID' : 'EN';
      lang.setAttribute('aria-label', en ? 'Baca dalam Bahasa Indonesia' : 'Read in English');
      theme.textContent = light ? '☾' : '☀';
      theme.setAttribute('aria-label', en
        ? (light ? 'Switch to dark theme' : 'Switch to light theme')
        : (light ? 'Ganti ke tema gelap' : 'Ganti ke tema terang'));
    };
    theme.onclick = () => { set('tema', root.dataset.theme === 'light' ? 'dark' : 'light'); apply(); label(); };
    lang.onclick = () => { set('bahasa', root.lang === 'en' ? 'id' : 'en'); apply(); label(); };
    label();
  });
})();
