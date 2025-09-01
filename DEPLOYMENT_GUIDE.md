# Production Deployment Guide for gfgmitadt.in

## Overview
This guide provides step-by-step instructions for safely deploying the updated GFG website to production, considering the separated frontend (Vercel) and backend (separate repository) architecture.

## Current Architecture
- **Frontend**: Deployed on Vercel at gfgmitadt.in
- **Backend**: Separate repository and deployment
- **Original Repository**: Different from current working repository

## Pre-Deployment Checklist

### 1. Repository Preparation
- [ ] All changes committed to current working repository
- [ ] Build tested locally (`npm run build` successful)
- [ ] Environment variables documented
- [ ] No development artifacts in commit

### 2. Environment Variables Verification
- [ ] Frontend `.env.local` configured
- [ ] Backend `.env` configured with matching keys
- [ ] Production environment variables ready

### 3. Backup Strategy
- [ ] Current live site functionality documented
- [ ] Database/JSON files backed up
- [ ] Environment configurations saved

## Deployment Strategy

### Phase 1: Repository Synchronization

#### Step 1: Identify Original Repository
1. **Find the original repository**:
   ```bash
   # Check current remote
   git remote -v
   
   # If needed, find the original repo URL from Vercel dashboard
   # Vercel Dashboard > Project > Settings > Git
   ```

2. **Compare repositories**:
   - Access the original repository on GitHub/GitLab
   - Compare file structure with your current working directory
   - Identify differences in configuration files

#### Step 2: Prepare for Merge
1. **Create a backup branch** in original repository:
   ```bash
   # In original repository
   git checkout main
   git pull origin main
   git checkout -b backup-before-update-$(date +%Y%m%d)
   git push origin backup-before-update-$(date +%Y%m%d)
   ```

2. **Document current state**:
   ```bash
   # Save current package.json versions
   cp package.json package.json.backup
   
   # Save current environment setup
   cp .env.example .env.example.backup
   ```

### Phase 2: Safe Integration

#### Step 3: Gradual File Integration
1. **Start with non-critical files**:
   ```bash
   # Copy updated files one by one, starting with:
   # 1. README.md
   # 2. .gitignore
   # 3. package.json (carefully merge dependencies)
   # 4. Configuration files
   ```

2. **Test each integration**:
   ```bash
   # After each file update
   npm install
   npm run build
   npm run dev  # Test locally
   ```

#### Step 4: Critical Files Integration
1. **Update core application files**:
   - Copy `app/` directory changes
   - Copy `components/` directory changes
   - Copy `hooks/`, `lib/`, `types/` directories
   - Update `next.config.mjs` carefully

2. **Verify after each major change**:
   ```bash
   npm run build
   npm run start
   # Test all major functionality
   ```

### Phase 3: Backend Coordination

#### Step 5: Backend Repository Update
1. **Locate backend repository**:
   - Find the separate backend repository
   - Ensure you have access and deployment credentials

2. **Update backend if needed**:
   ```bash
   # In backend repository
   git pull origin main
   
   # Copy your gfg-backend-main changes if any
   # Update environment variables
   # Test backend functionality
   npm start
   ```

3. **Coordinate deployment timing**:
   - Plan backend deployment first (if changes exist)
   - Ensure API endpoints remain compatible
   - Test API connectivity

### Phase 4: Production Deployment

#### Step 6: Vercel Deployment Preparation
1. **Environment Variables Setup**:
   ```bash
   # In Vercel dashboard for gfgmitadt.in:
   # Settings > Environment Variables
   # Add/Update:
   ADMIN_SECRET_KEY=your_production_key
   NODE_ENV=production
   ```

2. **Build Configuration Check**:
   - Verify `next.config.mjs` is production-ready
   - Confirm image domains are correctly configured
   - Check that build commands are correct in Vercel

#### Step 7: Staged Deployment
1. **Deploy to preview first**:
   ```bash
   # Push to a feature branch first
   git checkout -b production-update-$(date +%Y%m%d)
   git push origin production-update-$(date +%Y%m%d)
   ```

2. **Test preview deployment**:
   - Vercel will create a preview URL
   - Test all functionality on preview
   - Verify admin panel works
   - Check all pages load correctly
   - Test responsive design

3. **Monitor preview deployment**:
   - Check Vercel build logs
   - Verify no build errors
   - Test performance

#### Step 8: Production Deployment
1. **Deploy to main branch**:
   ```bash
   # Only after preview testing is successful
   git checkout main
   git merge production-update-$(date +%Y%m%d)
   git push origin main
   ```

2. **Monitor production deployment**:
   - Watch Vercel deployment logs
   - Check gfgmitadt.in immediately after deployment
   - Test critical functionality

### Phase 5: Post-Deployment Verification

