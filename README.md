# Zettabyte Dashboard

A modern, responsive dashboard application built with Next.js 15, featuring data visualization, user management, and post browsing capabilities. This project demonstrates a full-stack dashboard with beautiful UI components, smooth animations, and mobile-first design.

## 🚀 Features

### Core Functionality

- **Dashboard Overview**: Interactive stats grid and activity charts
- **User Management**: Browse and view detailed user information with modal popups
- **Posts Browser**: View and navigate through community posts with detailed views
- **Authentication**: Login and signup pages with form validation
- **Responsive Design**: Mobile-first approach with adaptive layouts

### Technical Features

- **Modern UI**: Built with Tailwind CSS and custom components
- **Smooth Animations**: Framer Motion for page transitions and micro-interactions
- **Type Safety**: Full TypeScript implementation
- **Data Fetching**: Custom hooks with error handling and loading states
- **Form Validation**: Zod schema validation with React Hook Form
- **API Integration**: RESTful API endpoints with mock data

## 🛠️ Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.23.14
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **State Management**: TanStack Query (React Query)
- **UI Components**: Custom component library

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── activity/      # Activity data endpoint
│   │   └── stats/         # Statistics endpoint
│   ├── auth/              # Authentication pages
│   │   ├── login/         # Login page
│   │   └── signup/        # Registration page
│   ├── dashboard/         # Main dashboard
│   ├── posts/             # Posts management
│   │   └── [id]/          # Individual post pages
│   ├── users/             # User management
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components
│   ├── providers/         # Context providers
│   └── ui/                # Base UI components
├── hooks/                 # Custom React hooks
└── lib/                   # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd zettabyte-task
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Key Components

### Dashboard

- **Stats Grid**: Displays key metrics with trend indicators
- **Activity Chart**: Visual representation of weekly activity data
- **Responsive Layout**: Adapts to different screen sizes

### User Management

- **User Directory**: Table/card view of all users
- **User Details Modal**: Detailed user information popup
- **Search & Filter**: Easy user discovery

### Posts System

- **Posts Grid**: Card-based layout for browsing posts
- **Post Details**: Individual post pages with comments
- **Navigation**: Seamless navigation between posts

### Authentication

- **Login Page**: User authentication with validation
- **Signup Page**: User registration with form validation
- **Form Validation**: Real-time validation with error messages

## 🔧 API Endpoints

- `GET /api/stats` - Dashboard statistics
- `GET /api/activity` - Activity chart data
- External APIs:
  - JSONPlaceholder for users and posts data

## 🎯 Features in Detail

### Responsive Design

- Mobile-first approach
- Adaptive layouts for different screen sizes
- Touch-friendly interactions on mobile devices

### Animations

- Page transitions with Framer Motion
- Staggered animations for lists and grids
- Smooth hover and tap effects

### Error Handling

- Loading states for all data fetching
- Error boundaries with retry functionality
- Graceful fallbacks for failed requests

### Type Safety

- Full TypeScript implementation
- Strict type checking
- Interface definitions for all data structures

## 🚀 Deployment

The application is ready for deployment on Vercel, Netlify, or any other platform that supports Next.js.

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with zero configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)

---

**Zettabyte Dashboard** - Manage your data efficiently with a simple and powerful dashboard.
