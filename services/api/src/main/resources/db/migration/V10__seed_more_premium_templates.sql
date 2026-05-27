INSERT INTO templates (id, category_id, name, slug, description, thumbnail_url, html_content, css_content, editor_state, is_premium, is_active, created_at, updated_at)
VALUES
(
    'e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e101',
    '11111111-1111-1111-1111-111111111111',
    'Nexus Tech',
    'nexus-tech',
    'Tech startup and SaaS company template with pricing, stats, and integrations.',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nexus Tech | SaaS Infrastructure</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-950 text-neutral-100 antialiased">
  <nav class="sticky top-0 z-50 border-b border-cyan-400/30 bg-neutral-950/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-lg font-semibold tracking-wide text-cyan-300">Nexus Tech</a>
      <ul class="hidden items-center gap-8 text-sm text-neutral-300 md:flex">
        <li><a href="#features" class="hover:text-cyan-300">Features</a></li>
        <li><a href="#integrations" class="hover:text-cyan-300">Integrations</a></li>
        <li><a href="#pricing" class="hover:text-cyan-300">Pricing</a></li>
      </ul>
      <a href="#pricing" class="rounded-full bg-gradient-to-r from-amber-400 to-cyan-300 px-5 py-2 text-sm font-semibold text-neutral-900 hover:opacity-90">Start Free Trial</a>
    </div>
  </nav>

  <header class="relative overflow-hidden">
    <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop" alt="SaaS infrastructure" class="absolute inset-0 h-full w-full object-cover opacity-30" />
    <div class="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-900/80"></div>
    <div class="relative mx-auto grid min-h-[78vh] max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
      <div>
        <h1 class="bg-gradient-to-r from-cyan-300 via-cyan-200 to-amber-300 bg-clip-text text-4xl font-bold leading-tight text-transparent sm:text-5xl lg:text-6xl">Ship Faster. Scale Without Friction.</h1>
        <p class="mt-6 max-w-2xl text-lg text-neutral-300">Nexus Tech gives modern SaaS teams the infrastructure to deploy globally, monitor deeply, and iterate confidently across every release.</p>
        <div class="mt-8 flex flex-wrap gap-4">
          <a href="#pricing" class="rounded-full bg-cyan-300 px-6 py-3 text-sm font-semibold text-neutral-900 hover:bg-cyan-200">Start Free Trial</a>
          <a href="#features" class="rounded-full border border-cyan-300/50 px-6 py-3 text-sm font-semibold text-cyan-200 hover:border-cyan-200 hover:text-cyan-100">View Platform</a>
        </div>
        <div class="mt-8 flex flex-wrap gap-3 text-xs font-semibold uppercase tracking-wide text-cyan-200">
          <span class="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1">SOC 2</span>
          <span class="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1">Serverless</span>
          <span class="rounded-full border border-cyan-400/40 bg-cyan-400/10 px-3 py-1">Global Edge</span>
        </div>
      </div>
      <aside class="rounded-2xl border border-cyan-400/30 bg-neutral-900/85 p-8 shadow-2xl shadow-cyan-950/40">
        <h2 class="text-xl font-semibold text-cyan-300">Product Snapshot</h2>
        <div class="mt-6 space-y-5 text-sm text-neutral-300">
          <div class="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4">
            <h3 class="font-semibold text-neutral-100">Deploy Pipelines</h3>
            <p class="mt-2">Push from Git to production in under 60 seconds with built-in canary rollout controls.</p>
          </div>
          <div class="rounded-xl border border-neutral-700 bg-neutral-800/60 p-4">
            <h3 class="font-semibold text-neutral-100">Unified Observability</h3>
            <p class="mt-2">Track latency, errors, and conversion impact from one live analytics control center.</p>
          </div>
        </div>
      </aside>
    </div>
  </header>

  <section class="border-y border-neutral-800 bg-neutral-900/40 py-10">
    <div class="mx-auto grid max-w-7xl gap-6 px-6 text-center md:grid-cols-3">
      <div>
        <p class="text-3xl font-bold text-cyan-300">99.9%</p>
        <p class="mt-2 text-sm text-neutral-300">Uptime</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-cyan-300">2M+</p>
        <p class="mt-2 text-sm text-neutral-300">API Calls/Day</p>
      </div>
      <div>
        <p class="text-3xl font-bold text-cyan-300">SOC 2</p>
        <p class="mt-2 text-sm text-neutral-300">Certified</p>
      </div>
    </div>
  </section>

  <section id="features" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-bold text-neutral-100">Core Features</h2>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-7">
        <div class="text-3xl text-cyan-300">&#9889;</div>
        <h3 class="mt-4 text-xl font-semibold text-cyan-200">Instant Deploys</h3>
        <p class="mt-3 text-neutral-300">Ship new versions from branch to edge nodes instantly with rollback safety built in.</p>
      </article>
      <article class="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-7">
        <div class="text-3xl text-cyan-300">&#128274;</div>
        <h3 class="mt-4 text-xl font-semibold text-cyan-200">Security by Default</h3>
        <p class="mt-3 text-neutral-300">Secure-by-design policies include encryption, least privilege controls, and audit tracing.</p>
      </article>
      <article class="rounded-2xl border border-neutral-800 bg-neutral-900/70 p-7">
        <div class="text-3xl text-cyan-300">&#128202;</div>
        <h3 class="mt-4 text-xl font-semibold text-cyan-200">Actionable Insights</h3>
        <p class="mt-3 text-neutral-300">Connect product telemetry and business KPIs to make each release measurable.</p>
      </article>
    </div>
  </section>

  <section id="integrations" class="mx-auto max-w-7xl px-6 pb-20">
    <h2 class="text-3xl font-bold text-neutral-100">Integrations</h2>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-xl border border-cyan-400/30 bg-neutral-900 p-4 text-center text-sm font-semibold text-cyan-200">Slack</div>
      <div class="rounded-xl border border-cyan-400/30 bg-neutral-900 p-4 text-center text-sm font-semibold text-cyan-200">GitHub</div>
      <div class="rounded-xl border border-cyan-400/30 bg-neutral-900 p-4 text-center text-sm font-semibold text-cyan-200">Stripe</div>
      <div class="rounded-xl border border-cyan-400/30 bg-neutral-900 p-4 text-center text-sm font-semibold text-cyan-200">AWS</div>
      <div class="rounded-xl border border-cyan-400/30 bg-neutral-900 p-4 text-center text-sm font-semibold text-cyan-200">Notion</div>
      <div class="rounded-xl border border-cyan-400/30 bg-neutral-900 p-4 text-center text-sm font-semibold text-cyan-200">Figma</div>
    </div>
    <blockquote class="mt-10 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-8 text-neutral-200">
      "Nexus Tech gave us the speed to launch globally without adding operational drag."
      <footer class="mt-4 text-sm text-amber-200">Mara Jensen, CTO at HelixCloud</footer>
    </blockquote>
  </section>

  <section id="pricing" class="mx-auto max-w-7xl px-6 pb-20">
    <h2 class="text-3xl font-bold text-neutral-100">Pricing</h2>
    <div class="mt-10 grid gap-6 lg:grid-cols-3">
      <article class="rounded-2xl border border-neutral-800 bg-neutral-900 p-7">
        <h3 class="text-xl font-semibold text-neutral-100">Starter</h3>
        <p class="mt-3 text-3xl font-bold text-cyan-200">Free</p>
        <p class="mt-2 text-sm text-neutral-300">Perfect for validating early ideas.</p>
      </article>
      <article class="rounded-2xl border-2 border-cyan-300 bg-neutral-900 p-7 shadow-xl shadow-cyan-950/40">
        <h3 class="text-xl font-semibold text-neutral-100">Pro</h3>
        <p class="mt-3 text-3xl font-bold text-cyan-200">$49/mo</p>
        <p class="mt-2 text-sm text-neutral-300">Built for growth teams shipping every week.</p>
      </article>
      <article class="rounded-2xl border border-neutral-800 bg-neutral-900 p-7">
        <h3 class="text-xl font-semibold text-neutral-100">Enterprise</h3>
        <p class="mt-3 text-3xl font-bold text-cyan-200">Custom</p>
        <p class="mt-2 text-sm text-neutral-300">Advanced compliance and dedicated support.</p>
      </article>
    </div>
  </section>

  <footer class="border-t border-neutral-800 bg-neutral-950">
    <div class="mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-4">
      <div>
        <p class="text-lg font-semibold text-cyan-300">Nexus Tech</p>
        <p class="mt-3 text-sm text-neutral-400">Infrastructure for modern software teams.</p>
      </div>
      <div>
        <p class="font-semibold text-neutral-100">Services</p>
        <ul class="mt-3 space-y-2 text-sm text-neutral-400">
          <li>Platform Hosting</li>
          <li>Observability</li>
          <li>Security Automation</li>
        </ul>
      </div>
      <div>
        <p class="font-semibold text-neutral-100">Company</p>
        <ul class="mt-3 space-y-2 text-sm text-neutral-400">
          <li>About</li>
          <li>Careers</li>
          <li>Blog</li>
        </ul>
      </div>
      <div>
        <p class="font-semibold text-neutral-100">Contact</p>
        <ul class="mt-3 space-y-2 text-sm text-neutral-400">
          <li>support@nexustech.io</li>
          <li>+1 415 555 0199</li>
          <li>San Francisco, CA</li>
        </ul>
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
    'e2e2e2e2-e2e2-e2e2-e2e2-e2e2e2e2e202',
    '11111111-1111-1111-1111-111111111111',
    'Sterling Law Group',
    'sterling-law',
    'Professional law firm template with practice areas, attorney profiles, and consultation CTA.',
    'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sterling Law Group</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
    body { font-family: 'Inter', sans-serif; background: #1a3a2a; }
    .serif { font-family: 'Cormorant Garamond', serif; }
  </style>
</head>
<body class="text-neutral-100 antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#c9a227]/30 bg-[#1a3a2a]/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="serif text-2xl font-semibold text-[#c9a227]">Sterling Law Group</a>
      <ul class="hidden items-center gap-8 text-sm text-neutral-200 md:flex">
        <li><a href="#practice" class="hover:text-[#c9a227]">Practice Areas</a></li>
        <li><a href="#about" class="hover:text-[#c9a227]">About</a></li>
        <li><a href="#contact" class="hover:text-[#c9a227]">Contact</a></li>
      </ul>
      <a href="#contact" class="rounded-full bg-[#c9a227] px-5 py-2 text-sm font-semibold text-[#1a3a2a] hover:bg-[#d9b44f]">Schedule Consultation</a>
    </div>
  </nav>

  <header class="mx-auto max-w-7xl px-6 py-20 lg:py-24">
    <h1 class="serif text-5xl font-bold leading-tight text-[#f6e7be] md:text-6xl">Experienced Counsel. Trusted Results.</h1>
    <p class="mt-6 max-w-3xl text-lg text-neutral-200">For more than two decades, Sterling Law Group has represented businesses and individuals with strategic legal guidance, courtroom strength, and unwavering client focus.</p>
    <div class="mt-8 flex flex-wrap gap-4">
      <a href="#contact" class="rounded-full bg-[#c9a227] px-6 py-3 text-sm font-semibold text-[#1a3a2a] hover:bg-[#d9b44f]">Schedule Consultation</a>
      <a href="tel:+12125550174" class="rounded-full border border-[#c9a227]/60 px-6 py-3 text-sm font-semibold text-[#f6e7be] hover:border-[#c9a227]">+1 212 555 0174</a>
    </div>
  </header>

  <section id="practice" class="mx-auto max-w-7xl px-6 pb-16">
    <h2 class="serif text-4xl font-semibold text-[#f6e7be]">Practice Areas</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <article class="rounded-2xl border border-[#c9a227]/30 bg-[#11261b] p-6">
        <div class="text-3xl text-[#c9a227]">&#9878;</div>
        <h3 class="mt-4 serif text-2xl text-[#f6e7be]">Corporate Law</h3>
      </article>
      <article class="rounded-2xl border border-[#c9a227]/30 bg-[#11261b] p-6">
        <div class="text-3xl text-[#c9a227]">&#127963;</div>
        <h3 class="mt-4 serif text-2xl text-[#f6e7be]">Civil Litigation</h3>
      </article>
      <article class="rounded-2xl border border-[#c9a227]/30 bg-[#11261b] p-6">
        <div class="text-3xl text-[#c9a227]">&#129309;</div>
        <h3 class="mt-4 serif text-2xl text-[#f6e7be]">M&amp;A Advisory</h3>
      </article>
      <article class="rounded-2xl border border-[#c9a227]/30 bg-[#11261b] p-6">
        <div class="text-3xl text-[#c9a227]">&#128101;</div>
        <h3 class="mt-4 serif text-2xl text-[#f6e7be]">Employment Law</h3>
      </article>
    </div>
  </section>

  <section class="border-y border-[#c9a227]/30 bg-[#11261b] py-8">
    <div class="mx-auto grid max-w-7xl gap-4 px-6 text-center md:grid-cols-3">
      <p class="text-lg font-semibold text-[#f6e7be]">500+ Cases Won</p>
      <p class="text-lg font-semibold text-[#f6e7be]">25 Years Experience</p>
      <p class="text-lg font-semibold text-[#f6e7be]">98% Client Satisfaction</p>
    </div>
  </section>

  <section id="about" class="mx-auto max-w-7xl px-6 py-16">
    <h2 class="serif text-4xl font-semibold text-[#f6e7be]">Attorneys</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-[#c9a227]/25 bg-[#11261b] p-5">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="James Sterling" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="serif mt-4 text-2xl text-[#f6e7be]">James Sterling</h3>
        <p class="text-sm text-[#d8c58d]">Founding Partner</p>
      </article>
      <article class="rounded-2xl border border-[#c9a227]/25 bg-[#11261b] p-5">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Elena Torres" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="serif mt-4 text-2xl text-[#f6e7be]">Elena Torres</h3>
        <p class="text-sm text-[#d8c58d]">Senior Associate</p>
      </article>
      <article class="rounded-2xl border border-[#c9a227]/25 bg-[#11261b] p-5">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&auto=format&fit=crop" alt="David Park" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="serif mt-4 text-2xl text-[#f6e7be]">David Park</h3>
        <p class="text-sm text-[#d8c58d]">Of Counsel</p>
      </article>
    </div>

    <blockquote class="mt-10 rounded-2xl border border-[#c9a227]/30 bg-[#0f2219] p-8 text-neutral-200">
      "Sterling Law Group brought clarity, composure, and exceptional legal outcomes when our company faced a high-stakes dispute."
      <footer class="mt-3 text-sm text-[#d8c58d]">Client Testimonial</footer>
    </blockquote>
  </section>

  <section class="mx-auto max-w-7xl px-6 pb-16">
    <h2 class="serif text-4xl font-semibold text-[#f6e7be]">How We Work</h2>
    <div class="mt-8 grid gap-5 md:grid-cols-3">
      <div class="rounded-2xl border border-[#c9a227]/25 bg-[#11261b] p-6">
        <p class="text-sm font-semibold uppercase tracking-wide text-[#d8c58d]">Step 1</p>
        <h3 class="serif mt-2 text-2xl text-[#f6e7be]">Initial Consultation</h3>
      </div>
      <div class="rounded-2xl border border-[#c9a227]/25 bg-[#11261b] p-6">
        <p class="text-sm font-semibold uppercase tracking-wide text-[#d8c58d]">Step 2</p>
        <h3 class="serif mt-2 text-2xl text-[#f6e7be]">Case Strategy</h3>
      </div>
      <div class="rounded-2xl border border-[#c9a227]/25 bg-[#11261b] p-6">
        <p class="text-sm font-semibold uppercase tracking-wide text-[#d8c58d]">Step 3</p>
        <h3 class="serif mt-2 text-2xl text-[#f6e7be]">Resolution</h3>
      </div>
    </div>
  </section>

  <footer id="contact" class="border-t border-[#c9a227]/30 bg-[#0d1d15]">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <p class="serif text-2xl text-[#f6e7be]">Sterling Law Group</p>
      <p class="mt-3 text-sm text-neutral-300">390 Madison Ave, New York, NY 10017 | +1 212 555 0174 | counsel@sterlinglawgroup.com</p>
      <p class="mt-4 text-xs text-neutral-400">Attorney Advertising. Prior results do not guarantee a similar outcome.</p>
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
    'e3e3e3e3-e3e3-e3e3-e3e3-e3e3e3e3e303',
    '11111111-1111-1111-1111-111111111111',
    'Apex Realty',
    'apex-realty',
    'Real estate agency template with property listings, agent profiles, and property search CTA.',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Apex Realty</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-800 antialiased">
  <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-2xl font-bold tracking-tight text-slate-900">Apex Realty</a>
      <ul class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        <li><a href="#listings" class="hover:text-[#e07040]">Buy</a></li>
        <li><a href="#why" class="hover:text-[#e07040]">Sell</a></li>
        <li><a href="#agents" class="hover:text-[#e07040]">Agents</a></li>
        <li><a href="#about" class="hover:text-[#e07040]">About</a></li>
      </ul>
      <a href="#" class="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-[#e07040] hover:text-[#e07040]">Login</a>
    </div>
  </nav>

  <header class="relative overflow-hidden">
    <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop" alt="Luxury home" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-slate-900/60"></div>
    <div class="relative mx-auto flex min-h-[78vh] max-w-7xl flex-col justify-center px-6 py-20">
      <h1 class="max-w-3xl text-5xl font-bold leading-tight text-white md:text-6xl">Find Your Dream Home</h1>
      <p class="mt-5 max-w-2xl text-lg text-slate-200">Explore curated listings with expert local agents who guide every step from search to closing.</p>
      <form class="mt-8 grid gap-4 rounded-2xl bg-white/95 p-5 shadow-2xl md:grid-cols-4">
        <input type="text" placeholder="Location" class="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700" />
        <select class="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700">
          <option>Type</option>
          <option>Single Family</option>
          <option>Condo</option>
          <option>Townhome</option>
        </select>
        <select class="rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-700">
          <option>Price Range</option>
          <option>$500K - $900K</option>
          <option>$900K - $1.5M</option>
          <option>$1.5M+</option>
        </select>
        <button type="button" class="rounded-lg bg-[#e07040] px-4 py-3 text-sm font-semibold text-white hover:bg-[#cf6235]">Search</button>
      </form>
    </div>
  </header>

  <section id="listings" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-bold text-slate-900">Featured Listings</h2>
    <div class="mt-10 grid gap-6 md:grid-cols-3">
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop" alt="Modern hillside home" class="h-52 w-full object-cover" />
        <div class="p-6">
          <p class="text-2xl font-bold text-[#e07040]">$1.2M</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span class="rounded-full bg-slate-100 px-3 py-1">4bd</span>
            <span class="rounded-full bg-slate-100 px-3 py-1">3ba</span>
            <span class="rounded-full bg-slate-100 px-3 py-1">2,100 sqft</span>
          </div>
          <p class="mt-4 text-sm text-slate-600">Willow Heights</p>
        </div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1572120360610-d971b9d7767c?w=1200&auto=format&fit=crop" alt="Suburban home" class="h-52 w-full object-cover" />
        <div class="p-6">
          <p class="text-2xl font-bold text-[#e07040]">$875K</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span class="rounded-full bg-slate-100 px-3 py-1">4bd</span>
            <span class="rounded-full bg-slate-100 px-3 py-1">3ba</span>
            <span class="rounded-full bg-slate-100 px-3 py-1">2,100 sqft</span>
          </div>
          <p class="mt-4 text-sm text-slate-600">Maple Ridge</p>
        </div>
      </article>
      <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop" alt="Luxury estate" class="h-52 w-full object-cover" />
        <div class="p-6">
          <p class="text-2xl font-bold text-[#e07040]">$2.1M</p>
          <div class="mt-3 flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span class="rounded-full bg-slate-100 px-3 py-1">4bd</span>
            <span class="rounded-full bg-slate-100 px-3 py-1">3ba</span>
            <span class="rounded-full bg-slate-100 px-3 py-1">2,100 sqft</span>
          </div>
          <p class="mt-4 text-sm text-slate-600">Coral Point</p>
        </div>
      </article>
    </div>
  </section>

  <section id="why" class="border-y border-slate-200 bg-slate-50 py-14">
    <div class="mx-auto grid max-w-7xl gap-6 px-6 text-center md:grid-cols-4">
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="text-2xl">&#127969;</div>
        <p class="mt-2 font-semibold text-slate-800">Local Experts</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="text-2xl">&#128203;</div>
        <p class="mt-2 font-semibold text-slate-800">500+ Listings</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="text-2xl">&#128197;</div>
        <p class="mt-2 font-semibold text-slate-800">12yr Track Record</p>
      </div>
      <div class="rounded-xl border border-slate-200 bg-white p-5">
        <div class="text-2xl">&#128222;</div>
        <p class="mt-2 font-semibold text-slate-800">24/7 Support</p>
      </div>
    </div>
  </section>

  <section id="agents" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-bold text-slate-900">Meet Our Agents</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Michael Reeves" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="mt-4 text-xl font-semibold text-slate-900">Michael Reeves</h3>
        <p class="text-sm text-[#e07040]">Principal Agent</p>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Sofia Bennett" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="mt-4 text-xl font-semibold text-slate-900">Sofia Bennett</h3>
        <p class="text-sm text-[#e07040]">Senior Agent</p>
      </article>
      <article class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&auto=format&fit=crop" alt="Ethan Cole" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="mt-4 text-xl font-semibold text-slate-900">Ethan Cole</h3>
        <p class="text-sm text-[#e07040]">Buyers Specialist</p>
      </article>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 pb-20" id="about">
    <h2 class="text-3xl font-bold text-slate-900">Client Stories</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <blockquote class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">"Apex helped us secure a perfect family home in less than two weeks."</blockquote>
      <blockquote class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">"Their negotiation strategy saved us significantly while keeping the process smooth."</blockquote>
      <blockquote class="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-slate-700">"From first tour to final close, the team was proactive, clear, and always available."</blockquote>
    </div>
  </section>

  <footer class="border-t border-slate-200 bg-white">
    <div class="mx-auto grid max-w-7xl gap-6 px-6 py-12 md:grid-cols-3">
      <div>
        <p class="text-xl font-bold text-slate-900">Apex Realty</p>
        <p class="mt-2 text-sm text-slate-600">145 Harbor View Blvd, San Diego, CA 92101</p>
      </div>
      <div>
        <p class="font-semibold text-slate-800">Contact</p>
        <p class="mt-2 text-sm text-slate-600">+1 619 555 0122</p>
        <p class="text-sm text-slate-600">hello@apexrealty.com</p>
      </div>
      <div>
        <p class="font-semibold text-slate-800">Social</p>
        <p class="mt-2 text-sm text-slate-600">Instagram | LinkedIn | YouTube</p>
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
    'e4e4e4e4-e4e4-e4e4-e4e4-e4e4e4e4e404',
    '11111111-1111-1111-1111-111111111111',
    'Vantage Wealth',
    'vantage-wealth',
    'Financial advisory and wealth management template with services, stats, team, and process sections.',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Vantage Wealth</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0d1b2a] text-neutral-100 antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#c9a96e]/30 bg-[#0d1b2a]/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-xl font-semibold tracking-wide text-[#c9a96e]">Vantage Wealth</a>
      <ul class="hidden items-center gap-8 text-sm text-neutral-300 md:flex">
        <li><a href="#services" class="hover:text-[#c9a96e]">Services</a></li>
        <li><a href="#team" class="hover:text-[#c9a96e]">Team</a></li>
        <li><a href="#process" class="hover:text-[#c9a96e]">Process</a></li>
      </ul>
      <a href="#contact" class="rounded-full bg-[#c9a96e] px-5 py-2 text-sm font-semibold text-[#0d1b2a] hover:bg-[#dcbc86]">Book a Review</a>
    </div>
  </nav>

  <header class="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
    <div>
      <h1 class="text-5xl font-bold leading-tight text-white md:text-6xl">Grow and Protect What Matters Most</h1>
      <p class="mt-5 max-w-2xl text-lg text-neutral-300">Vantage Wealth partners with families, founders, and executives to build resilient plans that balance growth with long-term security.</p>
      <div class="mt-8 grid gap-4 sm:grid-cols-2">
        <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-4">
          <p class="text-xs uppercase tracking-wide text-neutral-400">AUM</p>
          <p class="mt-1 text-2xl font-bold text-[#c9a96e]">$2.3B</p>
        </div>
        <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-4">
          <p class="text-xs uppercase tracking-wide text-neutral-400">Clients</p>
          <p class="mt-1 text-2xl font-bold text-[#c9a96e]">1,200+</p>
        </div>
        <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-4">
          <p class="text-xs uppercase tracking-wide text-neutral-400">Avg Return</p>
          <p class="mt-1 text-2xl font-bold text-[#c9a96e]">11.4%</p>
        </div>
        <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-4">
          <p class="text-xs uppercase tracking-wide text-neutral-400">Years in Business</p>
          <p class="mt-1 text-2xl font-bold text-[#c9a96e]">28</p>
        </div>
      </div>
    </div>
    <div class="rounded-2xl border border-[#c9a96e]/30 bg-[#13263a] p-8">
      <h2 class="text-xl font-semibold text-[#e6d5ae]">Portfolio Growth Trend</h2>
      <div class="mt-8 flex items-end justify-between gap-3">
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 rounded-t bg-[#c9a96e]" style="height: 70px;"></div>
          <span class="text-xs text-neutral-300">2020</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 rounded-t bg-[#c9a96e]" style="height: 95px;"></div>
          <span class="text-xs text-neutral-300">2021</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 rounded-t bg-[#c9a96e]" style="height: 120px;"></div>
          <span class="text-xs text-neutral-300">2022</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 rounded-t bg-[#c9a96e]" style="height: 145px;"></div>
          <span class="text-xs text-neutral-300">2023</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <div class="w-10 rounded-t bg-[#c9a96e]" style="height: 170px;"></div>
          <span class="text-xs text-neutral-300">2024</span>
        </div>
      </div>
    </div>
  </header>

  <section id="services" class="mx-auto max-w-7xl px-6 pb-16">
    <h2 class="text-3xl font-bold text-white">Services</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-6">
        <div class="text-2xl text-[#c9a96e]">&#127974;</div>
        <h3 class="mt-3 text-xl font-semibold text-[#e6d5ae]">Retirement Planning</h3>
        <p class="mt-2 text-neutral-300">Build income strategies designed to sustain your lifestyle across every phase of retirement.</p>
      </article>
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-6">
        <div class="text-2xl text-[#c9a96e]">&#128202;</div>
        <h3 class="mt-3 text-xl font-semibold text-[#e6d5ae]">Tax Strategy</h3>
        <p class="mt-2 text-neutral-300">Coordinate investment decisions with tax-smart planning to preserve long-term wealth.</p>
      </article>
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-6">
        <div class="text-2xl text-[#c9a96e]">&#127968;</div>
        <h3 class="mt-3 text-xl font-semibold text-[#e6d5ae]">Estate Planning</h3>
        <p class="mt-2 text-neutral-300">Protect your legacy with structures that transfer assets efficiently and according to your intent.</p>
      </article>
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-6">
        <div class="text-2xl text-[#c9a96e]">&#128200;</div>
        <h3 class="mt-3 text-xl font-semibold text-[#e6d5ae]">Investment Management</h3>
        <p class="mt-2 text-neutral-300">Construct diversified portfolios aligned to your risk profile, timeline, and objectives.</p>
      </article>
    </div>
  </section>

  <section id="team" class="mx-auto max-w-7xl px-6 pb-16">
    <h2 class="text-3xl font-bold text-white">Advisory Team</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-5">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Victoria Lane" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="mt-4 text-xl font-semibold text-[#e6d5ae]">Victoria Lane</h3>
        <p class="text-sm text-neutral-300">Managing Partner</p>
      </article>
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-5">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Robert Chen" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="mt-4 text-xl font-semibold text-[#e6d5ae]">Robert Chen</h3>
        <p class="text-sm text-neutral-300">Senior Advisor</p>
      </article>
      <article class="rounded-2xl border border-[#c9a96e]/25 bg-[#13263a] p-5">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&auto=format&fit=crop" alt="Priya Sharma" class="h-64 w-full rounded-xl object-cover" />
        <h3 class="mt-4 text-xl font-semibold text-[#e6d5ae]">Priya Sharma</h3>
        <p class="text-sm text-neutral-300">Tax Specialist</p>
      </article>
    </div>
  </section>

  <section id="process" class="mx-auto max-w-7xl px-6 pb-16">
    <h2 class="text-3xl font-bold text-white">Our Process</h2>
    <div class="mt-8 grid gap-4 md:grid-cols-4">
      <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-5 text-center">
        <p class="text-2xl font-bold text-[#c9a96e]">1</p>
        <p class="mt-2 font-semibold text-[#e6d5ae]">Discover</p>
      </div>
      <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-5 text-center">
        <p class="text-2xl font-bold text-[#c9a96e]">2</p>
        <p class="mt-2 font-semibold text-[#e6d5ae]">Analyze</p>
      </div>
      <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-5 text-center">
        <p class="text-2xl font-bold text-[#c9a96e]">3</p>
        <p class="mt-2 font-semibold text-[#e6d5ae]">Plan</p>
      </div>
      <div class="rounded-xl border border-[#c9a96e]/30 bg-[#13263a] p-5 text-center">
        <p class="text-2xl font-bold text-[#c9a96e]">4</p>
        <p class="mt-2 font-semibold text-[#e6d5ae]">Execute</p>
      </div>
    </div>
    <p class="mt-8 text-xs text-neutral-400">Disclosures: Advisory services are offered through Vantage Wealth Advisors. All investments involve risk, including potential loss of principal. Past performance is not indicative of future results.</p>
  </section>

  <footer id="contact" class="border-t border-[#c9a96e]/30 bg-[#0b1622]">
    <div class="mx-auto max-w-7xl px-6 py-12">
      <p class="text-xl font-semibold text-[#c9a96e]">Vantage Wealth</p>
      <p class="mt-3 text-sm text-neutral-300">780 Market Street, Suite 1200, San Francisco, CA 94103 | +1 415 555 0181 | advisors@vantagewealth.com</p>
      <p class="mt-3 text-xs text-neutral-400">Vantage Wealth Advisors is an SEC registered investment adviser. Registration does not imply a certain level of skill or training.</p>
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
    'f1f1f1f1-f1f1-f1f1-f1f1-f1f1f1f1f101',
    '22222222-2222-2222-2222-222222222222',
    'Lens',
    'lens-portfolio',
    'Photographer portfolio with masonry gallery, client list, packages, and about section.',
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lens | Elias Voss</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0a0a0a] text-white antialiased">
  <nav class="sticky top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-sm font-semibold tracking-[0.25em] text-white">ELIAS VOSS</a>
      <ul class="hidden items-center gap-8 text-sm text-white/80 md:flex">
        <li><a href="#work" class="hover:text-white">Work</a></li>
        <li><a href="#about" class="hover:text-white">About</a></li>
        <li><a href="#contact" class="hover:text-white">Contact</a></li>
      </ul>
      <a href="#contact" class="rounded-full border border-white/50 px-5 py-2 text-sm font-medium text-white transition hover:border-white">Hire Me</a>
    </div>
  </nav>

  <header class="relative flex min-h-screen items-end overflow-hidden">
    <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop" alt="Photographer hero" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>
    <div class="relative mx-auto w-full max-w-7xl px-6 pb-20 pt-24">
      <p class="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/90">Available for projects</p>
      <h1 class="mt-6 text-5xl font-semibold leading-tight text-white sm:text-6xl md:text-7xl">Elias Voss</h1>
      <p class="mt-4 text-lg text-white/85 sm:text-2xl">Documentary &amp; Commercial Photographer</p>
      <div class="mt-10 flex flex-wrap gap-3 text-xs uppercase tracking-[0.15em] text-white/85">
        <span class="rounded-full border border-white/30 px-4 py-2">Portrait</span>
        <span class="rounded-full border border-white/30 px-4 py-2">Editorial</span>
        <span class="rounded-full border border-white/30 px-4 py-2">Commercial</span>
        <span class="rounded-full border border-white/30 px-4 py-2">Event</span>
      </div>
    </div>
  </header>

  <section id="work" class="mx-auto max-w-7xl px-6 py-20">
    <div class="mb-8 flex items-end justify-between">
      <h2 class="text-3xl font-semibold text-white">Selected Work</h2>
      <p class="text-sm text-white/60">Recent commissions and personal stories</p>
    </div>
    <div class="columns-1 gap-5 space-y-5 md:columns-3">
      <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1200&auto=format&fit=crop" alt="Gallery shot 1" class="h-80 w-full break-inside-avoid rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=1200&auto=format&fit=crop" alt="Gallery shot 2" class="h-[22rem] w-full break-inside-avoid rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Gallery shot 3" class="h-72 w-full break-inside-avoid rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="Gallery shot 4" class="h-96 w-full break-inside-avoid rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop" alt="Gallery shot 5" class="h-72 w-full break-inside-avoid rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Gallery shot 6" class="h-80 w-full break-inside-avoid rounded-xl object-cover" />
    </div>
  </section>

  <section id="about" class="border-y border-white/10 bg-white/[0.02]">
    <div class="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Elias portrait" class="h-[520px] w-full rounded-xl object-cover" />
      <div>
        <h2 class="text-3xl font-semibold text-white">About</h2>
        <p class="mt-5 text-lg leading-relaxed text-white/80">I have spent 10 years shooting for editorial and commercial clients across 3 continents, creating visual stories that combine atmosphere, precision, and emotion for global campaigns and independent publications.</p>
        <h3 class="mt-8 text-sm uppercase tracking-[0.2em] text-white/60">Clients</h3>
        <ul class="mt-4 grid grid-cols-2 gap-3 text-sm text-white/90">
          <li class="rounded border border-white/20 px-4 py-2">Nike</li>
          <li class="rounded border border-white/20 px-4 py-2">VOGUE</li>
          <li class="rounded border border-white/20 px-4 py-2">The Guardian</li>
          <li class="rounded border border-white/20 px-4 py-2">CondÃ© Nast</li>
          <li class="rounded border border-white/20 px-4 py-2">TIME</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-white">Packages</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-xl border border-white/15 bg-white/[0.03] p-6">
        <h3 class="text-xl font-semibold text-white">Portrait Session</h3>
        <p class="mt-2 text-3xl font-semibold text-white">$350</p>
        <p class="mt-1 text-sm text-white/60">2hr shoot</p>
        <ul class="mt-5 space-y-2 text-sm text-white/85">
          <li>20 edited images</li>
          <li>Online gallery</li>
        </ul>
      </article>
      <article class="rounded-xl border border-white/15 bg-white/[0.03] p-6">
        <h3 class="text-xl font-semibold text-white">Commercial</h3>
        <p class="mt-2 text-3xl font-semibold text-white">$1,200</p>
        <p class="mt-1 text-sm text-white/60">Half day</p>
        <ul class="mt-5 space-y-2 text-sm text-white/85">
          <li>50+ images</li>
          <li>Commercial license</li>
        </ul>
      </article>
      <article class="rounded-xl border border-white/15 bg-white/[0.03] p-6">
        <h3 class="text-xl font-semibold text-white">Event</h3>
        <p class="mt-2 text-3xl font-semibold text-white">$2,500</p>
        <p class="mt-1 text-sm text-white/60">Full day</p>
        <ul class="mt-5 space-y-2 text-sm text-white/85">
          <li>200+ images</li>
          <li>Same-week delivery</li>
        </ul>
      </article>
    </div>
  </section>

  <section id="contact" class="border-t border-white/10">
    <div class="mx-auto max-w-7xl px-6 py-20 text-center">
      <h2 class="text-3xl font-semibold text-white">Contact</h2>
      <p class="mt-4 text-white/75">hello@eliasvoss.photo</p>
      <div class="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm text-white/80">
        <a href="#" class="hover:text-white">Instagram</a>
        <a href="#" class="hover:text-white">Behance</a>
        <a href="#" class="hover:text-white">LinkedIn</a>
      </div>
    </div>
  </section>

  <footer class="border-t border-white/10 py-8 text-center text-sm text-white/50">
    Â© 2026 Elias Voss. All rights reserved.
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
    'f2f2f2f2-f2f2-f2f2-f2f2-f2f2f2f2f202',
    '22222222-2222-2222-2222-222222222222',
    'Motion Reel',
    'motion-reel',
    'Motion designer and video director portfolio with project showcase, tools, and client roster.',
    'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Motion Reel | Kai Burns</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#080808] text-white antialiased">
  <nav class="sticky top-0 z-50 border-b border-yellow-400/20 bg-[#080808]/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-sm font-bold tracking-[0.22em] text-[#f5d800]">KAI BURNS</a>
      <ul class="hidden items-center gap-8 text-sm text-white/80 md:flex">
        <li><a href="#work" class="hover:text-white">Work</a></li>
        <li><a href="#services" class="hover:text-white">Services</a></li>
        <li><a href="#contact" class="hover:text-white">Contact</a></li>
      </ul>
      <a href="#contact" class="rounded-full border border-[#f5d800] px-5 py-2 text-sm font-medium text-[#f5d800] hover:bg-[#f5d800] hover:text-[#080808]">Let's Talk</a>
    </div>
  </nav>

  <header class="mx-auto max-w-7xl px-6 pb-20 pt-24 text-center">
    <h1 class="text-5xl font-black tracking-tight text-white sm:text-7xl md:text-8xl">KAI BURNS</h1>
    <p class="mt-4 text-lg text-white/75">Motion Designer &amp; Director</p>
    <div class="mt-10 flex flex-col items-center justify-center">
      <button class="flex h-20 w-20 items-center justify-center rounded-full border-2 border-yellow-400 text-yellow-400 transition hover:bg-yellow-400 hover:text-[#080808]" aria-label="Play reel">
        <span class="ml-1 inline-block h-0 w-0 border-b-[10px] border-l-[16px] border-t-[10px] border-b-transparent border-l-current border-t-transparent"></span>
      </button>
      <p class="mt-3 text-sm uppercase tracking-[0.2em] text-white/70">Watch Reel</p>
    </div>
  </header>

  <section id="work" class="mx-auto max-w-7xl px-6 pb-20">
    <h2 class="text-3xl font-semibold text-white">Projects</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <article class="relative overflow-hidden rounded-2xl border border-white/10 p-7">
        <div class="absolute inset-0 bg-gradient-to-br from-orange-500/30 to-red-600/20"></div>
        <div class="relative">
          <p class="text-xs uppercase tracking-[0.2em] text-white/70">Brand Film</p>
          <h3 class="mt-3 text-2xl font-semibold text-white">Velocity Frames</h3>
          <p class="mt-2 text-white/80">Client: Netflix</p>
          <span class="mt-5 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs">Campaign</span>
        </div>
      </article>
      <article class="relative overflow-hidden rounded-2xl border border-white/10 p-7">
        <div class="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-blue-600/20"></div>
        <div class="relative">
          <p class="text-xs uppercase tracking-[0.2em] text-white/70">Explainer</p>
          <h3 class="mt-3 text-2xl font-semibold text-white">Signal Motion</h3>
          <p class="mt-2 text-white/80">Client: Spotify</p>
          <span class="mt-5 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs">Product</span>
        </div>
      </article>
      <article class="relative overflow-hidden rounded-2xl border border-white/10 p-7">
        <div class="absolute inset-0 bg-gradient-to-br from-teal-500/30 to-green-600/20"></div>
        <div class="relative">
          <p class="text-xs uppercase tracking-[0.2em] text-white/70">Social Series</p>
          <h3 class="mt-3 text-2xl font-semibold text-white">Loop Shift</h3>
          <p class="mt-2 text-white/80">Client: Airbnb</p>
          <span class="mt-5 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs">Social</span>
        </div>
      </article>
      <article class="relative overflow-hidden rounded-2xl border border-white/10 p-7">
        <div class="absolute inset-0 bg-gradient-to-br from-yellow-400/35 to-orange-500/25"></div>
        <div class="relative">
          <p class="text-xs uppercase tracking-[0.2em] text-white/70">Launch Spot</p>
          <h3 class="mt-3 text-2xl font-semibold text-white">Pulse Intro</h3>
          <p class="mt-2 text-white/80">Client: Adobe</p>
          <span class="mt-5 inline-flex rounded-full border border-white/30 px-3 py-1 text-xs">Launch</span>
        </div>
      </article>
    </div>
  </section>

  <section id="services" class="border-y border-white/10 bg-white/[0.02]">
    <div class="mx-auto max-w-7xl px-6 py-20">
      <h2 class="text-3xl font-semibold text-white">Services</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-xl border border-white/10 bg-black/30 p-6">
          <div class="text-2xl text-[#f5d800]">â—†</div>
          <h3 class="mt-3 text-xl font-semibold text-white">Brand Animation</h3>
          <p class="mt-2 text-sm text-white/75">Signature motion systems that make brand identities feel alive across web and film.</p>
        </article>
        <article class="rounded-xl border border-white/10 bg-black/30 p-6">
          <div class="text-2xl text-[#f5d800]">â—‰</div>
          <h3 class="mt-3 text-xl font-semibold text-white">Social Content</h3>
          <p class="mt-2 text-sm text-white/75">Short-form campaigns designed for high retention and memorable visual language.</p>
        </article>
        <article class="rounded-xl border border-white/10 bg-black/30 p-6">
          <div class="text-2xl text-[#f5d800]">â–³</div>
          <h3 class="mt-3 text-xl font-semibold text-white">UI Motion</h3>
          <p class="mt-2 text-sm text-white/75">Product micro-interactions and transition systems that add clarity and delight.</p>
        </article>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-white">Tools</h2>
    <div class="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 md:grid-cols-6">
      <span class="rounded-full border border-yellow-400/40 px-4 py-2 text-center text-yellow-300">After Effects</span>
      <span class="rounded-full border border-yellow-400/40 px-4 py-2 text-center text-yellow-300">Cinema 4D</span>
      <span class="rounded-full border border-yellow-400/40 px-4 py-2 text-center text-yellow-300">Figma</span>
      <span class="rounded-full border border-yellow-400/40 px-4 py-2 text-center text-yellow-300">Lottie</span>
      <span class="rounded-full border border-yellow-400/40 px-4 py-2 text-center text-yellow-300">Premiere Pro</span>
      <span class="rounded-full border border-yellow-400/40 px-4 py-2 text-center text-yellow-300">Blender</span>
    </div>

    <h3 class="mt-14 text-2xl font-semibold text-white">Client Roster</h3>
    <div class="mt-6 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
      <span class="rounded border border-white/15 px-4 py-3 text-center">Netflix</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Spotify</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Airbnb</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Google</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Meta</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Adobe</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Nike</span>
      <span class="rounded border border-white/15 px-4 py-3 text-center">Figma</span>
    </div>
  </section>

  <section id="contact" class="bg-[#f5d800] py-16 text-[#080808]">
    <div class="mx-auto max-w-7xl px-6 text-center">
      <h2 class="text-4xl font-black">Have a project in motion?</h2>
      <p class="mt-3 text-base">I direct visual stories for brands launching products, ideas, and campaigns worldwide.</p>
      <a href="mailto:kai@burns.studio" class="mt-7 inline-flex rounded-full border border-[#080808] px-7 py-3 text-sm font-semibold hover:bg-[#080808] hover:text-[#f5d800]">kai@burns.studio</a>
    </div>
  </section>

  <footer class="border-t border-white/10 py-8 text-center text-sm text-white/55">
    Â© 2026 Kai Burns. Built for motion-first storytelling.
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
    'f3f3f3f3-f3f3-f3f3-f3f3-f3f3f3f3f303',
    '22222222-2222-2222-2222-222222222222',
    'Blueprint Studio',
    'blueprint-studio',
    'Architecture and interior design studio portfolio with project grid, team, and philosophy section.',
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blueprint Studio</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .serif-heading {
      font-family: Georgia, Cambria, "Times New Roman", Times, serif;
      letter-spacing: 0.01em;
    }
  </style>
</head>
<body class="bg-[#faf6f1] text-[#2d2926] antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#d9d0c6] bg-[#faf6f1]/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="serif-heading text-2xl font-semibold text-[#2d2926]">Blueprint Studio</a>
      <ul class="hidden items-center gap-8 text-sm text-[#4a433f] md:flex">
        <li><a href="#projects" class="hover:text-[#2d2926]">Projects</a></li>
        <li><a href="#studio" class="hover:text-[#2d2926]">Studio</a></li>
        <li><a href="#contact" class="hover:text-[#2d2926]">Contact</a></li>
      </ul>
      <a href="#contact" class="rounded-full bg-[#2d2926] px-5 py-2 text-sm font-medium text-[#faf6f1] hover:bg-black">Start a Project</a>
    </div>
  </nav>

  <header class="relative overflow-hidden">
    <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop" alt="Studio architecture" class="h-[72vh] w-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-[#2d2926]/70 via-[#2d2926]/20 to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 mx-auto max-w-7xl px-6 pb-14">
      <h1 class="serif-heading text-5xl font-semibold text-[#faf6f1] sm:text-6xl">Blueprint Studio</h1>
      <p class="mt-3 text-lg text-[#f3ebe3]">Architecture &amp; Interior Design, San Francisco</p>
    </div>
  </header>

  <section id="projects" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="serif-heading text-3xl font-semibold">Projects</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="overflow-hidden rounded-xl border border-[#ddd4ca] bg-white/70">
        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop" alt="Harbor Residence" class="h-56 w-full object-cover" />
        <div class="p-5"><h3 class="serif-heading text-xl">Harbor Residence</h3><span class="mt-3 inline-flex rounded-full border border-[#cbbcae] px-3 py-1 text-xs">Residential</span></div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#ddd4ca] bg-white/70">
        <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop" alt="Maple Townhouses" class="h-56 w-full object-cover" />
        <div class="p-5"><h3 class="serif-heading text-xl">Maple Townhouses</h3><span class="mt-3 inline-flex rounded-full border border-[#cbbcae] px-3 py-1 text-xs">Residential</span></div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#ddd4ca] bg-white/70">
        <img src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&auto=format&fit=crop" alt="Bayside Offices" class="h-56 w-full object-cover" />
        <div class="p-5"><h3 class="serif-heading text-xl">Bayside Offices</h3><span class="mt-3 inline-flex rounded-full border border-[#cbbcae] px-3 py-1 text-xs">Commercial</span></div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#ddd4ca] bg-white/70">
        <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop" alt="Foundry Retail Hall" class="h-56 w-full object-cover" />
        <div class="p-5"><h3 class="serif-heading text-xl">Foundry Retail Hall</h3><span class="mt-3 inline-flex rounded-full border border-[#cbbcae] px-3 py-1 text-xs">Commercial</span></div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#ddd4ca] bg-white/70">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="Oakline Loft" class="h-56 w-full object-cover" />
        <div class="p-5"><h3 class="serif-heading text-xl">Oakline Loft</h3><span class="mt-3 inline-flex rounded-full border border-[#cbbcae] px-3 py-1 text-xs">Interior</span></div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#ddd4ca] bg-white/70">
        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&auto=format&fit=crop" alt="Civic Arts Center" class="h-56 w-full object-cover" />
        <div class="p-5"><h3 class="serif-heading text-xl">Civic Arts Center</h3><span class="mt-3 inline-flex rounded-full border border-[#cbbcae] px-3 py-1 text-xs">Interior</span></div>
      </article>
    </div>
  </section>

  <section id="studio" class="border-y border-[#ddd4ca] bg-white/50">
    <div class="mx-auto grid max-w-7xl gap-12 px-6 py-20 md:grid-cols-2 md:items-start">
      <div>
        <h2 class="serif-heading text-3xl font-semibold">Philosophy</h2>
        <p class="mt-5 text-lg leading-relaxed text-[#4f4742]">Our studio believes in slow, intentional design that respects context, material, and the rhythm of daily life. We shape spaces where light, texture, and proportion work quietly together to support the people who inhabit them.</p>
      </div>
      <blockquote class="serif-heading text-4xl italic leading-tight text-[#3b3531]">"Good design does not shout. It lingers in how a space makes you feel."</blockquote>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="serif-heading text-3xl font-semibold">Awards</h2>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 px-4 py-4 text-sm">AIA Urban Design</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 px-4 py-4 text-sm">Interior Merit 2025</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 px-4 py-4 text-sm">Design Week Honors</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 px-4 py-4 text-sm">Built Environment Prize</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 px-4 py-4 text-sm">Global Space Awards</div>
    </div>

    <h3 class="serif-heading mt-14 text-2xl font-semibold">Team</h3>
    <div class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article class="rounded-xl border border-[#ddd4ca] bg-white/70 p-4">
        <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop" alt="Nora Blake" class="h-48 w-full rounded-lg object-cover" />
        <h4 class="serif-heading mt-4 text-lg">Nora Blake</h4>
      </article>
      <article class="rounded-xl border border-[#ddd4ca] bg-white/70 p-4">
        <img src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&auto=format&fit=crop" alt="Soren Malik" class="h-48 w-full rounded-lg object-cover" />
        <h4 class="serif-heading mt-4 text-lg">Soren Malik</h4>
      </article>
      <article class="rounded-xl border border-[#ddd4ca] bg-white/70 p-4">
        <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Isla Romero" class="h-48 w-full rounded-lg object-cover" />
        <h4 class="serif-heading mt-4 text-lg">Isla Romero</h4>
      </article>
      <article class="rounded-xl border border-[#ddd4ca] bg-white/70 p-4">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Theo Grant" class="h-48 w-full rounded-lg object-cover" />
        <h4 class="serif-heading mt-4 text-lg">Theo Grant</h4>
      </article>
    </div>

    <h3 class="serif-heading mt-14 text-2xl font-semibold">Services</h3>
    <div class="mt-6 grid gap-4 md:grid-cols-4">
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 p-5">Architecture</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 p-5">Interior Design</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 p-5">Renovation</div>
      <div class="rounded-lg border border-[#d6cabf] bg-white/70 p-5">Consulting</div>
    </div>
  </section>

  <section id="contact" class="border-t border-[#ddd4ca] bg-[#efe6dc]">
    <div class="mx-auto max-w-7xl px-6 py-20 text-center">
      <h2 class="serif-heading text-4xl font-semibold">Let us design your next space.</h2>
      <p class="mt-4 text-[#4f4742]">hello@blueprintstudio.sf</p>
    </div>
  </section>

  <footer class="border-t border-[#ddd4ca] py-8 text-center text-sm text-[#5f5752]">
    Â© 2026 Blueprint Studio. Crafted in San Francisco.
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
    'f4f4f4f4-f4f4-f4f4-f4f4-f4f4f4f4f404',
    '22222222-2222-2222-2222-222222222222',
    'UX Research Portfolio',
    'ux-research-portfolio',
    'UX researcher portfolio with case studies, research methods, impact metrics, and publications.',
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Aria Chen | UX Research Portfolio</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#f8f6f0] text-[#12343b] antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#12343b]/15 bg-[#f8f6f0]/90 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-lg font-semibold text-[#12343b]">Aria Chen</a>
      <ul class="hidden items-center gap-8 text-sm text-[#12343b]/80 md:flex">
        <li><a href="#case-studies" class="hover:text-[#12343b]">Case Studies</a></li>
        <li><a href="#methods" class="hover:text-[#12343b]">Methods</a></li>
        <li><a href="#publications" class="hover:text-[#12343b]">Publications</a></li>
      </ul>
      <a href="#contact" class="rounded-full bg-[#12343b] px-5 py-2 text-sm font-medium text-[#f8f6f0] hover:bg-[#0e2b31]">Work With Me</a>
    </div>
  </nav>

  <header class="mx-auto grid max-w-7xl gap-10 px-6 pb-20 pt-16 md:grid-cols-2 md:items-center">
    <img src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop" alt="Aria Chen portrait" class="h-[520px] w-full rounded-2xl object-cover" />
    <div>
      <h1 class="text-5xl font-semibold leading-tight text-[#12343b] sm:text-6xl">UX Researcher &amp; Strategist</h1>
      <p class="mt-5 max-w-xl text-lg leading-relaxed text-[#12343b]/80">I help teams uncover user insight, align product direction, and turn research into measurable outcomes for enterprise and consumer products.</p>
      <div class="mt-8 flex flex-wrap gap-3">
        <a href="#" class="rounded-full border border-[#12343b]/30 px-5 py-2 text-sm font-medium">LinkedIn</a>
        <a href="#" class="rounded-full border border-[#12343b]/30 px-5 py-2 text-sm font-medium">Dribbble</a>
        <a href="#" class="rounded-full bg-[#d86b2d] px-5 py-2 text-sm font-medium text-white hover:bg-[#c35f27]">Resume</a>
      </div>
    </div>
  </header>

  <section id="case-studies" class="mx-auto max-w-7xl px-6 pb-20">
    <h2 class="text-3xl font-semibold text-[#12343b]">Case Studies</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="overflow-hidden rounded-xl border border-[#12343b]/15 bg-white/70">
        <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop" alt="Enterprise onboarding" class="h-48 w-full object-cover" />
        <div class="p-5">
          <h3 class="text-xl font-semibold">Streamlining Enterprise Onboarding</h3>
          <p class="mt-2 text-sm text-[#12343b]/70">Tags: B2B SaaS, Onboarding, Workflow</p>
          <p class="mt-3 text-sm font-medium text-[#d86b2d]">Outcome: 34% less abandonment</p>
        </div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#12343b]/15 bg-white/70">
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&auto=format&fit=crop" alt="Mobile banking" class="h-48 w-full object-cover" />
        <div class="p-5">
          <h3 class="text-xl font-semibold">Mobile Banking Navigation Redesign</h3>
          <p class="mt-2 text-sm text-[#12343b]/70">Tags: Fintech, Information Architecture, Mobile</p>
          <p class="mt-3 text-sm font-medium text-[#d86b2d]">Outcome: 40% task completion improvement</p>
        </div>
      </article>
      <article class="overflow-hidden rounded-xl border border-[#12343b]/15 bg-white/70">
        <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop" alt="Pricing validation" class="h-48 w-full object-cover" />
        <div class="p-5">
          <h3 class="text-xl font-semibold">SaaS Pricing Experience Validation</h3>
          <p class="mt-2 text-sm text-[#12343b]/70">Tags: Monetization, Experimentation, Conversion</p>
          <p class="mt-3 text-sm font-medium text-[#d86b2d]">Outcome: 18% conversion lift</p>
        </div>
      </article>
    </div>
  </section>

  <section id="methods" class="border-y border-[#12343b]/15 bg-white/40">
    <div class="mx-auto max-w-7xl px-6 py-20">
      <h2 class="text-3xl font-semibold text-[#12343b]">Methods</h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div class="rounded-lg border border-[#12343b]/15 bg-white px-5 py-4">ðŸŽ¤ Interviews</div>
        <div class="rounded-lg border border-[#12343b]/15 bg-white px-5 py-4">ðŸ“‹ Surveys</div>
        <div class="rounded-lg border border-[#12343b]/15 bg-white px-5 py-4">ðŸ—‚ Card Sorting</div>
        <div class="rounded-lg border border-[#12343b]/15 bg-white px-5 py-4">ðŸ§ª A/B Testing</div>
        <div class="rounded-lg border border-[#12343b]/15 bg-white px-5 py-4">âœ… Heuristic Analysis</div>
        <div class="rounded-lg border border-[#12343b]/15 bg-white px-5 py-4">ðŸ§­ Journey Mapping</div>
      </div>

      <h3 class="mt-14 text-2xl font-semibold text-[#12343b]">Impact Metrics</h3>
      <div class="mt-6 grid gap-5 md:grid-cols-3">
        <div class="rounded-xl bg-[#12343b] px-6 py-7 text-[#f8f6f0]">
          <p class="text-3xl font-semibold">40%</p>
          <p class="mt-2 text-sm">task completion improvement</p>
        </div>
        <div class="rounded-xl bg-[#12343b] px-6 py-7 text-[#f8f6f0]">
          <p class="text-3xl font-semibold">3</p>
          <p class="mt-2 text-sm">enterprise clients</p>
        </div>
        <div class="rounded-xl bg-[#12343b] px-6 py-7 text-[#f8f6f0]">
          <p class="text-3xl font-semibold">15</p>
          <p class="mt-2 text-sm">usability studies</p>
        </div>
      </div>
    </div>
  </section>

  <section id="publications" class="mx-auto max-w-7xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-[#12343b]">Publications</h2>
    <div class="mt-6 space-y-4">
      <article class="rounded-xl border border-[#12343b]/15 bg-white/70 p-5">
        <h3 class="text-xl font-semibold">Designing for Trust in Complex Enterprise Workflows</h3>
        <p class="mt-1 text-sm text-[#12343b]/70">UX Collective</p>
      </article>
      <article class="rounded-xl border border-[#12343b]/15 bg-white/70 p-5">
        <h3 class="text-xl font-semibold">When Journey Maps Fail and What to Do Instead</h3>
        <p class="mt-1 text-sm text-[#12343b]/70">Nielsen Norman Group</p>
      </article>
    </div>
  </section>

  <section id="contact" class="border-t border-[#12343b]/15 bg-[#efe9de]">
    <div class="mx-auto max-w-7xl px-6 py-20 text-center">
      <h2 class="text-4xl font-semibold text-[#12343b]">Open to strategic research engagements.</h2>
      <p class="mt-4 text-[#12343b]/80">aria@researchbyaria.com</p>
    </div>
  </section>

  <footer class="border-t border-[#12343b]/15 py-8 text-center text-sm text-[#12343b]/70">
    Â© 2026 Aria Chen. Insight-driven product decisions.
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
    'a1a1a1a1-a1a1-a1a1-a1a1-a1a1a1a1a101',
    '33333333-3333-3333-3333-333333333333',
    'Sakura Sushi',
    'sakura-sushi',
    'Upscale Japanese omakase restaurant with tasting menu, chef profile, and reservation CTA.',
    'https://images.unsplash.com/photo-1617196034183-421b4040d9ab?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sakura Sushi | Omakase Experience</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0d0d0d] text-zinc-100 antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#8b1a1a]/40 bg-[#0d0d0d]/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="text-xl font-semibold tracking-widest text-[#c9a84c]">æ¡œ Sakura</a>
      <ul class="hidden items-center gap-8 text-sm uppercase tracking-[0.2em] text-zinc-300 md:flex">
        <li><a href="#about" class="hover:text-[#c9a84c]">About</a></li>
        <li><a href="#menu" class="hover:text-[#c9a84c]">Menu</a></li>
        <li><a href="#gallery" class="hover:text-[#c9a84c]">Gallery</a></li>
        <li><a href="#reserve" class="hover:text-[#c9a84c]">Reserve</a></li>
      </ul>
      <a href="#reserve" class="rounded-full bg-[#8b1a1a] px-5 py-2 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a32222]">Reserve</a>
    </div>
  </nav>

  <header class="relative flex min-h-[88vh] items-center justify-center overflow-hidden">
    <img src="https://images.unsplash.com/photo-1617196034183-421b4040d9ab?w=1200&auto=format&fit=crop" alt="Sushi counter" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-black/65"></div>
    <div class="relative px-6 text-center">
      <p class="text-6xl font-bold text-[#c9a84c] sm:text-7xl">æ¡œ</p>
      <h1 class="mt-4 text-4xl font-semibold tracking-[0.25em] text-white sm:text-5xl">SAKURA SUSHI</h1>
      <p class="mt-5 text-sm uppercase tracking-[0.25em] text-zinc-200 sm:text-base">Omakase Experience Â· Downtown San Francisco</p>
      <a href="#reserve" class="mt-8 inline-flex rounded-full bg-[#8b1a1a] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#a32222]">Reserve a Table</a>
    </div>
  </header>

  <section id="about" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-[#c9a84c]">Our Omakase Philosophy</h2>
    <p class="mt-6 max-w-4xl text-lg leading-relaxed text-zinc-300">To sit at our counter is to surrender to the chef's vision. Every sequence is guided by seasonality, texture, and quiet precision - from the first bite of hirame to the final sweetness of tamago. At Sakura, omakase is both discipline and art, designed to make each guest feel the rhythm of the ocean and the hand of the chef.</p>
  </section>

  <section id="menu" class="border-y border-[#8b1a1a]/30 bg-[#111111] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-3xl font-semibold text-[#c9a84c]">Menu</h2>
      <div class="mt-10 grid gap-8 lg:grid-cols-3">
        <article class="rounded-2xl border border-[#8b1a1a]/30 bg-[#0d0d0d] p-7">
          <h3 class="text-xl font-semibold text-white">Chef's Omakase</h3>
          <p class="mt-2 text-sm text-[#c9a84c]">$185/person Â· 12-course seasonal menu</p>
          <p class="mt-4 text-sm leading-relaxed text-zinc-300">A curated progression of nigiri, otsumami, and composed plates selected daily from the finest market fish, highlighting balance, temperature, and exacting knife work.</p>
        </article>
        <article class="rounded-2xl border border-[#8b1a1a]/30 bg-[#0d0d0d] p-7">
          <h3 class="text-xl font-semibold text-white">Signature Rolls</h3>
          <ul class="mt-4 space-y-3 text-sm text-zinc-300">
            <li><span class="font-semibold text-zinc-100">Sakura Maki</span> - bluefin tuna, shiso, pickled plum <span class="text-[#c9a84c]">$24</span></li>
            <li><span class="font-semibold text-zinc-100">Kuro Dragon</span> - unagi, cucumber, tamari glaze <span class="text-[#c9a84c]">$22</span></li>
            <li><span class="font-semibold text-zinc-100">Yuzu Hamachi</span> - yellowtail, yuzu kosho, microgreens <span class="text-[#c9a84c]">$21</span></li>
            <li><span class="font-semibold text-zinc-100">Akai Toro</span> - fatty tuna, scallion, sesame <span class="text-[#c9a84c]">$24</span></li>
            <li><span class="font-semibold text-zinc-100">Midori Veg</span> - avocado, asparagus tempura, miso aioli <span class="text-[#c9a84c]">$18</span></li>
          </ul>
        </article>
        <article class="rounded-2xl border border-[#8b1a1a]/30 bg-[#0d0d0d] p-7">
          <h3 class="text-xl font-semibold text-white">Appetizers</h3>
          <ul class="mt-4 space-y-3 text-sm text-zinc-300">
            <li class="flex items-center justify-between"><span>Edamame</span><span class="text-[#c9a84c]">$6</span></li>
            <li class="flex items-center justify-between"><span>Miso Soup</span><span class="text-[#c9a84c]">$8</span></li>
            <li class="flex items-center justify-between"><span>Gyoza</span><span class="text-[#c9a84c]">$12</span></li>
            <li class="flex items-center justify-between"><span>Agedashi Tofu</span><span class="text-[#c9a84c]">$11</span></li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section id="gallery" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-semibold text-[#c9a84c]">Gallery</h2>
    <div class="mt-8 grid gap-4 sm:grid-cols-2">
      <img src="https://images.unsplash.com/photo-1617196034183-421b4040d9ab?w=1200&auto=format&fit=crop" alt="Sushi platter" class="h-64 w-full rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&auto=format&fit=crop" alt="Chef preparing sushi" class="h-64 w-full rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&auto=format&fit=crop" alt="Appetizers" class="h-64 w-full rounded-xl object-cover" />
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&auto=format&fit=crop" alt="Dining room" class="h-64 w-full rounded-xl object-cover" />
    </div>
  </section>

  <section class="border-y border-[#8b1a1a]/30 bg-[#111111] py-20">
    <div class="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2 lg:items-center">
      <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=1200&auto=format&fit=crop" alt="Chef Hiroshi Tanaka" class="h-96 w-full rounded-2xl object-cover" />
      <div>
        <h2 class="text-3xl font-semibold text-[#c9a84c]">Chef Hiroshi Tanaka</h2>
        <p class="mt-5 leading-relaxed text-zinc-300">Trained in Tokyo under three generations of sushi masters, Chef Hiroshi Tanaka brings over 20 years of experience to Sakura Sushi. His approach combines classical Edomae techniques with modern California seasonality, creating a deeply personal omakase journey that changes nightly.</p>
      </div>
    </div>
  </section>

  <section id="reserve" class="mx-auto max-w-6xl px-6 py-20">
    <div class="rounded-3xl border border-[#8b1a1a]/40 bg-[#0d0d0d] p-10 text-center">
      <h2 class="text-3xl font-semibold text-[#c9a84c]">Reserve Your Table</h2>
      <p class="mt-4 text-lg text-zinc-200">Call us at <span class="font-semibold text-white">+1 415 555 0199</span></p>
      <p class="mt-2 text-sm text-zinc-400">Limited counter seating nightly. Reservations recommended at least 7 days in advance.</p>
    </div>
  </section>

  <footer class="border-t border-[#8b1a1a]/30 bg-[#080808] py-12">
    <div class="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2">
      <div>
        <h3 class="text-lg font-semibold text-[#c9a84c]">Sakura Sushi</h3>
        <p class="mt-3 text-sm text-zinc-300">108 Market Street, San Francisco, CA 94103</p>
      </div>
      <div>
        <h3 class="text-lg font-semibold text-[#c9a84c]">Hours</h3>
        <table class="mt-3 w-full text-sm text-zinc-300">
          <tr><td>Mon - Thu</td><td class="text-right">5:30 PM - 10:00 PM</td></tr>
          <tr><td>Fri - Sat</td><td class="text-right">5:00 PM - 11:00 PM</td></tr>
          <tr><td>Sunday</td><td class="text-right">Closed</td></tr>
        </table>
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
    'a2a2a2a2-a2a2-a2a2-a2a2-a2a2a2a2a202',
    '33333333-3333-3333-3333-333333333333',
    'Hopyard Gastropub',
    'hopyard-gastropub',
    'Craft beer gastropub with tap list, food menu, events calendar, and location section.',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hopyard Gastropub | Craft Beer and Real Food</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#1e2127] text-zinc-100 antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#c97d00]/40 bg-[#171a20]/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="text-2xl font-black tracking-[0.15em] text-[#c97d00]">HOPYARD</a>
      <ul class="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
        <li><a href="#taps" class="hover:text-[#c97d00]">Tap List</a></li>
        <li><a href="#food" class="hover:text-[#c97d00]">Food</a></li>
        <li><a href="#events" class="hover:text-[#c97d00]">Events</a></li>
        <li><a href="#find-us" class="hover:text-[#c97d00]">Find Us</a></li>
      </ul>
      <a href="#" class="rounded-full bg-[#c97d00] px-5 py-2 text-sm font-semibold text-black hover:bg-[#de8a07]">Order Online</a>
    </div>
  </nav>

  <header class="relative flex min-h-[78vh] items-center overflow-hidden">
    <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop" alt="Gastropub interior" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="relative mx-auto max-w-6xl px-6 py-24">
      <h1 class="max-w-3xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">Handcrafted Beer. Real Food.</h1>
      <p class="mt-6 max-w-2xl text-lg text-zinc-200">15 taps rotating. Seasonal menu. Live music every Friday.</p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href="#taps" class="rounded-full bg-[#c97d00] px-6 py-3 text-sm font-semibold text-black hover:bg-[#de8a07]">Explore Tap List</a>
        <a href="#food" class="rounded-full border border-zinc-200 px-6 py-3 text-sm font-semibold text-white hover:border-[#c97d00] hover:text-[#c97d00]">View Menu</a>
      </div>
    </div>
  </header>

  <section id="taps" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-bold text-[#c97d00]">Tap List</h2>
    <div class="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-5"><h3 class="text-lg font-semibold text-white">Copper Road IPA</h3><p class="mt-1 text-sm text-zinc-300">IPA Â· 6.8% ABV Â· 65 IBU</p><p class="mt-3 text-sm text-zinc-300">Citrus peel, pine resin, and a crisp bitter finish.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-5"><h3 class="text-lg font-semibold text-white">Midnight Stout</h3><p class="mt-1 text-sm text-zinc-300">Stout Â· 7.2% ABV Â· 45 IBU</p><p class="mt-3 text-sm text-zinc-300">Dark chocolate, espresso roast, and velvety body.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-5"><h3 class="text-lg font-semibold text-white">Golden Hour Lager</h3><p class="mt-1 text-sm text-zinc-300">Lager Â· 4.5% ABV Â· 18 IBU</p><p class="mt-3 text-sm text-zinc-300">Clean malt backbone with floral hop aroma.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-5"><h3 class="text-lg font-semibold text-white">Wildflower Wheat</h3><p class="mt-1 text-sm text-zinc-300">Wheat Ale Â· 5.1% ABV Â· 22 IBU</p><p class="mt-3 text-sm text-zinc-300">Soft citrus, honeyed grain, and a bright finish.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-5"><h3 class="text-lg font-semibold text-white">Black Oak Porter</h3><p class="mt-1 text-sm text-zinc-300">Porter Â· 6.0% ABV Â· 32 IBU</p><p class="mt-3 text-sm text-zinc-300">Toasted caramel and cocoa with subtle smoke.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-5"><h3 class="text-lg font-semibold text-white">Hazy Horizon NEIPA</h3><p class="mt-1 text-sm text-zinc-300">NEIPA Â· 7.4% ABV Â· 40 IBU</p><p class="mt-3 text-sm text-zinc-300">Tropical mango nose and pillowy mouthfeel.</p></article>
    </div>
  </section>

  <section id="food" class="border-y border-zinc-700 bg-[#181b22] py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-3xl font-bold text-[#c97d00]">Food Menu</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-zinc-700 bg-[#252933] p-6">
          <h3 class="text-xl font-semibold text-white">Starters</h3>
          <ul class="mt-4 space-y-2 text-sm text-zinc-300">
            <li class="flex justify-between"><span>Pretzel Board</span><span>$12</span></li>
            <li class="flex justify-between"><span>Nachos</span><span>$14</span></li>
            <li class="flex justify-between"><span>Wings</span><span>$16</span></li>
            <li class="flex justify-between"><span>Soup</span><span>$9</span></li>
          </ul>
        </article>
        <article class="rounded-2xl border border-zinc-700 bg-[#252933] p-6">
          <h3 class="text-xl font-semibold text-white">Mains</h3>
          <ul class="mt-4 space-y-2 text-sm text-zinc-300">
            <li class="flex justify-between"><span>Pub Burger</span><span>$18</span></li>
            <li class="flex justify-between"><span>Fish and Chips</span><span>$19</span></li>
            <li class="flex justify-between"><span>Shepherd's Pie</span><span>$17</span></li>
            <li class="flex justify-between"><span>Grilled Salmon</span><span>$22</span></li>
          </ul>
        </article>
        <article class="rounded-2xl border border-zinc-700 bg-[#252933] p-6">
          <h3 class="text-xl font-semibold text-white">Sides</h3>
          <ul class="mt-4 space-y-2 text-sm text-zinc-300">
            <li class="flex justify-between"><span>Fries</span><span>$6</span></li>
            <li class="flex justify-between"><span>Salad</span><span>$8</span></li>
            <li class="flex justify-between"><span>Coleslaw</span><span>$5</span></li>
            <li class="flex justify-between"><span>Onion Rings</span><span>$7</span></li>
          </ul>
        </article>
      </div>
    </div>
  </section>

  <section id="events" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-bold text-[#c97d00]">Events</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-6"><h3 class="text-xl font-semibold text-white">Trivia Night</h3><p class="mt-3 text-sm text-zinc-300">Every Tuesday at 7:00 PM. Team prizes and rotating themes.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-6"><h3 class="text-xl font-semibold text-white">Live Music</h3><p class="mt-3 text-sm text-zinc-300">Friday and Saturday evenings featuring local artists.</p></article>
      <article class="rounded-xl border border-zinc-700 bg-[#252933] p-6"><h3 class="text-xl font-semibold text-white">Brewery Tour</h3><p class="mt-3 text-sm text-zinc-300">Sundays at 2:00 PM. Behind-the-scenes tour and tasting, $15.</p></article>
    </div>
  </section>

  <section class="border-y border-zinc-700 bg-[#181b22] py-20">
    <div class="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-2 md:items-center">
      <div>
        <h2 class="text-3xl font-bold text-[#c97d00]">Our Story</h2>
        <p class="mt-5 leading-relaxed text-zinc-300">Hopyard started as a neighborhood taproom built by friends who cared deeply about independent brewing and comfort food done right. Today, we still rotate local taps weekly, cook every sauce in-house, and keep the room lively with music, games, and community nights.</p>
      </div>
      <img src="https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=1200&auto=format&fit=crop" alt="Pub team" class="h-80 w-full rounded-2xl object-cover" />
    </div>
  </section>

  <section id="find-us" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-bold text-[#c97d00]">Find Us</h2>
    <p class="mt-5 text-zinc-200">420 Barrel Street, Portland, OR 97205</p>
    <table class="mt-6 w-full max-w-xl text-left text-sm text-zinc-300">
      <tr><td>Mon - Thu</td><td>4:00 PM - 11:00 PM</td></tr>
      <tr><td>Fri - Sat</td><td>12:00 PM - 12:00 AM</td></tr>
      <tr><td>Sunday</td><td>12:00 PM - 10:00 PM</td></tr>
    </table>
  </section>

  <footer class="border-t border-zinc-700 bg-[#171a20] py-10">
    <div class="mx-auto max-w-6xl px-6 text-sm text-zinc-400">Hopyard Gastropub Â· Crafted locally, poured fresh nightly.</div>
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
    'a3a3a3a3-a3a3-a3a3-a3a3-a3a3a3a3a303',
    '33333333-3333-3333-3333-333333333333',
    'Verdant CafÃ©',
    'verdant-cafe',
    'Vegan and health food cafÃ© with menu, values, seasonal specials, team, and location.',
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verdant CafÃ© | Plant-Based and Local</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#faf7f0] text-[#23422d] antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#4a7c59]/30 bg-[#faf7f0]/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="text-2xl font-bold tracking-tight text-[#4a7c59]">Verdant</a>
      <ul class="hidden items-center gap-8 text-sm font-medium text-[#355542] md:flex">
        <li><a href="#menu" class="hover:text-[#e8735a]">Menu</a></li>
        <li><a href="#about" class="hover:text-[#e8735a]">About</a></li>
        <li><a href="#location" class="hover:text-[#e8735a]">Find Us</a></li>
      </ul>
      <a href="#" class="rounded-full bg-[#e8735a] px-5 py-2 text-sm font-semibold text-white hover:bg-[#d7644c]">Order Online</a>
    </div>
  </nav>

  <header class="relative flex min-h-[78vh] items-center overflow-hidden">
    <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop" alt="Healthy cafe table" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-[#faf7f0]/75"></div>
    <div class="relative mx-auto max-w-6xl px-6 py-24">
      <h1 class="max-w-3xl text-4xl font-extrabold leading-tight text-[#2d4d36] sm:text-6xl">Eat Well. Feel Good. Live Verdant.</h1>
      <p class="mt-6 max-w-2xl text-lg text-[#355542]">100% plant-based Â· zero waste Â· locally sourced</p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href="#menu" class="rounded-full bg-[#4a7c59] px-6 py-3 text-sm font-semibold text-white hover:bg-[#3f694c]">Explore Menu</a>
        <a href="#location" class="rounded-full border border-[#4a7c59] px-6 py-3 text-sm font-semibold text-[#4a7c59] hover:border-[#e8735a] hover:text-[#e8735a]">Visit Us</a>
      </div>
    </div>
  </header>

  <section id="menu" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-3xl font-bold text-[#4a7c59]">Menu Highlights</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-[#4a7c59]/25 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-[#2d4d36]">Breakfast Bowls</h3>
        <ul class="mt-4 space-y-2 text-sm text-[#355542]">
          <li class="flex justify-between"><span>Acai Bowl</span><span>$13</span></li>
          <li class="flex justify-between"><span>Green Power Bowl</span><span>$14</span></li>
          <li class="flex justify-between"><span>Overnight Oats</span><span>$9</span></li>
        </ul>
      </article>
      <article class="rounded-2xl border border-[#4a7c59]/25 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-[#2d4d36]">Fresh Juices</h3>
        <ul class="mt-4 space-y-2 text-sm text-[#355542]">
          <li class="flex justify-between"><span>Green Detox</span><span>$8</span></li>
          <li class="flex justify-between"><span>Citrus Burst</span><span>$7</span></li>
          <li class="flex justify-between"><span>Beet Glow</span><span>$8</span></li>
          <li class="flex justify-between"><span>Cold Brew</span><span>$5</span></li>
        </ul>
      </article>
      <article class="rounded-2xl border border-[#4a7c59]/25 bg-white p-6 shadow-sm">
        <h3 class="text-xl font-semibold text-[#2d4d36]">Grain Plates</h3>
        <ul class="mt-4 space-y-2 text-sm text-[#355542]">
          <li class="flex justify-between"><span>Falafel Bowl</span><span>$15</span></li>
          <li class="flex justify-between"><span>Quinoa Crunch</span><span>$14</span></li>
          <li class="flex justify-between"><span>Poke Bowl</span><span>$16</span></li>
        </ul>
      </article>
    </div>
  </section>

  <section id="about" class="border-y border-[#4a7c59]/20 bg-white py-16">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-3xl font-bold text-[#4a7c59]">Our Values</h2>
      <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl bg-[#faf7f0] p-5 text-center"><p class="text-2xl">ðŸŒ±</p><p class="mt-2 font-semibold">Plant-Based</p></div>
        <div class="rounded-xl bg-[#faf7f0] p-5 text-center"><p class="text-2xl">â™»ï¸</p><p class="mt-2 font-semibold">Zero Waste</p></div>
        <div class="rounded-xl bg-[#faf7f0] p-5 text-center"><p class="text-2xl">ðŸŒ¾</p><p class="mt-2 font-semibold">Local Sourcing</p></div>
        <div class="rounded-xl bg-[#faf7f0] p-5 text-center"><p class="text-2xl">ðŸ¤</p><p class="mt-2 font-semibold">Community</p></div>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 py-16">
    <h2 class="text-3xl font-bold text-[#4a7c59]">Seasonal Specials</h2>
    <div class="mt-8 rounded-2xl border border-[#e8735a]/40 bg-[#fff4ef] p-8">
      <p class="text-sm font-semibold uppercase tracking-wider text-[#e8735a]">Spring Menu</p>
      <h3 class="mt-2 text-2xl font-semibold text-[#2d4d36]">Fresh and bright for the season</h3>
      <ul class="mt-4 space-y-2 text-[#355542]">
        <li>Asparagus Lemon Risotto - creamy arborio with roasted spring vegetables</li>
        <li>Strawberry Basil Chia Parfait - coconut yogurt, toasted granola, and mint</li>
      </ul>
    </div>
  </section>

  <section class="border-y border-[#4a7c59]/20 bg-white py-16">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-3xl font-bold text-[#4a7c59]">Meet the Team</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-[#4a7c59]/20 bg-[#faf7f0] p-5 text-center">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Sofia Chen" class="mx-auto h-48 w-48 rounded-full object-cover" />
          <h3 class="mt-4 text-xl font-semibold text-[#2d4d36]">Sofia Chen</h3>
          <p class="text-sm text-[#355542]">Head Chef</p>
        </article>
        <article class="rounded-2xl border border-[#4a7c59]/20 bg-[#faf7f0] p-5 text-center">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Marcus Green" class="mx-auto h-48 w-48 rounded-full object-cover" />
          <h3 class="mt-4 text-xl font-semibold text-[#2d4d36]">Marcus Green</h3>
          <p class="text-sm text-[#355542]">Co-Founder</p>
        </article>
        <article class="rounded-2xl border border-[#4a7c59]/20 bg-[#faf7f0] p-5 text-center">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&auto=format&fit=crop" alt="Lila Park" class="mx-auto h-48 w-48 rounded-full object-cover" />
          <h3 class="mt-4 text-xl font-semibold text-[#2d4d36]">Lila Park</h3>
          <p class="text-sm text-[#355542]">Community Manager</p>
        </article>
      </div>
    </div>
  </section>

  <section id="location" class="mx-auto max-w-6xl px-6 py-16">
    <h2 class="text-3xl font-bold text-[#4a7c59]">Location</h2>
    <p class="mt-4 text-[#355542]">88 Greenway Avenue, Seattle, WA 98101</p>
    <table class="mt-4 w-full max-w-lg text-sm text-[#355542]">
      <tr><td>Mon - Fri</td><td>7:00 AM - 6:00 PM</td></tr>
      <tr><td>Saturday</td><td>8:00 AM - 5:00 PM</td></tr>
      <tr><td>Sunday</td><td>8:00 AM - 3:00 PM</td></tr>
    </table>
    <h3 class="mt-10 text-xl font-semibold text-[#4a7c59]">Instagram</h3>
    <div class="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
      <div class="h-20 rounded bg-[#9bc6a8]"></div>
      <div class="h-20 rounded bg-[#9bc6a8]"></div>
      <div class="h-20 rounded bg-[#9bc6a8]"></div>
      <div class="h-20 rounded bg-[#9bc6a8]"></div>
      <div class="h-20 rounded bg-[#9bc6a8]"></div>
      <div class="h-20 rounded bg-[#9bc6a8]"></div>
    </div>
  </section>

  <footer class="border-t border-[#4a7c59]/20 bg-white py-10">
    <div class="mx-auto max-w-6xl px-6 text-sm text-[#355542]">Verdant Cafe Â· Plant-based food for a healthier neighborhood.</div>
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
    'a4a4a4a4-a4a4-a4a4-a4a4-a4a4a4a4a404',
    '33333333-3333-3333-3333-333333333333',
    'Maison Claude',
    'maison-claude',
    'Fine dining French restaurant with tasting menu, wine program, press mentions, and reservations.',
    'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Maison Claude | Fine Dining</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,500&display=swap');
    body { font-family: 'Playfair Display', serif; }
  </style>
</head>
<body class="bg-[#f9f5ec] text-[#3c1f1f] antialiased">
  <nav class="sticky top-0 z-50 border-b border-[#5c1a1a]/20 bg-[#f9f5ec]/95 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="text-3xl italic text-[#5c1a1a]">Maison Claude</a>
      <ul class="hidden items-center gap-8 text-sm md:flex">
        <li><a href="#menu" class="hover:text-[#5c1a1a]">Menu</a></li>
        <li><a href="#about" class="hover:text-[#5c1a1a]">About</a></li>
        <li><a href="#reserve" class="hover:text-[#5c1a1a]">Reserve</a></li>
      </ul>
      <a href="#reserve" class="rounded-full bg-[#5c1a1a] px-5 py-2 text-sm font-semibold text-[#f9f5ec] hover:bg-[#732323]">Reserve</a>
    </div>
  </nav>

  <header class="relative flex min-h-[82vh] items-center overflow-hidden">
    <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&auto=format&fit=crop" alt="Fine dining interior" class="absolute inset-0 h-full w-full object-cover" />
    <div class="absolute inset-0 bg-black/35"></div>
    <div class="relative mx-auto max-w-6xl px-6 py-24 text-[#f9f5ec]">
      <h1 class="text-5xl font-semibold sm:text-7xl">Maison Claude</h1>
      <p class="mt-5 max-w-2xl text-xl">Michelin-starred French cuisine in the heart of the city</p>
    </div>
  </header>

  <section id="about" class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-4xl font-semibold text-[#5c1a1a]">Our Story</h2>
    <p class="mt-6 max-w-4xl text-lg leading-relaxed">In 2009, Chef Claude Leclair left Paris to open Maison Claude with a single vision: to offer the elegance of French gastronomy with the warmth of intimate hospitality. Today, the restaurant holds 2 Michelin stars, celebrated for precise technique, impeccable ingredients, and an unforgettable dining arc.</p>
  </section>

  <section id="menu" class="border-y border-[#5c1a1a]/20 bg-white/70 py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-4xl font-semibold text-[#5c1a1a]">Tasting Menu</h2>
      <div class="mt-8 rounded-2xl border border-[#c9a84c]/60 bg-[#fffdf8] p-8 shadow-sm">
        <ol class="space-y-4 text-lg">
          <li><span class="font-semibold">1. Amuse-Bouche</span> - Chef's seasonal greeting</li>
          <li><span class="font-semibold">2. Bisque de Homard</span> - Normandy lobster bisque, tarragon cream</li>
          <li><span class="font-semibold">3. Foie Gras Torchon</span> - sauternes jelly, brioche</li>
          <li><span class="font-semibold">4. Sorbet de Champagne</span> - palate cleanser</li>
          <li><span class="font-semibold">5. CarrÃ© d'Agneau</span> - rack of lamb, ProvenÃ§al jus, flageolets</li>
          <li><span class="font-semibold">6. Plateau de Fromages</span> - curated selection from Androuet, Paris</li>
          <li><span class="font-semibold">7. Mille-Feuille</span> - caramelised pastry, Tahitian vanilla cream, raspberry coulis</li>
        </ol>
        <p class="mt-8 text-2xl font-semibold text-[#5c1a1a]">â‚¬175 per person</p>
      </div>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-4xl font-semibold text-[#5c1a1a]">Wine Program</h2>
    <p class="mt-5 max-w-3xl text-lg">Our sommelier curates pairings from historic French houses and boutique biodynamic producers, designed to echo each course with precision and depth.</p>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-[#5c1a1a]/20 bg-white p-6"><h3 class="text-xl font-semibold">Burgundy</h3><p class="mt-2 text-sm">Pinot Noir Â· 2018</p><p class="mt-3 text-sm">Silky tannins, red cherry, and forest floor complexity.</p></article>
      <article class="rounded-2xl border border-[#5c1a1a]/20 bg-white p-6"><h3 class="text-xl font-semibold">Loire Valley</h3><p class="mt-2 text-sm">Chenin Blanc Â· 2020</p><p class="mt-3 text-sm">Mineral-driven with quince, citrus zest, and saline lift.</p></article>
      <article class="rounded-2xl border border-[#5c1a1a]/20 bg-white p-6"><h3 class="text-xl font-semibold">Rhone</h3><p class="mt-2 text-sm">Syrah Blend Â· 2017</p><p class="mt-3 text-sm">Blackberry, violet, white pepper, and velvety finish.</p></article>
    </div>
  </section>

  <section class="border-y border-[#5c1a1a]/20 bg-white/70 py-20">
    <div class="mx-auto max-w-6xl px-6">
      <h2 class="text-4xl font-semibold text-[#5c1a1a]">Private Dining</h2>
      <p class="mt-5 max-w-3xl text-lg">Host intimate celebrations in our private salon for up to 24 guests. Custom tasting and wine pairing programs are available for corporate dinners, anniversaries, and private receptions.</p>
    </div>
  </section>

  <section class="mx-auto max-w-6xl px-6 py-20">
    <h2 class="text-4xl font-semibold text-[#5c1a1a]">Press</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <blockquote class="rounded-2xl border border-[#c9a84c]/50 bg-[#fffdf8] p-6 text-lg">"â˜…â˜…â˜…â˜…â˜… - Le Monde"</blockquote>
      <blockquote class="rounded-2xl border border-[#c9a84c]/50 bg-[#fffdf8] p-6 text-lg">"Best New Restaurant 2023 - Food &amp; Wine"</blockquote>
      <blockquote class="rounded-2xl border border-[#c9a84c]/50 bg-[#fffdf8] p-6 text-lg">"A transcendent evening - CondÃ© Nast Traveler"</blockquote>
    </div>
  </section>

  <section id="reserve" class="bg-[#5c1a1a] py-20 text-[#f9f5ec]">
    <div class="mx-auto max-w-6xl px-6 text-center">
      <h2 class="text-4xl font-semibold">Book a Table</h2>
      <p class="mt-4 text-lg">Reservations via telephone or email only</p>
      <p class="mt-2">+1 212 555 0147 Â· reservations@maisonclaude.com</p>
    </div>
  </section>

  <footer class="border-t border-[#5c1a1a]/20 bg-[#f9f5ec] py-12">
    <div class="mx-auto max-w-6xl px-6 text-sm text-[#3c1f1f]">
      <p>Maison Claude Â· 17 Rue Lafayette, New York, NY 10012</p>
      <p class="mt-2">Dress code: Smart casual required. Jackets preferred.</p>
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
    'b1b1b1b1-b1b1-b1b1-b1b1-b1b1b1b1b101',
    '44444444-4444-4444-4444-444444444444',
    'AppWave',
    'appwave-launch',
    'Mobile app launch page with app store badges, phone mockup, testimonials, and email capture.',
    'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AppWave | Launch</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#080c14] text-slate-100 antialiased">
  <div class="min-h-screen bg-gradient-to-b from-cyan-500/10 via-[#080c14] to-[#080c14]">
    <nav class="sticky top-0 z-50 border-b border-cyan-400/20 bg-[#080c14]/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" class="text-xl font-bold tracking-tight text-cyan-300">AppWave</a>
        <ul class="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <li><a href="#features" class="hover:text-cyan-300">Features</a></li>
          <li><a href="#pricing" class="hover:text-cyan-300">Pricing</a></li>
          <li><a href="#" class="hover:text-cyan-300">Login</a></li>
        </ul>
        <a href="#early-access" class="rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300">Get Early Access</a>
      </div>
    </nav>

    <header class="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:items-center">
      <div>
        <p class="inline-flex rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-cyan-300">Launching Soon</p>
        <h1 class="mt-6 text-5xl font-bold leading-tight text-white sm:text-6xl">AppWave</h1>
        <p class="mt-4 text-2xl font-medium text-cyan-200">The smarter way to manage your day.</p>
        <p class="mt-6 max-w-xl text-lg text-slate-300">Plan tasks, sync calendars, and automate routines in one lightning-fast app built for modern teams and ambitious solo builders.</p>
        <div class="mt-10 flex flex-wrap gap-4">
          <div class="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100">App Store</div>
          <div class="rounded-full border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-100">Google Play</div>
        </div>
      </div>
      <div class="mx-auto w-full max-w-sm">
        <div class="w-48 mx-auto border-4 border-gray-700 rounded-3xl bg-gray-900 h-96 flex items-center justify-center shadow-2xl shadow-cyan-900/30">
          <div class="h-[88%] w-[85%] rounded-2xl bg-gradient-to-b from-cyan-400/30 to-blue-500/20 p-4">
            <div class="mb-3 h-3 w-20 rounded bg-cyan-300/70"></div>
            <div class="space-y-3">
              <div class="rounded-lg bg-slate-800/80 p-3">
                <div class="h-2 w-16 rounded bg-cyan-300/70"></div>
                <div class="mt-2 h-2 w-full rounded bg-slate-600"></div>
              </div>
              <div class="rounded-lg bg-slate-800/80 p-3">
                <div class="h-2 w-24 rounded bg-teal-300/70"></div>
                <div class="mt-2 h-2 w-4/5 rounded bg-slate-600"></div>
              </div>
              <div class="rounded-lg bg-slate-800/80 p-3">
                <div class="h-2 w-14 rounded bg-sky-300/70"></div>
                <div class="mt-2 h-2 w-2/3 rounded bg-slate-600"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <section id="features" class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="text-3xl font-semibold text-white">Feature Highlights</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6">
          <p class="text-3xl">âš¡</p>
          <h3 class="mt-4 text-xl font-semibold text-cyan-300">Instant Sync</h3>
          <p class="mt-2 text-slate-300">Your tasks and timelines stay up to date across every device with no manual refreshes.</p>
        </article>
        <article class="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6">
          <p class="text-3xl">ðŸ”’</p>
          <h3 class="mt-4 text-xl font-semibold text-cyan-300">Private by Design</h3>
          <p class="mt-2 text-slate-300">Bank-grade encryption, robust access controls, and transparent privacy settings.</p>
        </article>
        <article class="rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-6">
          <p class="text-3xl">ðŸ“Š</p>
          <h3 class="mt-4 text-xl font-semibold text-cyan-300">Smart Insights</h3>
          <p class="mt-2 text-slate-300">AI-driven trends surface where your time goes and where your output can improve.</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="text-3xl font-semibold text-white">How It Works</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
          <p class="text-sm font-semibold text-cyan-300">Step 1</p>
          <h3 class="mt-2 text-lg font-semibold text-white">Set up your priorities</h3>
          <p class="mt-2 text-slate-300">Capture goals and tasks in seconds.</p>
          <div class="mt-5 w-36 border-4 border-gray-700 rounded-3xl bg-gray-900 h-56 flex items-center justify-center mx-auto">
            <div class="h-40 w-24 rounded-xl bg-cyan-300/30"></div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
          <p class="text-sm font-semibold text-cyan-300">Step 2</p>
          <h3 class="mt-2 text-lg font-semibold text-white">Automate your flow</h3>
          <p class="mt-2 text-slate-300">Create smart routines and recurring actions.</p>
          <div class="mt-5 w-36 border-4 border-gray-700 rounded-3xl bg-gray-900 h-56 flex items-center justify-center mx-auto">
            <div class="h-40 w-24 rounded-xl bg-teal-300/30"></div>
          </div>
        </div>
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6">
          <p class="text-sm font-semibold text-cyan-300">Step 3</p>
          <h3 class="mt-2 text-lg font-semibold text-white">Track and optimize</h3>
          <p class="mt-2 text-slate-300">Use performance insights to refine your week.</p>
          <div class="mt-5 w-36 border-4 border-gray-700 rounded-3xl bg-gray-900 h-56 flex items-center justify-center mx-auto">
            <div class="h-40 w-24 rounded-xl bg-sky-300/30"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="text-3xl font-semibold text-white">Loved by Early Testers</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <p class="text-amber-300">â­â­â­â­â­</p>
          <p class="mt-4 text-slate-200">"Finally, one app that keeps my day under control without feeling bloated."</p>
          <p class="mt-4 font-semibold text-white">Taylor N.</p>
          <span class="mt-3 inline-flex rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-300">Verified Purchase</span>
        </article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <p class="text-amber-300">â­â­â­â­â­</p>
          <p class="mt-4 text-slate-200">"The sync speed and clarity are unreal. I replaced three tools with AppWave."</p>
          <p class="mt-4 font-semibold text-white">Morgan K.</p>
          <span class="mt-3 inline-flex rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-300">Verified Purchase</span>
        </article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900 p-6">
          <p class="text-amber-300">â­â­â­â­â­</p>
          <p class="mt-4 text-slate-200">"I can plan, execute, and review my day in half the time."</p>
          <p class="mt-4 font-semibold text-white">Jordan P.</p>
          <span class="mt-3 inline-flex rounded-full bg-cyan-400/20 px-3 py-1 text-xs text-cyan-300">Verified Purchase</span>
        </article>
      </div>
    </section>

    <section id="early-access" class="mx-auto max-w-4xl px-6 py-16">
      <div class="rounded-3xl border border-cyan-400/30 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 p-8">
        <h2 class="text-3xl font-semibold text-white">Get Early Access</h2>
        <p class="mt-3 text-slate-200">Join the waitlist and be first to try AppWave when we launch.</p>
        <form class="mt-6 flex flex-col gap-3 sm:flex-row">
          <input type="email" placeholder="Enter your email" class="w-full rounded-full border border-slate-600 bg-slate-950/70 px-5 py-3 text-slate-100 placeholder:text-slate-400 focus:border-cyan-300 focus:outline-none" />
          <button type="submit" class="rounded-full bg-cyan-400 px-6 py-3 font-semibold text-slate-900 hover:bg-cyan-300">Get Early Access</button>
        </form>
        <p class="mt-3 text-sm text-slate-300">No spam. Unsubscribe anytime.</p>
      </div>
    </section>

    <footer class="border-t border-slate-800 px-6 py-10 text-center text-sm text-slate-400">
      <p>Â© 2026 AppWave. Built for focused days and calmer workflows.</p>
    </footer>
  </div>
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
    'b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b202',
    '44444444-4444-4444-4444-444444444444',
    'SkillForge',
    'skillforge-course',
    'Online course platform landing page with curriculum accordion, pricing tiers, and testimonials.',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>SkillForge | Full-Stack Program</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-slate-900 antialiased">
  <nav class="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-xl font-bold text-[#4c1d95]">SkillForge</a>
      <ul class="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
        <li><a href="#courses" class="hover:text-[#4c1d95]">Courses</a></li>
        <li><a href="#pricing" class="hover:text-[#4c1d95]">Pricing</a></li>
        <li><a href="#" class="hover:text-[#4c1d95]">Login</a></li>
      </ul>
      <a href="#pricing" class="rounded-full bg-[#4c1d95] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5b21b6]">Enroll Free</a>
    </div>
  </nav>

  <header class="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-2 lg:items-center">
    <div>
      <h1 class="text-4xl font-extrabold leading-tight text-slate-900 sm:text-5xl">Master Full-Stack Development in 12 Weeks</h1>
      <div class="mt-5 inline-flex rounded-full bg-amber-100 px-4 py-1 text-sm font-semibold text-amber-700">Join 24,000 students</div>
      <p class="mt-6 max-w-xl text-lg text-slate-600">Go from fundamentals to production-ready apps with guided projects, live mentorship, and a job-ready portfolio.</p>
      <div class="mt-8 flex flex-wrap gap-4">
        <a href="#pricing" class="rounded-full bg-[#4c1d95] px-6 py-3 font-semibold text-white hover:bg-[#5b21b6]">Enroll Free</a>
        <span class="inline-flex items-center text-sm text-slate-500">30-day money-back guarantee on paid plans.</span>
      </div>
    </div>
    <div class="overflow-hidden rounded-3xl border border-slate-200 shadow-xl">
      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop" alt="Instructor" class="h-full w-full object-cover" />
    </div>
  </header>

  <section id="courses" class="mx-auto max-w-7xl px-6 py-16">
    <h2 class="text-3xl font-bold text-slate-900">What You will Learn</h2>
    <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-xl border border-slate-200 p-4">âœ… React</div>
      <div class="rounded-xl border border-slate-200 p-4">âœ… Node.js</div>
      <div class="rounded-xl border border-slate-200 p-4">âœ… PostgreSQL</div>
      <div class="rounded-xl border border-slate-200 p-4">âœ… REST APIs</div>
      <div class="rounded-xl border border-slate-200 p-4">âœ… Auth</div>
      <div class="rounded-xl border border-slate-200 p-4">âœ… Deployment</div>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-6 py-16">
    <h2 class="text-3xl font-bold text-slate-900">Curriculum</h2>
    <div class="mt-8 space-y-4">
      <details class="rounded-xl border border-slate-200 p-4" open>
        <summary class="cursor-pointer font-semibold text-[#4c1d95]">Module 1: HTML, CSS & JavaScript Foundations</summary>
        <p class="mt-3 text-slate-600">Build semantic pages, modern layouts, and interactive browser experiences.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold text-[#4c1d95]">Module 2: React & Component Architecture</summary>
        <p class="mt-3 text-slate-600">Design reusable components, state flows, and scalable front-end structures.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold text-[#4c1d95]">Module 3: Node.js & Express APIs</summary>
        <p class="mt-3 text-slate-600">Ship backend APIs with robust routing, validation, and error handling.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold text-[#4c1d95]">Module 4: Databases & Authentication</summary>
        <p class="mt-3 text-slate-600">Model data with PostgreSQL and secure applications with modern auth patterns.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold text-[#4c1d95]">Module 5: Deployment & DevOps</summary>
        <p class="mt-3 text-slate-600">Deploy confidently using CI, container basics, and production monitoring.</p>
      </details>
    </div>
  </section>

  <section class="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
    <div class="overflow-hidden rounded-3xl border border-slate-200">
      <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&auto=format&fit=crop" alt="Alex Rivera" class="h-full w-full object-cover" />
    </div>
    <div>
      <h2 class="text-3xl font-bold text-slate-900">Meet Your Instructor</h2>
      <p class="mt-4 text-xl font-semibold text-[#4c1d95]">Alex Rivera</p>
      <p class="mt-2 text-slate-600">Former staff engineer and educator who has coached 10,000+ students into modern software roles.</p>
      <p class="mt-2 text-slate-600">Credentials: Ex-Lead Developer at two Series B startups, published curriculum author, and conference speaker.</p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-16">
    <h2 class="text-3xl font-bold text-slate-900">Student Outcomes</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 p-6">
        <p class="text-amber-500">â­â­â­â­â­</p>
        <p class="mt-4 font-semibold">"Got promoted to Senior Dev"</p>
        <p class="mt-2 text-slate-600">The backend modules gave me confidence to lead production architecture discussions.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 p-6">
        <p class="text-amber-500">â­â­â­â­â­</p>
        <p class="mt-4 font-semibold">"Landed my first job"</p>
        <p class="mt-2 text-slate-600">My capstone project became the centerpiece of my interviews.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 p-6">
        <p class="text-amber-500">â­â­â­â­â­</p>
        <p class="mt-4 font-semibold">"Doubled my freelance rate"</p>
        <p class="mt-2 text-slate-600">I learned to scope and deliver full-stack client work end-to-end.</p>
      </article>
    </div>
  </section>

  <section id="pricing" class="mx-auto max-w-6xl px-6 py-16">
    <h2 class="text-3xl font-bold text-slate-900">Pricing</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-2">
      <article class="rounded-2xl border border-slate-200 p-8">
        <h3 class="text-xl font-semibold">Self-Paced</h3>
        <p class="mt-3 text-4xl font-bold">Free</p>
        <p class="mt-3 text-slate-600">Limited access to core lessons and community forums.</p>
        <button class="mt-6 rounded-full border border-slate-300 px-5 py-2 font-semibold">Start Free</button>
      </article>
      <article class="rounded-2xl border-2 border-[#4c1d95] bg-[#4c1d95] p-8 text-white">
        <h3 class="text-xl font-semibold">Mentored</h3>
        <p class="mt-3 text-4xl font-bold">$199</p>
        <p class="mt-3 text-purple-100">Full access plus 1-on-1 sessions, code reviews, and career support.</p>
        <button class="mt-6 rounded-full bg-[#f59e0b] px-5 py-2 font-semibold text-slate-900">Enroll Now</button>
      </article>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-6 py-10">
    <div class="rounded-2xl border border-amber-300 bg-amber-50 p-6 text-center">
      <p class="font-semibold text-amber-700">30-Day Money-Back Guarantee</p>
      <p class="mt-2 text-slate-600">Try the mentored track risk-free. If it is not right for you, get a full refund.</p>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-6 py-16">
    <h2 class="text-3xl font-bold text-slate-900">FAQ</h2>
    <div class="mt-8 space-y-4">
      <details class="rounded-xl border border-slate-200 p-4" open>
        <summary class="cursor-pointer font-semibold">Do I need prior coding experience?</summary>
        <p class="mt-3 text-slate-600">No. We start from fundamentals and ramp into production workflows.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold">How much time should I plan each week?</summary>
        <p class="mt-3 text-slate-600">Most learners succeed with 8-12 focused hours per week.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold">What support do I get in Mentored?</summary>
        <p class="mt-3 text-slate-600">Weekly office hours, 1-on-1 sessions, and detailed code feedback.</p>
      </details>
      <details class="rounded-xl border border-slate-200 p-4">
        <summary class="cursor-pointer font-semibold">Will I build portfolio projects?</summary>
        <p class="mt-3 text-slate-600">Yes. You will ship complete full-stack apps suitable for interviews and clients.</p>
      </details>
    </div>
  </section>

  <footer class="border-t border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
    <p>Â© 2026 SkillForge. Learn with confidence, build with purpose.</p>
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
    'b3b3b3b3-b3b3-b3b3-b3b3-b3b3b3b3b303',
    '44444444-4444-4444-4444-444444444444',
    'Drop In',
    'dropin-ecommerce',
    'Physical product e-commerce launch page with reviews, comparison table, and cart CTA.',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Drop In | The Apex Carry</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-white text-black antialiased">
  <div class="bg-black px-6 py-2 text-center text-sm font-medium text-lime-300">ðŸš€ Free shipping on all orders over $75 Â· Use code LAUNCH for 15% off</div>

  <nav class="sticky top-0 z-40 border-b border-slate-200 bg-white">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <a href="#" class="text-2xl font-extrabold tracking-tight">DROP IN</a>
      <ul class="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
        <li><a href="#product" class="hover:text-black">Product</a></li>
        <li><a href="#story" class="hover:text-black">Story</a></li>
        <li><a href="#reviews" class="hover:text-black">Reviews</a></li>
      </ul>
      <a href="#cart" class="rounded-full bg-black px-5 py-2 text-sm font-semibold text-white hover:bg-slate-800">Shop Now</a>
    </div>
  </nav>

  <header id="product" class="mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-2 lg:items-center">
    <div class="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
      <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop" alt="The Apex Carry" class="h-full w-full object-cover" />
    </div>
    <div>
      <p class="inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-lime-700">Launch Edition</p>
      <h1 class="mt-5 text-5xl font-extrabold">The Apex Carry</h1>
      <p class="mt-3 text-2xl font-medium text-slate-700">Built for the daily grind. Designed to last.</p>
      <p class="mt-8 text-5xl font-bold">$89</p>
      <a id="cart" href="#" class="mt-6 inline-flex rounded-full bg-lime-400 px-7 py-3 text-lg font-bold text-black hover:bg-lime-300">Add to Cart</a>
      <div class="mt-8 grid gap-3 text-sm text-slate-700 sm:grid-cols-3">
        <div class="rounded-lg border border-slate-200 px-3 py-2">ðŸ”’ Secure Checkout</div>
        <div class="rounded-lg border border-slate-200 px-3 py-2">ðŸ”„ 30-Day Returns</div>
        <div class="rounded-lg border border-slate-200 px-3 py-2">â­ 4.9/5 Rating</div>
      </div>
    </div>
  </header>

  <section class="mx-auto max-w-7xl px-6 py-14">
    <h2 class="text-3xl font-bold">Product Features</h2>
    <div class="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-2xl">ðŸ’§</p><h3 class="mt-3 font-semibold">Water Resistant Shell</h3></article>
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-2xl">ðŸ‹ï¸</p><h3 class="mt-3 font-semibold">25L Capacity</h3></article>
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-2xl">âš¡</p><h3 class="mt-3 font-semibold">USB-C Pass-Through</h3></article>
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-2xl">ðŸŒ±</p><h3 class="mt-3 font-semibold">Recycled Materials</h3></article>
    </div>
  </section>

  <section id="story" class="mx-auto max-w-7xl px-6 py-14">
    <h2 class="text-3xl font-bold">How It Works</h2>
    <div class="mt-8 grid gap-6 md:grid-cols-3">
      <article class="rounded-2xl border border-slate-200 p-5">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop" alt="Choose" class="h-36 w-full rounded-xl object-cover" />
        <p class="mt-4 text-sm font-semibold text-lime-700">Step 1</p>
        <h3 class="mt-1 text-lg font-semibold">Choose your setup</h3>
        <p class="mt-2 text-slate-600">Select color and accessories to match your routine.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 p-5">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop" alt="Pack" class="h-36 w-full rounded-xl object-cover" />
        <p class="mt-4 text-sm font-semibold text-lime-700">Step 2</p>
        <h3 class="mt-1 text-lg font-semibold">Pack smarter</h3>
        <p class="mt-2 text-slate-600">Modular sections keep your gear organized all day.</p>
      </article>
      <article class="rounded-2xl border border-slate-200 p-5">
        <img src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&auto=format&fit=crop" alt="Move" class="h-36 w-full rounded-xl object-cover" />
        <p class="mt-4 text-sm font-semibold text-lime-700">Step 3</p>
        <h3 class="mt-1 text-lg font-semibold">Move with confidence</h3>
        <p class="mt-2 text-slate-600">Durable comfort engineered for commutes and travel.</p>
      </article>
    </div>
  </section>

  <section id="reviews" class="mx-auto max-w-7xl px-6 py-14">
    <h2 class="text-3xl font-bold">Reviews</h2>
    <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-amber-500">â­â­â­â­â­</p><p class="mt-3 text-slate-700">"Perfect for my commute and weekend trips."</p><p class="mt-3 font-semibold">Chris M.</p><span class="mt-2 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs text-lime-700">Verified Buyer</span></article>
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-amber-500">â­â­â­â­â­</p><p class="mt-3 text-slate-700">"The build quality feels premium at every touch point."</p><p class="mt-3 font-semibold">Riley T.</p><span class="mt-2 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs text-lime-700">Verified Buyer</span></article>
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-amber-500">â­â­â­â­â­</p><p class="mt-3 text-slate-700">"The USB-C passthrough is a game changer on flights."</p><p class="mt-3 font-semibold">Dana K.</p><span class="mt-2 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs text-lime-700">Verified Buyer</span></article>
      <article class="rounded-2xl border border-slate-200 p-5"><p class="text-amber-500">â­â­â­â­â­</p><p class="mt-3 text-slate-700">"Looks clean, carries everything, and still feels light."</p><p class="mt-3 font-semibold">Sam P.</p><span class="mt-2 inline-flex rounded-full bg-lime-100 px-3 py-1 text-xs text-lime-700">Verified Buyer</span></article>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-14">
    <h2 class="text-3xl font-bold">Comparison Table</h2>
    <div class="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
      <table class="min-w-full text-left text-sm">
        <thead class="bg-slate-50">
          <tr>
            <th class="px-4 py-3 font-semibold">Feature</th>
            <th class="px-4 py-3 font-semibold">Drop In</th>
            <th class="px-4 py-3 font-semibold">Brand X</th>
            <th class="px-4 py-3 font-semibold">Brand Y</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-t border-slate-200"><td class="px-4 py-3">Water Resistance</td><td class="px-4 py-3">âœ…</td><td class="px-4 py-3">âŒ</td><td class="px-4 py-3">Partial</td></tr>
          <tr class="border-t border-slate-200"><td class="px-4 py-3">Capacity</td><td class="px-4 py-3">âœ…</td><td class="px-4 py-3">âŒ</td><td class="px-4 py-3">Partial</td></tr>
          <tr class="border-t border-slate-200"><td class="px-4 py-3">Warranty</td><td class="px-4 py-3">âœ…</td><td class="px-4 py-3">âŒ</td><td class="px-4 py-3">Partial</td></tr>
          <tr class="border-t border-slate-200"><td class="px-4 py-3">USB Port</td><td class="px-4 py-3">âœ…</td><td class="px-4 py-3">âŒ</td><td class="px-4 py-3">Partial</td></tr>
          <tr class="border-t border-slate-200"><td class="px-4 py-3">Price</td><td class="px-4 py-3">âœ…</td><td class="px-4 py-3">âŒ</td><td class="px-4 py-3">Partial</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mx-auto max-w-5xl px-6 py-10">
    <div class="rounded-2xl border border-black bg-black p-8 text-center text-white">
      <h2 class="text-2xl font-bold">Satisfaction Guarantee</h2>
      <p class="mt-3 text-slate-300">Try The Apex Carry for 30 days. If it does not improve your day-to-day carry, return it for a full refund.</p>
    </div>
  </section>

  <section class="mx-auto max-w-7xl px-6 py-14">
    <h2 class="text-3xl font-bold">As seen in</h2>
    <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div class="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold">GQ</div>
      <div class="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold">Wired</div>
      <div class="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold">Outside Magazine</div>
      <div class="rounded-xl border border-slate-200 px-4 py-3 text-center font-semibold">The Strategist</div>
    </div>
  </section>

  <section class="mx-auto max-w-4xl px-6 py-14">
    <div class="rounded-2xl border border-lime-300 bg-lime-50 p-8 text-center">
      <h2 class="text-2xl font-bold">Be first to know about restocks</h2>
      <form class="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row">
        <input type="email" placeholder="Enter your email" class="w-full rounded-full border border-slate-300 px-5 py-3" />
        <button type="submit" class="rounded-full bg-black px-6 py-3 font-semibold text-white">Notify Me</button>
      </form>
    </div>
  </section>

  <footer class="border-t border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
    <p>Â© 2026 DROP IN. Rugged gear for everyday momentum.</p>
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
    'b4b4b4b4-b4b4-b4b4-b4b4-b4b4b4b4b404',
    '44444444-4444-4444-4444-444444444444',
    'Foundry',
    'foundry-investor',
    'Startup investor pitch landing page with traction metrics, problem-solution, team, and deck CTA.',
    'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1200&auto=format&fit=crop',
    $$<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Foundry | Investor Deck</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-[#0c0f13] text-slate-100 antialiased">
  <div class="min-h-screen bg-gradient-to-b from-amber-500/10 via-[#0c0f13] to-[#0c0f13]">
    <nav class="sticky top-0 z-50 border-b border-amber-300/20 bg-[#0c0f13]/95 backdrop-blur">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" class="text-xl font-bold text-amber-300">Foundry</a>
        <ul class="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <li><a href="#team" class="hover:text-amber-300">Team</a></li>
          <li><a href="#deck" class="hover:text-amber-300">Deck</a></li>
          <li><a href="#contact" class="hover:text-amber-300">Contact</a></li>
        </ul>
        <a href="#deck" class="rounded-full bg-amber-400 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-300">Request Deck</a>
      </div>
    </nav>

    <header class="mx-auto max-w-6xl px-6 py-20 text-center">
      <p class="inline-flex rounded-full border border-amber-300/30 bg-amber-400/10 px-4 py-1 text-xs uppercase tracking-[0.2em] text-amber-300">Enterprise AI Compliance</p>
      <h1 class="mx-auto mt-6 max-w-4xl text-4xl font-extrabold leading-tight text-white sm:text-6xl">The Future of Enterprise Compliance is Autonomous.</h1>
      <p class="mx-auto mt-6 max-w-4xl text-lg text-slate-300">Foundry eliminates 80% of manual compliance work with AI-powered monitoring and automated reporting.</p>
      <a href="#deck" class="mt-10 inline-flex rounded-full bg-amber-400 px-7 py-3 text-base font-bold text-slate-900 hover:bg-amber-300">Request Deck</a>
    </header>

    <section class="mx-auto grid max-w-7xl gap-6 px-6 py-14 lg:grid-cols-2">
      <article class="rounded-2xl border border-slate-700 bg-slate-900/60 p-8">
        <h2 class="text-2xl font-bold text-amber-300">The Problem</h2>
        <p class="mt-4 text-slate-300">Manual compliance workflows are slow, error-prone, and expensive. Teams spend countless hours collecting evidence, reconciling controls, and preparing audit reports.</p>
        <ul class="mt-4 space-y-2 text-slate-300">
          <li>â€¢ 41% average audit prep time spent on repetitive evidence tasks.</li>
          <li>â€¢ 27% error rate in manually assembled compliance documentation.</li>
          <li>â€¢ Rising regulatory complexity across global markets.</li>
        </ul>
      </article>
      <article class="rounded-2xl border border-amber-300/30 bg-amber-500/10 p-8">
        <h2 class="text-2xl font-bold text-amber-300">Our Solution</h2>
        <p class="mt-4 text-slate-200">Foundry uses AI agents to continuously monitor controls, flag risk anomalies, and generate audit-ready reports automatically across SOC 2, ISO 27001, and GDPR frameworks.</p>
        <ul class="mt-4 space-y-2 text-slate-200">
          <li>â€¢ Always-on monitoring for critical compliance controls.</li>
          <li>â€¢ Automated remediation suggestions with workflow routing.</li>
          <li>â€¢ Instant reporting for internal and external stakeholders.</li>
        </ul>
      </article>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-14">
      <h2 class="text-3xl font-bold text-white">Traction</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2">
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><p class="text-sm text-slate-400">Annual Recurring Revenue</p><p class="mt-2 text-4xl font-bold text-amber-300">$2.4M ARR</p></div>
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><p class="text-sm text-slate-400">Growth</p><p class="mt-2 text-4xl font-bold text-amber-300">340% YoY Growth</p></div>
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><p class="text-sm text-slate-400">Runway</p><p class="mt-2 text-4xl font-bold text-amber-300">18-Month Runway</p></div>
        <div class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><p class="text-sm text-slate-400">Customers</p><p class="mt-2 text-4xl font-bold text-amber-300">48 Enterprise Customers</p></div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="text-3xl font-bold text-white">Business Model</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><h3 class="text-xl font-semibold text-amber-300">SaaS Subscription</h3><p class="mt-3 text-slate-300">Tiered annual plans based on control count and data integrations.</p></article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><h3 class="text-xl font-semibold text-amber-300">Professional Services</h3><p class="mt-3 text-slate-300">Implementation support and compliance workflow optimization packages.</p></article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-6"><h3 class="text-xl font-semibold text-amber-300">Marketplace</h3><p class="mt-3 text-slate-300">Third-party policy packs, integrations, and automation modules.</p></article>
      </div>
    </section>

    <section id="team" class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="text-3xl font-bold text-white">Leadership Team</h2>
      <div class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&auto=format&fit=crop" alt="Founder" class="h-48 w-full rounded-xl object-cover" />
          <p class="mt-4 font-semibold text-white">Ethan Cole</p>
          <p class="text-sm text-amber-300">CEO</p>
          <p class="mt-2 text-sm text-slate-400">Previously at Stripe</p>
        </article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=1200&auto=format&fit=crop" alt="Founder" class="h-48 w-full rounded-xl object-cover" />
          <p class="mt-4 font-semibold text-white">Maya Lin</p>
          <p class="text-sm text-amber-300">CTO</p>
          <p class="mt-2 text-sm text-slate-400">Previously at Datadog</p>
        </article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&auto=format&fit=crop" alt="Founder" class="h-48 w-full rounded-xl object-cover" />
          <p class="mt-4 font-semibold text-white">Noah Bennett</p>
          <p class="text-sm text-amber-300">COO</p>
          <p class="mt-2 text-sm text-slate-400">Previously at PwC</p>
        </article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/70 p-5">
          <img src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop" alt="Founder" class="h-48 w-full rounded-xl object-cover" />
          <p class="mt-4 font-semibold text-white">Priya Shah</p>
          <p class="text-sm text-amber-300">Head of Product</p>
          <p class="mt-2 text-sm text-slate-400">Previously at ServiceNow</p>
        </article>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 py-14">
      <h2 class="text-3xl font-bold text-white">Investors & Advisors</h2>
      <div class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div class="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-center">A. Patel</div>
        <div class="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-center">G. Thompson</div>
        <div class="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-center">R. Okafor</div>
        <div class="rounded-xl border border-slate-700 bg-slate-900/60 p-4 text-center">L. Chen</div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-6 py-14">
      <h2 class="text-3xl font-bold text-white">Press</h2>
      <div class="mt-8 grid gap-6 md:grid-cols-3">
        <article class="rounded-2xl border border-slate-700 bg-slate-900/60 p-6"><p class="text-sm text-amber-300">TechCrunch</p><p class="mt-3 text-slate-200">"Foundry is redefining how enterprise teams operationalize compliance."</p></article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/60 p-6"><p class="text-sm text-amber-300">Forbes</p><p class="mt-3 text-slate-200">"A breakout startup for compliance automation in regulated industries."</p></article>
        <article class="rounded-2xl border border-slate-700 bg-slate-900/60 p-6"><p class="text-sm text-amber-300">The Information</p><p class="mt-3 text-slate-200">"Enterprise buyers are rapidly adopting Foundry for audit resilience."</p></article>
      </div>
    </section>

    <section id="contact" class="mx-auto max-w-4xl px-6 py-16 text-center">
      <div class="rounded-3xl border border-amber-300/30 bg-amber-500/10 p-10">
        <h2 class="text-3xl font-bold text-white">Interested in learning more? Reach out directly.</h2>
        <p class="mt-4 text-slate-200">investors@foundryai.com</p>
        <a id="deck" href="#" class="mt-7 inline-flex rounded-full bg-amber-400 px-6 py-3 font-semibold text-slate-900 hover:bg-amber-300">Request Deck</a>
      </div>
    </section>

    <footer class="border-t border-slate-800 px-6 py-10 text-center text-sm text-slate-400">
      <p>Â© 2026 Foundry, Inc. Confidential investor information.</p>
    </footer>
  </div>
</body>
</html>$$,
    '',
    '{}'::jsonb,
    TRUE,
    TRUE,
    NOW(),
    NOW()
)
ON CONFLICT (slug) DO NOTHING;
