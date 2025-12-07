# Environment Variables Setup for Hosting

This guide explains how to set environment variables for different hosting platforms.

## Required Environment Variables

Your application needs the following environment variables:

### 1. Site URL (Public)

-   **Variable**: `NEXT_PUBLIC_SITE_URL`
-   **Example**: `https://kacimo.me`
-   **Used for**: Sitemap and robots.txt generation

### 2. SMTP Email Configuration (Server-side)

-   **SMTP_HOST**: Your SMTP server hostname
    -   Gmail: `smtp.gmail.com`
    -   Outlook: `smtp-mail.outlook.com`
    -   Custom: Your SMTP server address
-   **SMTP_PORT**: SMTP port number
    -   Gmail: `587` (TLS) or `465` (SSL)
    -   Outlook: `587`
-   **SMTP_USER**: Your email address
-   **SMTP_PASS**: Your email password or app password
-   **SMTP_SECURE**: `true` for SSL (port 465) or `false` for TLS (port 587)

## Setting Environment Variables by Platform

### Vercel (Recommended for Next.js)

1. Go to your project on [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
    - Click **Add New**
    - Enter variable name (e.g., `SMTP_HOST`)
    - Enter variable value
    - Select environments (Production, Preview, Development)
    - Click **Save**
5. **Redeploy** your application after adding variables

**Quick Setup:**

```bash
# Using Vercel CLI (optional)
vercel env add SMTP_HOST
vercel env add SMTP_PORT
vercel env add SMTP_USER
vercel env add SMTP_PASS
vercel env add SMTP_SECURE
vercel env add NEXT_PUBLIC_SITE_URL
```

### Netlify

1. Go to your site on [Netlify Dashboard](https://app.netlify.com)
2. Go to **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add each variable with its value
5. Click **Save**
6. **Redeploy** your site

### Railway

1. Go to your project on [Railway](https://railway.app)
2. Click on your project
3. Go to **Variables** tab
4. Click **New Variable**
5. Add each variable
6. Variables are automatically applied (no redeploy needed)

### Render

1. Go to your service on [Render Dashboard](https://dashboard.render.com)
2. Go to **Environment** section
3. Click **Add Environment Variable**
4. Add each variable
5. Click **Save Changes**
6. Service will automatically redeploy

### DigitalOcean App Platform

1. Go to your app on [DigitalOcean](https://cloud.digitalocean.com)
2. Click on your app
3. Go to **Settings** → **App-Level Environment Variables**
4. Click **Edit**
5. Add each variable
6. Click **Save**
7. App will automatically redeploy

### AWS Amplify

1. Go to your app on [AWS Amplify Console](https://console.aws.amazon.com/amplify)
2. Click on your app
3. Go to **App settings** → **Environment variables**
4. Click **Manage variables**
5. Add each variable
6. Click **Save**
7. App will automatically redeploy

### Heroku

1. Go to your app on [Heroku Dashboard](https://dashboard.heroku.com)
2. Click on your app
3. Go to **Settings** tab
4. Click **Reveal Config Vars**
5. Add each variable with its value
6. Click **Add**
7. Variables are automatically applied

**Using Heroku CLI:**

```bash
heroku config:set SMTP_HOST=smtp.gmail.com
heroku config:set SMTP_PORT=587
heroku config:set SMTP_USER=your-email@gmail.com
heroku config:set SMTP_PASS=your-app-password
heroku config:set SMTP_SECURE=false
heroku config:set NEXT_PUBLIC_SITE_URL=https://kacimo.me
```

## Gmail App Password Setup

If using Gmail, you need to create an App Password:

1. Go to your [Google Account](https://myaccount.google.com)
2. Go to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **App passwords**
5. Select **Mail** and **Other (Custom name)**
6. Enter "Portfolio" as the name
7. Click **Generate**
8. Copy the 16-character password
9. Use this password as `SMTP_PASS`

## Testing Your Configuration

After setting up environment variables:

1. Deploy your application
2. Test the contact form
3. Check if emails are being sent
4. Check the browser console for any errors

## Security Notes

⚠️ **Important:**

-   Never commit `.env` files to Git
-   `SMTP_PASS` should be kept secret
-   Use App Passwords for Gmail (not your regular password)
-   `NEXT_PUBLIC_*` variables are exposed to the browser
-   Server-side variables (SMTP\_\*) are only available on the server

## Local Development

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
```

**Note:** `.env.local` is already in `.gitignore` and won't be committed.
