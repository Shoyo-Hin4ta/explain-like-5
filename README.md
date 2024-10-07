# Explain Like I'm 5 Topic Explainer

## Project Overview

This project is a Next.js website that explains topics in a way a 5-year-old would understand. It uses the Anthropic AI API to generate explanations and stores them in a MongoDB database. The project demonstrates the ability to integrate various tools and technologies into a functional web application.

## Features

1. **TypeSafety using TypeScript**: The project is built with TypeScript, ensuring type safety throughout the codebase.

2. **Zod for Input Validation**: Robust input validation is implemented using Zod, ensuring data integrity and improving user experience.

3. **NextJS Anthropic AI SDK Integration**: The application integrates with Anthropic's AI API to generate child-friendly explanations.

4. **Explanation Stacking**: Explanations stack on top of each other until the tab is refreshed, allowing users to compare multiple explanations.

5. **Streamed Responses**: Explanations are not just shown but streamed to the user, providing a more dynamic and engaging experience.

6. **Sortable Explanation Table**: The explanations are displayed in a table that can be sorted by creation date, with options for both ascending (A to Z) and descending (Z to A) order.

7. **Completely Responsive**: The website can be accessed and viewed from any device and the user experience will not be ruined.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/Shoyo-Hin4ta/Explain-like-5
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your Anthropic API key and MongoDB connection string:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   MONGODB_URI=your_mongodb_uri_here
   BASE_URL="http://localhost:3000"
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `app/page.tsx`: The main page component where users can input topics and view explanations.
- `app/page2/page.tsx` : The page 2 which shows the explanation table.
- `app/api/explanations.ts`: API route that handles the Anthropic AI request and MongoDB storage.
- `components/`: Directory containing reusable React components.
- `lib/`: Directory for utility functions and configuration.

## Technologies Used

- Next.js
- TypeScript
- Zod
- Anthropic AI SDK
- MongoDB
- Mongoose
- ShadCN && Tailwind CSS (for styling)

