INSERT INTO templates (
    id,
    category_id,
    name,
    slug,
    description,
    thumbnail_url,
    html_content,
    css_content,
    editor_state,
    is_premium,
    is_active,
    created_at,
    updated_at
)
VALUES
(
    'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
    '11111111-1111-1111-1111-111111111111',
    'Aurum Advisory',
    'agency-starter',
    'Premium B2B consulting template with a high-conversion structure for modern agencies.',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aurum Advisory | Growth Consulting</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 antialiased">
  <nav class="sticky top-0 z-50 border-b border-amber-400/20 bg-slate-950/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-lg font-semibold tracking-wide text-amber-300">Aurum Advisory</a>
      <ul class="hidden items-center gap-8 text-sm text-slate-300 md:flex">
        <li><a href="#services" class="hover:text-amber-300">Services</a></li>
        <li><a href="#clients" class="hover:text-amber-300">Clients</a></li>
        <li><a href="#insights" class="hover:text-amber-300">Insights</a></li>
        <li><a href="#contact" class="hover:text-amber-300">Contact</a></li>
      </ul>
      <a href="#contact" class="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300">Book Strategy Call</a>
    </div>
  </nav>

  <header class="relative flex min-h-screen items-center overflow-hidden">
    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="Business strategy" class="absolute inset-0 h-full w-full object-cover opacity-20" />
    <div class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-950/70"></div>
    <div class="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-24 lg:grid-cols-2 lg:items-center">
      <div>
        <p class="mb-4 inline-flex rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-amber-300">Enterprise Advisory Partner</p>
        <h1 class="text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">We Help Ambitious Firms Scale Revenue With Precision</h1>
        <p class="mt-6 max-w-xl text-lg text-slate-300">Aurum partners with executive teams to align growth strategy, operations, and data systems so momentum compounds quarter after quarter.</p>
        <div class="mt-10 flex flex-wrap gap-4">
          <a href="#contact" class="rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300">Get Proposal</a>
          <a href="#services" class="rounded-full border border-slate-400/50 px-6 py-3 text-sm font-semibold text-white hover:border-amber-300 hover:text-amber-300">Explore Services</a>
        </div>
      </div>
      <aside class="rounded-2xl border border-amber-400/20 bg-slate-900/80 p-8 shadow-2xl shadow-amber-900/20">
        <h2 class="text-xl font-semibold text-white">Performance Snapshot</h2>
        <dl class="mt-6 grid grid-cols-2 gap-6 text-sm">
          <div><dt class="text-slate-400">Avg Pipeline Lift</dt><dd class="mt-1 text-2xl font-semibold text-amber-300">+38%</dd></div>
          <div><dt class="text-slate-400">Client Retention</dt><dd class="mt-1 text-2xl font-semibold text-amber-300">96%</dd></div>
          <div><dt class="text-slate-400">Markets Entered</dt><dd class="mt-1 text-2xl font-semibold text-amber-300">27</dd></div>
          <div><dt class="text-slate-400">Avg Engagement</dt><dd class="mt-1 text-2xl font-semibold text-amber-300">14 mo</dd></div>
        </dl>
      </aside>
    </div>
  </header>

  <section id="services" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-white">Strategic Services</h2>
    <p class="mt-3 max-w-3xl text-slate-300">Built for leadership teams that need both strategic clarity and execution momentum.</p>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-800 bg-slate-900/70 p-7">
        <div class="text-3xl">📈</div>
        <h3 class="mt-4 text-xl font-semibold text-amber-300">Revenue Architecture</h3>
        <p class="mt-3 text-slate-300">Redesign your go-to-market engine from ICP and positioning through full-funnel conversion optimization.</p>
      </article>
      <article class="rounded-2xl border border-slate-800 bg-slate-900/70 p-7">
        <div class="text-3xl">⚙️</div>
        <h3 class="mt-4 text-xl font-semibold text-amber-300">Operational Excellence</h3>
        <p class="mt-3 text-slate-300">We streamline handoffs, automate repetitive process layers, and establish measurable operating rhythms.</p>
      </article>
      <article class="rounded-2xl border border-slate-800 bg-slate-900/70 p-7">
        <div class="text-3xl">🧭</div>
        <h3 class="mt-4 text-xl font-semibold text-amber-300">Executive Decision Support</h3>
        <p class="mt-3 text-slate-300">Translate complex market and internal signals into decisive, board-ready strategic recommendations.</p>
      </article>
    </div>
  </section>

  <section id="clients" class="border-y border-slate-800 bg-slate-900/40 py-10">
    <div class="mx-auto max-w-7xl px-6">
      <p class="text-center text-xs uppercase tracking-[0.25em] text-slate-400">Trusted by growth leaders</p>
      <div class="mt-6 grid grid-cols-2 gap-6 text-center text-sm font-medium text-slate-300 sm:grid-cols-3 md:grid-cols-6">
        <span class="rounded border border-slate-700 py-3">NORTHRIDGE</span>
        <span class="rounded border border-slate-700 py-3">VELORA</span>
        <span class="rounded border border-slate-700 py-3">KINTA</span>
        <span class="rounded border border-slate-700 py-3">BRIGHTLINE</span>
        <span class="rounded border border-slate-700 py-3">ATLASWORKS</span>
        <span class="rounded border border-slate-700 py-3">ORBITAL</span>
      </div>
    </div>
  </section>

  <section id="insights" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-white">Client Perspective</h2>
    <div class="mt-8 max-w-3xl rounded-2xl border border-amber-400/20 bg-slate-900 p-8 shadow-lg shadow-slate-950">
      <p class="text-lg leading-relaxed text-slate-200">"Aurum took us from fragmented initiatives to a disciplined growth system in under two quarters. The clarity in pipeline ownership and planning cadence changed the trajectory of the business."</p>
      <div class="mt-6">
        <p class="font-semibold text-amber-300">Elena Marquez</p>
        <p class="text-sm text-slate-400">Chief Operating Officer, Velora Systems</p>
      </div>
    </div>
  </section>

  <section id="contact" class="mx-auto max-w-7xl px-6 pb-20">
    <div class="rounded-3xl border border-amber-400/20 bg-gradient-to-r from-slate-900 to-slate-800 p-10">
      <h2 class="text-3xl font-semibold text-white">Ready to unlock your next stage of growth?</h2>
      <p class="mt-3 max-w-2xl text-slate-300">Share your goals and constraints. We will send a focused action plan tailored to your operating model.</p>
      <a href="#" class="mt-8 inline-flex rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-amber-300">Start Engagement</a>
    </div>
  </section>

  <footer class="border-t border-slate-800 bg-slate-950">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
      <div>
        <p class="text-lg font-semibold text-amber-300">Aurum Advisory</p>
        <p class="mt-3 text-sm text-slate-400">Strategy, operations, and execution support for high-growth teams.</p>
      </div>
      <div>
        <p class="font-semibold text-white">Services</p>
        <ul class="mt-3 space-y-2 text-sm text-slate-400"><li>Growth Strategy</li><li>Revenue Operations</li><li>Leadership Advisory</li></ul>
      </div>
      <div>
        <p class="font-semibold text-white">Company</p>
        <ul class="mt-3 space-y-2 text-sm text-slate-400"><li>About</li><li>Case Studies</li><li>Insights</li></ul>
      </div>
      <div>
        <p class="font-semibold text-white">Contact</p>
        <ul class="mt-3 space-y-2 text-sm text-slate-400"><li>hello@aurumadvisory.co</li><li>+1 415 555 0148</li><li>San Francisco, CA</li></ul>
      </div>
    </div>
  </footer>
</body>
</html>$$,
    '',
    '{}'::jsonb,
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb',
    '22222222-2222-2222-2222-222222222222',
    'Nova Creative Portfolio',
    'creative-portfolio',
    'Premium portfolio template for designers and developers with strong project storytelling.',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nova Kim | Designer and Developer</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900 antialiased">
  <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="text-xl font-semibold tracking-tight text-violet-700">Nova Kim</a>
      <ul class="hidden gap-7 text-sm font-medium text-slate-600 md:flex">
        <li><a href="#work" class="hover:text-violet-700">Work</a></li>
        <li><a href="#about" class="hover:text-violet-700">About</a></li>
        <li><a href="#skills" class="hover:text-violet-700">Skills</a></li>
        <li><a href="#contact" class="hover:text-violet-700">Contact</a></li>
      </ul>
      <a href="#contact" class="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500">Start a Project</a>
    </div>
  </nav>

  <header class="mx-auto max-w-6xl px-6 pb-20 pt-20">
    <p class="inline-flex rounded-full bg-violet-100 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-violet-700">Freelance Product Designer</p>
    <h1 class="mt-6 text-5xl font-semibold leading-tight text-slate-900 md:text-6xl">Designing digital products that feel effortless and perform at scale.</h1>
    <p class="mt-6 max-w-3xl text-lg text-slate-600">I am Nova, a multidisciplinary designer and front-end developer crafting visual systems, high-converting interfaces, and resilient design-to-code workflows.</p>
    <div class="mt-10">
      <a href="#contact" class="rounded-full bg-violet-600 px-7 py-3 text-sm font-semibold text-white hover:bg-violet-500">Contact Nova</a>
    </div>
  </header>

  <section id="work" class="mx-auto max-w-6xl px-6 pb-20">
    <div class="mb-8 flex items-end justify-between">
      <h2 class="text-3xl font-semibold">Selected Work</h2>
      <span class="text-sm text-slate-500">6 featured projects</span>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="Analytics dashboard" class="h-48 w-full object-cover" />
        <div class="p-5"><h3 class="font-semibold">Pulse Analytics</h3><p class="mt-2 text-sm text-violet-700">SaaS Dashboard Design</p></div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop" alt="Brand website" class="h-48 w-full object-cover" />
        <div class="p-5"><h3 class="font-semibold">Lumen Studio</h3><p class="mt-2 text-sm text-violet-700">Brand and Web Experience</p></div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop" alt="Collaboration product" class="h-48 w-full object-cover" />
        <div class="p-5"><h3 class="font-semibold">Flowspace</h3><p class="mt-2 text-sm text-violet-700">Collaboration Platform UX</p></div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop" alt="Developer tool" class="h-48 w-full object-cover" />
        <div class="p-5"><h3 class="font-semibold">Code Beacon</h3><p class="mt-2 text-sm text-violet-700">Developer Tooling UI</p></div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop" alt="Marketing site" class="h-48 w-full object-cover" />
        <div class="p-5"><h3 class="font-semibold">Kova Commerce</h3><p class="mt-2 text-sm text-violet-700">E-commerce Redesign</p></div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Mobile app" class="h-48 w-full object-cover" />
        <div class="p-5"><h3 class="font-semibold">Drift Mobile</h3><p class="mt-2 text-sm text-violet-700">iOS App Design System</p></div>
      </article>
    </div>
  </section>

  <section id="about" class="border-y border-slate-100 bg-slate-50 py-20">
    <div class="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:items-center">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Nova Kim" class="h-80 w-full rounded-2xl object-cover" />
      <div>
        <h2 class="text-3xl font-semibold">About Nova</h2>
        <p class="mt-4 text-slate-600">With 8 years across product design, design systems, and frontend engineering, I help startups and scale-ups ship products that look intentional and convert reliably. I believe the best interfaces disappear — users just get things done.</p>
        <p class="mt-4 text-slate-600">Previously at Figma, Intercom, and two seed-stage startups. Based in Berlin, open to remote.</p>
        <div class="mt-6 flex gap-4 text-sm">
          <a href="#" class="font-medium text-violet-700 hover:underline">LinkedIn →</a>
          <a href="#" class="font-medium text-violet-700 hover:underline">Dribbble →</a>
          <a href="#" class="font-medium text-violet-700 hover:underline">GitHub →</a>
        </div>
      </div>
    </div>
  </section>

  <section id="skills" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-semibold">Skills and Stack</h2>
    <div class="mt-6 flex flex-wrap gap-3 text-sm">
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">Figma</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">Design Systems</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">React</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">TypeScript</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">Tailwind CSS</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">Framer Motion</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">User Research</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">Prototyping</span>
      <span class="rounded-full bg-violet-100 px-4 py-2 text-violet-800">A/B Testing</span>
    </div>
  </section>

  <section id="contact" class="bg-violet-600 py-20">
    <div class="mx-auto max-w-6xl px-6 text-center text-white">
      <h2 class="text-4xl font-semibold">Let us build something great together.</h2>
      <p class="mt-4 text-violet-200">Open to full-time roles and select freelance projects. Response within 24 hours.</p>
      <a href="mailto:nova@novakim.design" class="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-violet-700">nova@novakim.design</a>
    </div>
  </section>

  <footer class="border-t border-slate-200 py-8 text-center text-sm text-slate-500">
    © 2026 Nova Kim. All rights reserved.
  </footer>
</body>
</html>$$,
    '',
    '{}'::jsonb,
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    'cccccccc-cccc-cccc-cccc-cccccccccccc',
    '33333333-3333-3333-3333-333333333333',
    'Bella Cucina',
    'bella-cucina',
    'Upscale Italian restaurant template with full menu, gallery, and reservation CTA.',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Bella Cucina | Authentic Italian</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f9f4ee] text-[#2d1f14] antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#d4bfa0] bg-[#f9f4ee]/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="font-serif text-2xl italic tracking-wide text-[#7a3b1e]">Bella Cucina</a>
      <ul class="hidden gap-8 text-sm font-medium text-[#4a3728] md:flex">
        <li><a href="#about" class="hover:text-[#7a3b1e]">Our Story</a></li>
        <li><a href="#menu" class="hover:text-[#7a3b1e]">Menu</a></li>
        <li><a href="#gallery" class="hover:text-[#7a3b1e]">Gallery</a></li>
        <li><a href="#reserve" class="hover:text-[#7a3b1e]">Reserve</a></li>
      </ul>
      <a href="#reserve" class="rounded-full bg-[#7a3b1e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5e2c12]">Reserve a Table</a>
    </div>
  </nav>

  <header class="relative flex min-h-[80vh] items-end overflow-hidden">
    <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop" alt="Italian cuisine" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#1a0e08]/90 via-[#1a0e08]/40 to-transparent"></div>
    <div class="relative mx-auto w-full max-w-6xl px-6 pb-16">
      <p class="text-sm uppercase tracking-[0.3em] text-[#d4bfa0]">Est. Milano, 1998</p>
      <h1 class="mt-2 font-serif text-5xl italic text-white md:text-7xl">La vera cucina italiana.</h1>
      <p class="mt-4 max-w-xl text-[#d4bfa0]">Handmade pasta, wood-fired tradition, and the warmth of a family table — brought to you in the heart of the city.</p>
      <div class="mt-8 flex gap-4">
        <a href="#reserve" class="rounded-full bg-[#7a3b1e] px-6 py-3 text-sm font-semibold text-white">Reserve a Table</a>
        <a href="#menu" class="rounded-full border border-[#d4bfa0] px-6 py-3 text-sm font-semibold text-white">View Menu</a>
      </div>
    </div>
  </header>

  <section id="about" class="mx-auto max-w-6xl px-6 py-20">
    <div class="grid gap-12 md:grid-cols-2 md:items-center">
      <div>
        <h2 class="font-serif text-4xl italic text-[#7a3b1e]">Our Story</h2>
        <p class="mt-6 text-[#4a3728] leading-relaxed">Bella Cucina was born from a single conviction: that the best Italian food is made slowly, with respect for ingredients and the people who grow them. Chef Marco Ferretti spent a decade in the kitchens of Florence before opening our doors. Every dish on our menu is tied to a memory, a season, or a village square somewhere in Italy.</p>
        <p class="mt-4 text-[#4a3728] leading-relaxed">We source our durum wheat from a mill in Puglia, our San Marzano tomatoes from Campania, and our olive oil from a family grove outside Lucca that has been harvesting since 1923.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop" alt="Chef at work" class="h-96 w-full rounded-2xl object-cover shadow-lg" />
    </div>
  </section>

  <section id="menu" class="border-y border-[#d4bfa0] bg-[#f2ead8] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-center font-serif text-4xl italic text-[#7a3b1e]">Il Menu</h2>
      <div class="mt-12 grid gap-10 md:grid-cols-3">
        <div>
          <h3 class="border-b border-[#c9a97a] pb-2 font-serif text-2xl italic text-[#5a3010]">Antipasti</h3>
          <ul class="mt-6 space-y-4 text-sm">
            <li class="flex justify-between"><span><strong>Burrata e Pomodoro</strong><br/><span class="text-[#7a6248]">Fresh burrata, heirloom tomato, basil oil</span></span><span class="font-semibold">€14</span></li>
            <li class="flex justify-between"><span><strong>Carpaccio di Manzo</strong><br/><span class="text-[#7a6248]">Beef carpaccio, rocket, Parmigiano, capers</span></span><span class="font-semibold">€17</span></li>
            <li class="flex justify-between"><span><strong>Crostini Toscani</strong><br/><span class="text-[#7a6248]">Chicken liver pâté on grilled bread</span></span><span class="font-semibold">€11</span></li>
          </ul>
        </div>
        <div>
          <h3 class="border-b border-[#c9a97a] pb-2 font-serif text-2xl italic text-[#5a3010]">Primi Piatti</h3>
          <ul class="mt-6 space-y-4 text-sm">
            <li class="flex justify-between"><span><strong>Tagliatelle al Ragù</strong><br/><span class="text-[#7a6248]">Handmade pasta, slow-braised Bolognese</span></span><span class="font-semibold">€22</span></li>
            <li class="flex justify-between"><span><strong>Cacio e Pepe</strong><br/><span class="text-[#7a6248]">Tonnarelli, aged Pecorino, black pepper</span></span><span class="font-semibold">€19</span></li>
            <li class="flex justify-between"><span><strong>Risotto ai Funghi</strong><br/><span class="text-[#7a6248]">Arborio, wild mushroom, white truffle oil</span></span><span class="font-semibold">€24</span></li>
          </ul>
        </div>
        <div>
          <h3 class="border-b border-[#c9a97a] pb-2 font-serif text-2xl italic text-[#5a3010]">Dolci</h3>
          <ul class="mt-6 space-y-4 text-sm">
            <li class="flex justify-between"><span><strong>Tiramisù della Casa</strong><br/><span class="text-[#7a6248]">Mascarpone, espresso, Savoiardi</span></span><span class="font-semibold">€9</span></li>
            <li class="flex justify-between"><span><strong>Panna Cotta</strong><br/><span class="text-[#7a6248]">Vanilla cream, mixed berry coulis</span></span><span class="font-semibold">€8</span></li>
            <li class="flex justify-between"><span><strong>Cannoli Siciliani</strong><br/><span class="text-[#7a6248]">Ricotta filling, pistachio, candied peel</span></span><span class="font-semibold">€10</span></li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section id="gallery" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="font-serif text-4xl italic text-[#7a3b1e]">Gallery</h2>
    <div class="mt-8 grid grid-cols-3 gap-4">
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&auto=format&fit=crop" alt="Food" class="h-48 w-full rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&auto=format&fit=crop" alt="Dish" class="h-48 w-full rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&auto=format&fit=crop" alt="Restaurant" class="h-48 w-full rounded-xl object-cover" />
    </div>
  </section>

  <section id="reserve" class="bg-[#2d1f14] py-20 text-white">
    <div class="mx-auto max-w-3xl px-6 text-center">
      <h2 class="font-serif text-4xl italic">Reserve Your Table</h2>
      <p class="mt-4 text-[#c9a97a]">For groups of 6 or more, please call us directly. We look forward to welcoming you.</p>
      <a href="tel:+1415555019" class="mt-8 inline-flex rounded-full bg-[#7a3b1e] px-8 py-3 text-lg font-semibold hover:bg-[#5e2c12]">+1 415 555 0198</a>
      <p class="mt-6 text-sm text-[#a08060]">Open Tuesday – Sunday · 12:00 – 15:00 · 18:00 – 23:00</p>
    </div>
  </section>

  <footer class="border-t border-[#d4bfa0] bg-[#f9f4ee] py-10 text-center text-sm text-[#7a6248]">
    <p class="font-serif text-lg italic text-[#7a3b1e]">Bella Cucina</p>
    <p class="mt-2">Via Roma 12, San Francisco, CA · hello@bellacucina.com</p>
    <p class="mt-1">© 2026 Bella Cucina. All rights reserved.</p>
  </footer>
</body>
</html>$$,
    '',
    '{}'::jsonb,
    TRUE,
    TRUE,
    NOW(),
    NOW()
),
(
    'dddddddd-dddd-dddd-dddd-dddddddddddd',
    '44444444-4444-4444-4444-444444444444',
    'SaaS Launch',
    'saas-launch',
    'Modern SaaS product launch page with pricing table, features, and email capture.',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Streamline | Work Smarter</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-950 text-slate-100 antialiased">
  <nav class="border-b border-slate-800 bg-slate-950 px-6 py-4">
    <div class="mx-auto flex max-w-7xl items-center justify-between">
      <a href="#" class="text-lg font-bold text-white">Streamline</a>
      <ul class="hidden gap-8 text-sm text-slate-400 md:flex">
        <li><a href="#features" class="hover:text-white">Features</a></li>
        <li><a href="#pricing" class="hover:text-white">Pricing</a></li>
        <li><a href="#faq" class="hover:text-white">FAQ</a></li>
      </ul>
      <a href="#signup" class="rounded-full bg-violet-600 px-5 py-2 text-sm font-semibold text-white hover:bg-violet-500">Get Early Access</a>
    </div>
  </nav>

  <header class="mx-auto max-w-4xl px-6 py-24 text-center">
    <p class="inline-flex rounded-full border border-violet-500/40 bg-violet-500/10 px-4 py-1 text-xs uppercase tracking-[0.25em] text-violet-300">Now in Public Beta</p>
    <h1 class="mt-6 text-5xl font-bold leading-tight md:text-6xl">The operating system<br/><span class="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">for modern teams.</span></h1>
    <p class="mx-auto mt-6 max-w-2xl text-lg text-slate-400">Streamline replaces your disconnected stack with one intelligent workspace — tasks, docs, goals, and people, unified.</p>
    <form class="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row" id="signup">
      <input type="email" placeholder="Enter your work email" class="flex-1 rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-violet-500" />
      <button type="submit" class="rounded-full bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500">Start Free →</button>
    </form>
    <p class="mt-4 text-xs text-slate-500">No credit card required. Free forever on Starter.</p>
  </header>

  <section class="border-y border-slate-800 py-8">
    <div class="mx-auto max-w-7xl px-6 text-center">
      <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Trusted by 10,000+ teams worldwide</p>
      <div class="mt-6 grid grid-cols-2 gap-4 text-sm font-semibold text-slate-400 sm:grid-cols-3 md:grid-cols-6">
        <span>ATLAS</span><span>KENTO</span><span>VELARIS</span><span>BRIGHTCO</span><span>SONAR</span><span>DRIFTLY</span>
      </div>
    </div>
  </section>

  <section id="features" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-center text-3xl font-bold">Everything your team needs</h2>
    <p class="mx-auto mt-3 max-w-xl text-center text-slate-400">Built for speed, designed for clarity, optimized for the way modern teams actually work.</p>
    <div class="mt-12 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
        <p class="text-3xl">🗂</p>
        <h3 class="mt-4 text-xl font-semibold text-violet-300">Smart Tasks</h3>
        <p class="mt-3 text-slate-400">AI-assisted task management that learns your team's priorities and surfaces what matters most.</p>
      </article>
      <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
        <p class="text-3xl">📄</p>
        <h3 class="mt-4 text-xl font-semibold text-violet-300">Living Docs</h3>
        <p class="mt-3 text-slate-400">Documents that stay connected to your work — linked to tasks, goals, and teammates in real time.</p>
      </article>
      <article class="rounded-2xl border border-slate-800 bg-slate-900/60 p-7">
        <p class="text-3xl">🎯</p>
        <h3 class="mt-4 text-xl font-semibold text-violet-300">Goal Tracking</h3>
        <p class="mt-3 text-slate-400">Set OKRs, track progress, and automatically roll up results from project activity.</p>
      </article>
    </div>
    <div class="mt-10 grid gap-4 md:grid-cols-3">
      <div class="rounded-xl bg-slate-900 p-5"><p class="text-xs text-slate-500">How It Works — Step 1</p><p class="mt-2 font-semibold">Connect your tools</p><p class="mt-1 text-sm text-slate-400">Import from Notion, Jira, Asana in minutes.</p></div>
      <div class="rounded-xl bg-slate-900 p-5"><p class="text-xs text-slate-500">How It Works — Step 2</p><p class="mt-2 font-semibold">Set your goals</p><p class="mt-1 text-sm text-slate-400">Define team and individual objectives with deadlines.</p></div>
      <div class="rounded-xl bg-slate-900 p-5"><p class="text-xs text-slate-500">How It Works — Step 3</p><p class="mt-2 font-semibold">Work and measure</p><p class="mt-1 text-sm text-slate-400">Streamline surfaces insights as you work.</p></div>
    </div>
  </section>

  <section id="pricing" class="border-y border-slate-800 bg-slate-900/30 py-20">
    <div class="mx-auto max-w-7xl px-6">
      <h2 class="text-center text-3xl font-bold">Simple, transparent pricing</h2>
      <div class="mt-12 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-slate-700 bg-slate-950 p-8">
          <h3 class="text-xl font-semibold">Starter</h3>
          <p class="mt-2 text-3xl font-bold text-white">Free</p>
          <p class="mt-1 text-sm text-slate-400">Forever free for small teams</p>
          <ul class="mt-6 space-y-3 text-sm text-slate-300">
            <li>✓ Up to 5 members</li><li>✓ Unlimited tasks</li><li>✓ 5 GB storage</li><li>✗ Advanced analytics</li>
          </ul>
          <a href="#signup" class="mt-8 block rounded-full border border-slate-600 px-4 py-2 text-center text-sm font-semibold hover:border-violet-500">Get Started</a>
        </article>
        <article class="rounded-2xl border border-violet-500/50 bg-slate-950 p-8 shadow-xl shadow-violet-900/30">
          <p class="mb-2 text-xs uppercase tracking-widest text-violet-400">Most Popular</p>
          <h3 class="text-xl font-semibold">Pro</h3>
          <p class="mt-2 text-3xl font-bold text-white">$18<span class="text-sm font-normal text-slate-400">/mo per seat</span></p>
          <ul class="mt-6 space-y-3 text-sm text-slate-300">
            <li>✓ Unlimited members</li><li>✓ Advanced analytics</li><li>✓ 100 GB storage</li><li>✓ Priority support</li>
          </ul>
          <a href="#signup" class="mt-8 block rounded-full bg-violet-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-violet-500">Start Free Trial</a>
        </article>
        <article class="rounded-2xl border border-slate-700 bg-slate-950 p-8">
          <h3 class="text-xl font-semibold">Enterprise</h3>
          <p class="mt-2 text-3xl font-bold text-white">Custom</p>
          <p class="mt-1 text-sm text-slate-400">For large organizations</p>
          <ul class="mt-6 space-y-3 text-sm text-slate-300">
            <li>✓ Dedicated support</li><li>✓ SSO / SAML</li><li>✓ Unlimited storage</li><li>✓ SLA guarantee</li>
          </ul>
          <a href="#" class="mt-8 block rounded-full border border-slate-600 px-4 py-2 text-center text-sm font-semibold hover:border-violet-500">Contact Sales</a>
        </article>
      </div>
    </div>
  </section>

  <section id="faq" class="mx-auto max-w-3xl px-6 py-20">
    <h2 class="text-center text-3xl font-bold">Frequently asked questions</h2>
    <div class="mt-10 space-y-4">
      <details class="rounded-xl border border-slate-800 bg-slate-900/50 p-5"><summary class="cursor-pointer font-medium">Is there a free plan?</summary><p class="mt-3 text-slate-400">Yes. Our Starter plan is free forever for teams of up to 5 members with unlimited tasks.</p></details>
      <details class="rounded-xl border border-slate-800 bg-slate-900/50 p-5"><summary class="cursor-pointer font-medium">Can I import from other tools?</summary><p class="mt-3 text-slate-400">Absolutely. We support one-click imports from Notion, Jira, Asana, Linear, and Trello.</p></details>
      <details class="rounded-xl border border-slate-800 bg-slate-900/50 p-5"><summary class="cursor-pointer font-medium">How does billing work?</summary><p class="mt-3 text-slate-400">You are billed monthly per active seat. Annual plans include a 20% discount.</p></details>
      <details class="rounded-xl border border-slate-800 bg-slate-900/50 p-5"><summary class="cursor-pointer font-medium">Is my data secure?</summary><p class="mt-3 text-slate-400">Yes. We are SOC 2 Type II certified, with end-to-end encryption and daily backups.</p></details>
    </div>
  </section>

  <section class="bg-gradient-to-r from-violet-900 to-blue-900 py-20 text-center text-white">
    <h2 class="text-4xl font-bold">Start building with Streamline today.</h2>
    <p class="mt-4 text-violet-200">Join 10,000+ teams who moved from chaos to clarity.</p>
    <a href="#signup" class="mt-8 inline-flex rounded-full bg-white px-8 py-3 text-sm font-semibold text-violet-900 hover:bg-violet-100">Get Early Access →</a>
  </section>

  <footer class="border-t border-slate-800 bg-slate-950 py-10 text-center text-sm text-slate-500">
    © 2026 Streamline Inc. All rights reserved.
  </footer>
</body>
</html>$$,
    '',
    '{}'::jsonb,
    TRUE,
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO UPDATE SET
    name = EXCLUDED.name,
    description = EXCLUDED.description,
    thumbnail_url = EXCLUDED.thumbnail_url,
    html_content = EXCLUDED.html_content,
    css_content = EXCLUDED.css_content,
    editor_state = EXCLUDED.editor_state,
    is_premium = EXCLUDED.is_premium,
    updated_at = NOW();