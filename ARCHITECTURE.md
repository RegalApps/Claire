# Claire AI Voice Agent Dashboard - Architecture Documentation

## Overview

Claire is a sophisticated dashboard for managing an AI voice agent system specifically designed for property leasing. It provides comprehensive tools for monitoring call performance, analyzing conversations, and optimizing the AI agent's effectiveness. The modular component structure makes it easy to extend and maintain.

## Tech Stack

- **Framework**: Next.js 15.2.4
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, custom components
- **Authentication**: Supabase Auth
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

```
claire/
├── app/                    # Next.js app directory
│   ├── auth/               # Authentication routes
│   │   ├── callback/       # OAuth callback handler
│   │   └── auth-error/     # Auth error page
│   ├── login/              # Login page
│   ├── settings/           # User settings page
│   ├── layout.tsx          # Root layout with UserProvider
│   └── page.tsx            # Main dashboard page
├── components/             # React components
│   ├── auth/               # Auth-related components
│   │   ├── social-login.tsx    # Social login buttons
│   │   ├── user-profile.tsx    # User profile dropdown
│   │   └── auth-loading.tsx    # Auth loading state
│   ├── ui/                 # UI components (buttons, cards, etc.)
│   ├── call-trigger.tsx    # Component to initiate calls
│   ├── kpi-cards.tsx       # Key performance indicators
│   ├── transcript-viewer.tsx # Call transcript viewer
│   ├── recent-calls.tsx    # Recent calls list
│   └── ai-performance.tsx  # AI performance metrics
├── contexts/               # React contexts
│   └── user-context.tsx    # Authentication context
├── lib/                    # Utility functions
│   └── supabase.ts         # Supabase client
├── middleware.ts           # Auth middleware for route protection
├── package.json            # Dependencies and scripts
└── SUPABASE_SETUP.md       # Supabase setup instructions
```

## Core Features

### Dashboard

The main dashboard (`app/page.tsx`) is organized into four tabs:

1. **Overview**: Shows KPI cards, call performance chart, and call trigger
2. **Calls**: Displays the call trigger and a full list of recent calls
3. **Transcripts**: Shows the transcript viewer for detailed call analysis
4. **Analytics**: Presents AI performance metrics and trends

### Authentication Flow

The authentication system uses Supabase for social login (GitHub and Google):

1. User visits `/login` and selects a social provider
2. After authentication with the provider, they're redirected to `/auth/callback`
3. The callback handler exchanges the code for a session
4. The middleware protects routes and redirects unauthenticated users to login
5. The `UserProvider` context makes user data available throughout the app
6. The user profile component in the header shows the logged-in user

### Key Components

#### Call Trigger (`call-trigger.tsx`)
- Form to initiate calls with prospects
- Collects property details and prospect information
- Simulates API call with loading state

#### KPI Cards (`kpi-cards.tsx`)
- Displays key metrics: Total Calls, Avg Call Duration, Conversion, Tours Scheduled
- Uses color-coded cards with icons

#### Transcript Viewer (`transcript-viewer.tsx`)
- Shows detailed call transcripts with sentiment analysis
- Includes confidence scores and filtering options

#### Recent Calls (`recent-calls.tsx`)
- Lists recent calls with status badges and engagement metrics
- Provides action buttons for each call

#### AI Performance (`ai-performance.tsx`)
- Displays AI metrics: response accuracy, NLP understanding, conversation flow
- Shows system health and call volume statistics

### Authentication Components

#### Social Login (`auth/social-login.tsx`)
- Provides GitHub and Google login buttons
- Handles OAuth flow with Supabase

#### User Profile (`auth/user-profile.tsx`)
- Displays user avatar and dropdown menu
- Provides access to settings and logout

#### User Context (`contexts/user-context.tsx`)
- Manages authentication state
- Provides user data and session information
- Handles loading states during authentication

## Data Flow

1. **Authentication**: User data flows from Supabase through the `UserProvider` context
2. **Protected Routes**: Middleware checks session status before allowing access
3. **Dashboard**: Components fetch and display mock data (ready for API integration)
4. **User Actions**: Call trigger and settings forms simulate API interactions

## Future Enhancements

1. **Real API Integration**: Replace mock data with real API calls
2. **Database Integration**: Store user preferences and settings in Supabase
3. **Real-time Updates**: Implement real-time updates for call data
4. **Advanced Analytics**: Expand analytics with more detailed metrics and visualizations
5. **User Management**: Add user roles and permissions

## Conclusion

Claire's architecture follows modern React best practices with a component-based structure, context for state management, and clean separation of concerns. The authentication system is robust and secure, using Supabase's trusted OAuth implementation. The modular design makes it easy to extend and maintain as the application grows.
