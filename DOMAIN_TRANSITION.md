# Domain Transition Checklist: phuketbusroutes.com

## ✅ Completed - Code Changes

### 301 Redirects Implemented
- Server-side redirects from `*.mintprin.com` to `phuketbusroutes.com`
- WWW to non-WWW redirects
- HTTP to HTTPS enforcement
- `_redirects` file for static hosting providers

### SEO Configuration Updated
- All canonical URLs point to `phuketbusroutes.com`
- Sitemap.xml updated with correct domain
- Robots.txt updated with preferred domain directive
- Structured data schemas use correct URLs
- Hreflang tags properly configured

### Application Code Updated
- SEO hooks use main domain
- Breadcrumb structured data
- All metadata references

## 🔧 Manual Tasks Required

### DNS Configuration (NameCheap)
- [ ] Get Replit deployment IP address
- [ ] Update A record from `34.111.179.208` to Replit IP
- [ ] Remove circular URL redirect record
- [ ] Add CNAME for `www` pointing to `phuketbusroutes.com`
- [ ] Keep TXT record for Replit verification

### After DNS Propagation (24-48 hours)
- [ ] Test all redirects work correctly
- [ ] Verify SSL certificate is active
- [ ] Submit new sitemap to Google Search Console
- [ ] Add new domain to Google Search Console
- [ ] Monitor search rankings for both domains

### Optional SEO Steps
- [ ] Update any external backlinks to use new domain
- [ ] Update social media profile links
- [ ] Set up Google Analytics for new domain
- [ ] Monitor 404 errors in Search Console

## 🚨 Current Status
- Old domain: `phuketbusroutes.mintprin.com` (should redirect)
- New domain: `phuketbusroutes.com` (main site)
- Redirects: Active in code, waiting for DNS setup
- SEO: Fully configured for new domain

## Timeline
- **Immediate**: DNS configuration needed
- **24-48 hours**: Wait for propagation
- **1 week**: Monitor and verify everything works
- **3-6 months**: Keep monitoring old domain traffic