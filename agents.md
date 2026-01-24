# AI Agents Guide

This document provides essential information for AI agents working on or contributing to this Next.js fitness application project.

## Project Overview

**Project Name:** Fitness Pal  
**Technology Stack:** Next.js 16.1.4, React 19, TypeScript, Tailwind CSS 4.1.18, Prisma 7.3.0  
**Database:** SQLite (development), PostgreSQL (production)  
**Package Manager:** pnpm  

## Project Structure

```
fitness-pal/
├── prisma/
│   ├── schema.prisma          # Database schema
│   ├── migrations/             # Database migrations
│   └── dev.db                # SQLite development database
├── src/                      # Source code
├── public/                   # Static assets
├── prisma.config.ts          # Prisma configuration (v7)
├── tailwind.config.ts        # Tailwind CSS configuration
├── next.config.js           # Next.js configuration
├── agents.md                # This file
└── package.json
```

## Development Guidelines

### Code Style & Standards
- **TypeScript:** Strict mode enabled, prefer type safety
- **Components:** Use functional components with TypeScript interfaces
- **Styling:** Tailwind CSS utility classes, no custom CSS unless absolutely necessary
- **File Naming:** PascalCase for components, kebab-case for utilities
- **Imports:** Organize imports (external libraries, internal modules, relative imports)

### Database Operations
- **Prisma v7:** Configuration is in `prisma.config.ts`, not schema.prisma
- **Environment:** Database URL configured via `DATABASE_URL` environment variable
- **Migrations:** Use `pnpm prisma migrate dev --name <migration-name>`
- **Generation:** Run `pnpm prisma generate` after schema changes

### Available Scripts
```bash
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm prettier         # Check code formatting
pnpm prettier:fix     # Fix code formatting
pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:generate  # Generate Prisma Client
pnpm prisma:push      # Push schema changes to database
pnpm prisma:reset     # Reset database and apply schema
pnpm prisma:migration  # Create new migration
pnpm test             # Run tests
pnpm test:coverage    # Run tests with coverage
```

## Key Features & Models

### Core Data Models
- **User:** Profile, fitness metrics, relationships
- **Exercise:** Exercise library with muscle groups, videos, defaults
- **TrainingPlan:** Custom workout plans with sessions
- **Activity:** User activity logs and progression tracking
- **MealLog:** Nutrition tracking
- **BodyMeasurement:** Physical metrics tracking

### UI Components (Radix UI based)
- Avatar, Dropdown Menu, Label components from `@radix-ui`
- Custom components with `class-variance-authority`
- Icons from `lucide-react`
- Styling utilities: `clsx`, `tailwind-merge`, `tailwindcss-animate`

## Architecture Patterns

### Component Organization
- Use atomic design principles where applicable
- Separate business logic from UI components
- Prefer custom hooks for data fetching and state management
- Implement proper error boundaries

### Data Flow
- Server Components for data fetching where possible
- Client Components for interactivity
- Proper TypeScript types for all API responses
- Consistent error handling patterns

## Testing & Quality

### Linting & Formatting
- ESLint with Next.js configuration
- Prettier for code formatting
- Run `pnpm lint` and `pnpm prettier:fix` before commits

### Testing (when implemented)
- Jest for unit tests
- Test coverage target: 80%+
- Mock external dependencies appropriately

## Environment Configuration

### Required Environment Variables
```env
DATABASE_URL="file:./dev.db"  # Development (SQLite)
# DATABASE_URL="postgresql://..."  # Production
```

### Prisma v7 Configuration
- Database connection configured in `prisma.config.ts`
- Schema definition in `prisma/schema.prisma`
- Uses `dotenv` for environment variable loading

## Contribution Guidelines for AI Agents

### Before Making Changes
1. **Understand Context:** Read existing code patterns and conventions
2. **Check Dependencies:** Ensure all required packages are installed
3. **Review Schema:** Understand the Prisma data model before database changes
4. **Test Locally:** Verify changes work in development environment

### When Modifying Code
1. **Type Safety:** Always use TypeScript, avoid `any` types
2. **Performance:** Consider React best practices (memoization, lazy loading)
3. **Accessibility:** Follow WCAG guidelines, use semantic HTML
4. **Responsive:** Ensure mobile-first responsive design

### Database Changes
1. **Schema First:** Modify `prisma/schema.prisma` before migrations
2. **Generate Client:** Run `pnpm prisma generate` after schema changes
3. **Migration:** Create descriptive migration names
4. **Backward Compatibility:** Consider existing data when altering tables

### UI/UX Considerations
- **Consistency:** Follow existing design patterns
- **User Feedback:** Provide clear loading states and error messages
- **Performance:** Optimize images and use Next.js Image component
- **SEO:** Use proper meta tags and semantic structure

## Common Patterns

### Component Structure
```typescript
interface ComponentProps {
  // Define props with TypeScript
}

export function Component({ prop }: ComponentProps) {
  // Component logic
  return (
    <div className="tailwind-classes">
      {/* JSX content */}
    </div>
  )
}
```

### Database Operations
```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Example query
const users = await prisma.user.findMany({
  include: {
    activities: true,
    TrainingPlan: true
  }
})
```

### API Routes (Next.js App Router)
```typescript
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // Handle GET request
  return NextResponse.json(data)
}
```

## Security Considerations

- **Input Validation:** Validate all user inputs
- **SQL Injection:** Use Prisma parameterized queries
- **Authentication:** Implement proper auth patterns (when added)
- **Environment Variables:** Never expose secrets in client-side code
- **CORS:** Configure properly for API routes

## Deployment Notes

- **Build Process:** `pnpm build` creates optimized production build
- **Database:** Use PostgreSQL in production, configure via environment variables
- **Static Assets:** Optimize images and use Next.js Image component
- **Performance:** Enable Next.js optimizations and proper caching headers

## Troubleshooting Common Issues

### Prisma Issues
- If `prisma generate` fails, check `prisma.config.ts` syntax
- For migration conflicts, review database state carefully
- Ensure `DATABASE_URL` is properly set in environment

### Build Issues
- Check for missing TypeScript types
- Verify all imports are correctly resolved
- Ensure Tailwind CSS classes are valid

### Development Issues
- Clear Next.js cache: `rm -rf .next`
- Restart development server after major changes
- Check browser console for client-side errors

---

**Note:** This guide should be updated as the project evolves. Always refer to the latest documentation and codebase for current patterns and practices.