#### Step 9: Functionality Testing
1. **Critical path testing**:
   - [ ] Homepage loads correctly
   - [ ] Navigation works
   - [ ] Events page displays
   - [ ] About page with team info
   - [ ] Admin panel accessible
   - [ ] Admin authentication works
   - [ ] Event creation functionality

2. **Performance verification**:
   - [ ] Page load times acceptable
   - [ ] Images loading correctly
   - [ ] Mobile responsiveness
   - [ ] PWA functionality

#### Step 10: Rollback Plan
If issues occur:

1. **Immediate rollback**:
   ```bash
   # Revert to previous commit
   git revert HEAD
   git push origin main
   ```

2. **Alternative rollback**:
   - Use Vercel dashboard to redeploy previous version
   - Deployments > Previous deployment > Promote to Production

## Risk Mitigation

### Low-Risk Changes
- README.md updates
- .gitignore modifications
- Documentation changes

### Medium-Risk Changes
- Component updates
- Styling changes
- New features

### High-Risk Changes
- Configuration file changes
- Dependency updates
- API modifications

## Emergency Contacts
- Vercel support for deployment issues
- Backend repository maintainer
- Domain registrar for DNS issues

## Success Criteria
- [ ] gfgmitadt.in loads without errors
- [ ] All existing functionality preserved
- [ ] New features working as expected
- [ ] Admin panel functional
- [ ] Performance maintained or improved
- [ ] No broken links or missing assets

## Troubleshooting Common Issues

### Build Failures
1. Check Node.js version compatibility
2. Verify all dependencies are installed
3. Check for TypeScript errors
4. Review environment variables

### Runtime Errors
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check environment variable configuration
4. Review Vercel function logs

### Performance Issues
1. Check bundle size in build output
2. Verify image optimization settings
3. Review lazy loading implementation
4. Check for memory leaks

This deployment strategy ensures minimal risk to the live website while allowing for comprehensive updates to be safely integrated.

## Repository Management Best Practices

### Handling Repository Differences

#### Option A: Fork and Pull Request (Recommended)
1. **Fork the original repository** to your GitHub account
2. **Add your changes** to your fork
3. **Create a Pull Request** to the original repository
4. **Review and merge** after testing

#### Option B: Direct Integration
1. **Clone original repository** to a new directory
2. **Manually copy files** from your working directory
3. **Test thoroughly** before committing
4. **Push changes** to original repository

### Version Control Strategy
```bash
# Recommended branching strategy
main                    # Production branch (auto-deploys to Vercel)
├── develop            # Development branch
├── feature/updates    # Your current changes
└── hotfix/emergency   # Emergency fixes
```

## Backend Deployment Coordination

### If Backend Changes Are Required
1. **Deploy backend first**:
   ```bash
   # In backend repository
   git pull origin main
   # Apply your changes
   git add .
   git commit -m "Update backend for frontend compatibility"
   git push origin main
   # Deploy to backend hosting service
   ```

2. **Verify backend deployment**:
   ```bash
   # Test API endpoints
   curl https://your-backend-url/api/health
   curl https://your-backend-url/api/events
   ```

3. **Update frontend environment variables**:
   ```bash
   # In Vercel dashboard
   # Update NEXT_PUBLIC_API_URL if backend URL changed
   ```

### If No Backend Changes Required
- Current backend will continue working
- Ensure API compatibility is maintained
- No backend deployment needed

## Monitoring and Maintenance

### Post-Deployment Monitoring
1. **Set up monitoring** (if not already configured):
   - Vercel Analytics
   - Google Analytics
   - Error tracking (Sentry, LogRocket)

2. **Monitor for 24-48 hours**:
   - Check error rates
   - Monitor performance metrics
   - Watch for user reports

3. **Performance benchmarks**:
   - Page load times
   - Core Web Vitals
   - Mobile performance scores

### Maintenance Schedule
- **Daily**: Check error logs and performance
- **Weekly**: Review analytics and user feedback
- **Monthly**: Update dependencies and security patches
- **Quarterly**: Performance optimization review

## Contact Information and Resources

### Key Resources
- **Vercel Dashboard**: https://vercel.com/dashboard
- **Original Repository**: [Add URL when identified]
- **Backend Repository**: [Add URL when identified]
- **Domain Management**: [Add registrar info]

### Documentation Links
- Next.js 15 Documentation
- Vercel Deployment Guide
- TypeScript Migration Guide
- Performance Optimization Guide

### Support Channels
- Vercel Support: support@vercel.com
- Next.js Community: GitHub Discussions
- Emergency Contact: [Add team contact info]

---

**Remember**: Always test in preview environment before deploying to production. The live website at gfgmitadt.in serves real users and any downtime affects the organization's reputation.
