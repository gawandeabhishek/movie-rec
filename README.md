# Movie Recommender

A Netflix-style movie recommendation platform built with Next.js, featuring movie recommendations, trailers, and a sleek UI.

## Features

- 🎬 Movie recommendations based on user input
- 🎥 Movie trailers and previews
- 🎯 Responsive Netflix-style UI
- 🚀 Fast and efficient API integration

## Prerequisites

Before you begin, you need to:

1. Subscribe to the [Movie Recommender API on RapidAPI](https://rapidapi.com/abhishekgawande1667/api/movie-recommender-api)
2. Get your RapidAPI key from your RapidAPI dashboard

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/gawandeabhishek/movie-recommender.git
cd movie-recommender
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
# Copy the example environment file
cp .env.example .env
```

4. Configure your environment:

   - Open the `.env` file
   - Replace `your_rapidapi_key_here` with your actual RapidAPI key
   - The `RAPIDAPI_HOST` should already be set correctly

5. Run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API Integration

This project uses the [Movie Recommender API](https://rapidapi.com/abhishekgawande1667/api/movie-recommender-api) for fetching movie recommendations. To use this API:

1. Sign up on [RapidAPI](https://rapidapi.com)
2. Subscribe to the [Movie Recommender API](https://rapidapi.com/abhishekgawande1667/api/movie-recommender-api)
3. Get your API key from the RapidAPI dashboard
4. Add your API key to the `.env` file

## Environment Variables

The following environment variables are required:

- `RAPIDAPI_KEY`: Your RapidAPI key
- `RAPIDAPI_HOST`: The API host (default: movie-recommender-api.p.rapidapi.com)

Make sure to:

- Never commit your `.env` file to version control
- Use `.env.example` as a template for required environment variables
- Add these environment variables to your hosting platform when deploying

## Deployment

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new). When deploying:

1. Add the required environment variables in your Vercel project settings
2. Deploy your project
3. Your movie recommender will be live!

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Movie Recommender API Documentation](https://rapidapi.com/abhishekgawande1667/api/movie-recommender-api)
- [RapidAPI Getting Started Guide](https://rapidapi.com/getting-started)
