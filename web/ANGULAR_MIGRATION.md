# Angular 20 Migration

## Summary

This project has been successfully migrated from Angular 18.2.8 to Angular 20.3.12 with modern standalone architecture.

## Key Changes

### Package Updates
- **Angular Core**: 18.2.8 → 20.3.12
- **Angular Material/CDK**: 18.2.8 → 20.3.12
- **Angular Fire**: 18.0.1 → 20.0.1
- **TypeScript**: 5.4.5 → 5.8.3
- **Zone.js**: 0.14.10 → 0.15.1

### Architecture Migration

#### Before (Hybrid Approach)
- Standalone root component (AppComponent)
- NgModule-based routing (AppRoutingModule)
- Lazy-loaded feature modules using `loadChildren`
- Mixed module/standalone architecture

#### After (Pure Standalone)
- Fully standalone architecture
- Modern routing using `provideRouter` in main.ts
- Lazy-loaded components using `loadComponent`
- All NgModule files removed

### Routing Changes

**Old routing approach:**
```typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'orgs/:orgSlug',
    loadChildren: () =>
      import('./org-detail/org-detail.module').then((m) => m.OrgDetailModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

**New routing approach:**
```typescript
// app.routes.ts
export const routes: Routes = [
  {
    path: 'orgs/:orgSlug',
    loadComponent: () =>
      import('./org-detail/org-detail.component').then(
        (m) => m.OrgDetailComponent,
      ),
  },
];

// main.ts
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    // other providers...
  ],
});
```

### Files Removed
- `app-routing.module.ts`
- All feature module files:
  - `login/login.module.ts`
  - `login/login-routing.module.ts`
  - `org-tree/org-tree.module.ts`
  - `org-tree/org-tree-routing.module.ts`
  - `org-detail/org-detail.module.ts`
  - `org-detail/org-detail-routing.module.ts`
  - `ics217-detail/ics217-detail.module.ts`
  - `ics217-detail/ics217-detail-routing.module.ts`
  - `manage-users/manage-users.module.ts`
  - `manage-users/manage-users-routing.module.ts`

### TypeScript Configuration

Updated `tsconfig.json` with Angular 20 requirements:
- `moduleResolution`: Changed from `node` to `bundler`

### Build Configuration

Angular 20 migration included automatic updates to:
- `angular.json` - Updated for v20 build system
- Build defaults maintained for style guide compatibility

## Testing

Build verified successfully with no warnings. Existing test failures are unrelated to the migration (Firebase provider configuration issues).

## Migration Steps Used

1. Updated Angular from 18 → 19 → 20 (required incremental migration)
2. Updated Angular Material, CDK, and Fire to v20
3. Converted `main.ts` to use `provideRouter` instead of `importProvidersFrom(AppRoutingModule)`
4. Created `app.routes.ts` with standalone routing
5. Added `standalone: true` to all main feature components
6. Updated all route lazy-loading to use `loadComponent` instead of `loadChildren`
7. Removed all NgModule files
8. Cleaned up unused imports

## Benefits of Standalone Architecture

1. **Simpler code**: No need for NgModule boilerplate
2. **Better tree-shaking**: Improved bundle sizes
3. **Clearer dependencies**: Imports directly in components
4. **Modern approach**: Aligned with Angular's future direction
5. **Easier testing**: Components are self-contained

## Compatibility

This project now uses Angular's recommended modern architecture and is compatible with:
- Node.js: >=22 (as specified in package.json)
- Angular: 20.x
- TypeScript: 5.8.x
