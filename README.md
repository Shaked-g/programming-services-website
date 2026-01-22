# Programming Services Website

A modern, responsive website for programming services built with Next.js 16, TypeScript, and Tailwind CSS. Features internationalization (English/Hebrew), contact forms, and project request functionality.

## Features

- 🌍 **Internationalization** - Support for English and Hebrew
- 📧 **Contact Forms** - Contact form and detailed project request form
- 🎨 **Modern UI** - Built with Radix UI components and Tailwind CSS
- 📱 **Responsive Design** - Mobile-first approach
- 🔄 **Real-time Updates** - Automatic deployments
- 🗄️ **Database Integration** - MongoDB for form submissions
- 📢 **Slack Notifications** - Optional Slack integration for form submissions

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Database**: MongoDB
- **Internationalization**: next-intl
- **Deployment**: Render (recommended) or GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm
- MongoDB database (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd programming-services-website
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
MONGODB_DB_NAME=your-database-name

# Slack Integration (Optional)
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/SLACK/WEBHOOK
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Deployment

### Option 1: Render (Recommended)

Render provides a complete platform for deploying full-stack applications with databases.

#### Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a free account and cluster
3. Create a database user and get your connection string
4. Update your `.env` file with the MongoDB URI

#### Step 2: Deploy to Render

1. Go to [Render](https://render.com/) and create an account
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `programming-services-website`
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: `18` (or latest LTS)

#### Step 3: Add Environment Variables

In your Render service settings, add these environment variables:

```
MONGODB_URI=your-mongodb-atlas-connection-string
MONGODB_DB_NAME=your-database-name
SLACK_WEBHOOK_URL=your-slack-webhook-url (optional)
```

#### Step 4: Deploy

Render will automatically build and deploy your application. Your site will be available at `https://your-service-name.onrender.com`.

### Option 2: GitHub Pages

⚠️ **Note**: GitHub Pages only supports static sites. Since this app uses API routes and MongoDB, you'll need to either:

1. Use a static export (losing API functionality), or
2. Use GitHub Pages for the frontend and deploy APIs separately

#### Static Export (Limited Functionality)

1. Update `next.config.mjs`:
```javascript
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}
```

2. Build the static export:
```bash
npm run build
```

3. Deploy to GitHub Pages:
```bash
npm install -g gh-pages
gh-pages -d out
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `MONGODB_DB_NAME` | Database name (defaults to 'codecraft-labs') | No |
| `SLACK_WEBHOOK_URL` | Slack webhook for form notifications | No |

## Project Structure

```
├── app/                    # Next.js app router
│   ├── [locale]/          # Internationalized pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   └── ...               # Feature components
├── lib/                   # Utility functions
├── messages/             # Internationalization files
├── public/               # Static assets
└── styles/               # Additional styles
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Quality

The project uses TypeScript for type safety and ESLint for code quality. All builds are tested for TypeScript errors.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run build` to ensure everything works
5. Submit a pull request

## License

This project is licensed under the MIT License.