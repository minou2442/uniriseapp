# UniRise Major Predictor

A full-stack application that helps students find their ideal university majors based on their preferences and skills.

## Features

- Node.js Express backend with Gemini AI integration
- React frontend with Tailwind CSS and Framer Motion
- Bilingual support (English and Arabic)
- Dark mode/Light mode toggle
- Interactive questionnaire with smooth animations
- Responsive design for all devices

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Lucide React for icons
- Axios for API requests

### Backend
- Node.js with Express
- Google Generative AI SDK for Gemini integration
- Winston for logging
- CORS support for cross-origin requests

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. In a separate terminal, start the backend:
   ```
   npm run server
   ```
5. Or run both simultaneously:
   ```
   npm run dev:full
   ```

## Environment Variables

Create a `.env` file in the root directory with:

```
GEMINI_API_KEY=your_gemini_api_key
PORT=5000
```

## License

MIT