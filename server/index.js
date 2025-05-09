import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import winston from 'winston';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message }) => {
      return `${timestamp} ${level}: ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ]
});

// Check for API key
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  logger.error("OPENROUTER_API_KEY not found in environment variables.");
  process.exit(1);
}

// English to Arabic translation mapping (reversed from the FastAPI version)
const translateReverseMap = {
  "Technology": "التكنولوجيا",
  "Biology": "البيولوجيا",
  "Economics": "الاقتصاد",
  "Literature": "الآداب",
  "Arts": "الفنون",
  "Problem-solving": "حل المشكلات",
  "Memorization": "الحفظ والتذكر",
  "Creativity": "الإبداع والابتكار", 
  "Logic": "المنطق والتحليل",
  "Alone": "بمفردي",
  "In a group": "ضمن مجموعة",
  "With hands-on projects": "بمشاريع تطبيقية",
  "Remote learning": "بالتعلم عن بعد",
  "Helping others": "مساعدة الآخرين",
  "Innovation": "الابتكار والتجديد",
  "Money": "المال والربح",
  "Prestige": "الهيبة والمكانة",
  "Social impact": "التأثير المجتمعي",
  "In a hospital": "في مستشفى",
  "In an office": "في مكتب",
  "In a lab": "في مختبر",
  "In court": "في المحكمة",
  "In an art studio": "في استوديو فني",
  "In an educational institution": "في مؤسسة تعليمية",
  "Mathematics": "الرياضيات",
  "Chemistry": "الكيمياء",
  "Psychology": "علم النفس",
  "Communication": "التواصل",
  "Research": "البحث العلمي",
  "Leadership skills": "مهارات القيادة",
  "Technical skills": "مهارات التقنية",
  "Communication skills": "مهارات التواصل",
  "Analytical skills": "مهارات التحليل",
  "Job stability": "الاستقرار الوظيفي",
  "Flexibility": "المرونة",
  "Professional growth": "التطور المهني",
  "Work-life balance": "التوازن بين العمل والحياة",
  "Solving complex problems": "حل المشكلات المعقدة",
  "Working with people": "العمل مع الناس",
  "Creative innovation": "الابتكار الإبداعي",
  "Scientific analysis": "التحليل العلمي"
};

// Arabic to English translation mapping
const translateMap = Object.entries(translateReverseMap).reduce((acc, [eng, ar]) => {
  acc[ar] = eng;
  return acc;
}, {});

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to UniRise API', status: 'operational' });
});

app.post('/api/predict-major', async (req, res) => {
  try {
    logger.info('Received prediction request');
    const { answers } = req.body;

    // Validate required keys
    const requiredKeys = ['interest', 'strength', 'study', 'motivation', 'vision', 'skills', 'values', 'challenges'];
    const missingKeys = requiredKeys.filter(key => !(key in answers));
    
    if (missingKeys.length) {
      logger.warn(`Missing keys in input: ${missingKeys.join(', ')}`);
      return res.status(400).json({ error: `Missing keys in input: ${missingKeys.join(', ')}` });
    }

    // Translate answers
    const translated = Object.fromEntries(
      Object.entries(answers).map(([k, v]) => [k, translateMap[v] || v])
    );
    
    logger.info(`Translated answers: ${JSON.stringify(translated)}`);

    // Create prompt
    const prompt = `
A student answered:
- Interests: ${translated.interest}
- Strengths: ${translated.strength}
- Study Preference: ${translated.study}
- Motivation: ${translated.motivation}
- Future Vision: ${translated.vision}
- Skills: ${translated.skills}
- Values: ${translated.values}
- Challenges: ${translated.challenges}

Based on these, predict the top 3 suitable university majors in Algeria.
Give short explanations for each.
Format:
1. Major: Reason
2. ...
    `;

    // Use OpenRouter API
    const response = await axios.post('https://openrouter.ai/api/v1/chat/completions', {
      model: 'anthropic/claude-2',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': 'http://localhost:5173',
        'X-Title': 'UniRise Major Predictor'
      }
    });

    if (!response.data?.choices?.[0]?.message?.content) {
      logger.error('Empty response from OpenRouter API');
      throw new Error('No valid response received from OpenRouter API');
    }

    const result = response.data.choices[0].message.content.trim();
    logger.info('Prediction generated successfully');
    res.json({ result });

  } catch (error) {
    logger.error(`Prediction error: ${error.message}`);
    if (error.response) {
      // OpenRouter API error
      logger.error(`API Error: ${JSON.stringify(error.response.data)}`);
      res.status(error.response.status).json({ 
        error: `OpenRouter API Error: ${error.response.data.error?.message || 'Unknown error'}` 
      });
    } else {
      // Network or other error
      res.status(500).json({ error: `Internal Server Error: ${error.message}` });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  logger.info(`UniRise API server running on port ${PORT}`);
});

export default app;