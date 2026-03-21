# 🔐 SECURITY CHECKLIST BEFORE GOING LIVE

Review this before sharing with residents!

## Pre-Deployment Security

- [ ] Admin password changed (NOT `admin123`)
- [ ] Database connection uses SSL (Neon does this automatically)
- [ ] GitHub repo is public (for Render/Vercel auto-deployment)
- [ ] No API keys in code (all in environment variables)
- [ ] CORS is properly configured

## After Deployment

- [ ] Test login with both resident and admin accounts
- [ ] Verify orders are saved and retrievable
- [ ] Check that admins can update order status
- [ ] Ensure no errors in browser console
- [ ] Monitor Render logs for any backend errors

## Data Privacy

⚠️ **Important Notes:**
- No real authentication (by design - as requested)
- Any flat number can be used by anyone
- Consider adding real authentication later for production
- Admin can view all orders (share password carefully)
- Database stores order history permanently

## Monitoring

After deployment, occasionally check:

**Render Dashboard:**
- https://dashboard.render.com
- Check "Metrics" for uptime
- Monitor "Logs" for errors

**Vercel Dashboard:**
- https://vercel.com/dashboard
- View deployments
- Check analytics

**Neon Console:**
- https://console.neon.tech
- Monitor storage usage
- Check query performance

## Scaling Later

If you grow beyond free tier limits:

```
Database: Neon starts at $14/month
Backend: Render starts at $7/month
Frontend: Vercel forever free
```

## Maintenance

**Weekly:**
- Check Render logs for errors
- Monitor database storage

**Monthly:**
- Review order statistics
- Backup data (export from Neon)

**As Needed:**
- Add more grocery items
- Update prices
- Fix bugs (push to GitHub, auto-deployes)

---

**You're ready to launch!** 🚀
