import axios from 'axios';
import { QuestionnaireAnswer, PredictionResult } from '../types';

const API_URL = 'http://localhost:5000/api';

export const predictMajor = async (answers: QuestionnaireAnswer): Promise<PredictionResult> => {
  try {
    const response = await axios.post<PredictionResult>(`${API_URL}/predict-major`, { answers });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.error || 'Error connecting to the server');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const checkServerStatus = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${API_URL}/`);
    return response.status === 200;
  } catch (error) {
    return false;
  }
};