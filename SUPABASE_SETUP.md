# Supabase Authentication Setup for Claire

This guide will help you set up Supabase authentication for the Claire AI Voice Agent Dashboard.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com) if you don't have one)
2. A new or existing Supabase project

## Step 1: Create a Supabase Project

1. Log in to your Supabase account
2. Create a new project or use an existing one
3. Note your project's URL and anon key from the API settings

## Step 2: Set Up Environment Variables

Create a `.env.local` file in the root of your project with the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Replace `your_supabase_project_url` and `your_supabase_anon_key` with the values from your Supabase project.

## Step 3: Configure OAuth Providers

### GitHub OAuth

1. Go to GitHub Developer Settings: https://github.com/settings/developers
2. Create a new OAuth App
3. Set the Authorization callback URL to: `https://your-project-ref.supabase.co/auth/v1/callback`
4. Copy the Client ID and Client Secret
5. In your Supabase dashboard, go to Authentication > Providers > GitHub
6. Enable GitHub auth and paste your Client ID and Client Secret
7. Save the changes

### Google OAuth

1. Go to Google Cloud Console: https://console.cloud.google.com/
2. Create a new project or use an existing one
3. Go to APIs & Services > Credentials
4. Create OAuth client ID credentials
5. Set the Authorized redirect URI to: `https://your-project-ref.supabase.co/auth/v1/callback`
6. Copy the Client ID and Client Secret
7. In your Supabase dashboard, go to Authentication > Providers > Google
8. Enable Google auth and paste your Client ID and Client Secret
9. Save the changes

## Step 4: Run the Application

Start the development server:

```bash
npm run dev
```

Visit http://localhost:3000/login to test the authentication flow.

## Authentication Flow

1. Users visit the login page
2. They select a social provider (GitHub or Google)
3. After successful authentication, they are redirected to the dashboard
4. The user profile component in the top-right corner shows their profile picture and provides a dropdown with a logout option

## Troubleshooting

- If you encounter CORS errors, ensure your site URL is added to the allowed URLs in your Supabase project settings
- For local development, make sure `localhost:3000` is added to the allowed URLs
- Check browser console for any authentication-related errors
- Verify that your environment variables are correctly set and accessible to the application

## Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js with Supabase Auth](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
