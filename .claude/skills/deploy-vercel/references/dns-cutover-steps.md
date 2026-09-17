# DNS Cutover — Detailed Steps

Registrar-agnostic walkthrough for pointing arpitshah.in at Vercel. Read this only when actually doing the cutover, not before.

1. **In Vercel:** open the project → Settings → Domains → add `arpitshah.in` (and `www.arpitshah.in` if you want the www variant to work — decide whether it redirects to the apex or vice versa).
2. Vercel shows the exact records to add — typically an `A` record for the apex domain pointing at Vercel's IP, and a `CNAME` for `www` pointing at `cname.vercel-dns.com`. The exact values are shown live in the Vercel dashboard; don't hardcode them here since Vercel can change its infrastructure IPs.
3. **At the domain registrar** (wherever arpitshah.in is registered): open DNS management, add the records exactly as Vercel specified. Remove any conflicting existing A/CNAME records for the same hostnames first.
4. **Wait for propagation** — usually minutes, can take up to 48 hours depending on TTL and registrar. Vercel's dashboard shows a "Valid Configuration" check once it detects the records.
5. **SSL** — Vercel automatically provisions a certificate once DNS resolves correctly. No manual cert management needed.
6. **Verify** — load `https://arpitshah.in` directly (not through Vercel's `*.vercel.app` preview URL) and confirm it serves the production deployment with a valid certificate (no browser warning).
7. **Redirect decision** — decide once, apply consistently: does `www.arpitshah.in` redirect to the apex, or the reverse? Vercel's domain settings let you set a primary domain and redirect the other.

This is a registrar-account action — it requires Arpit's own login credentials at wherever the domain is registered. Not something to attempt without him present.
