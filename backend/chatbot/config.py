import os
import google.generativeai as genai

class ModelManager:
    _model = None

    @classmethod
    def get_model(cls):
        if cls._model is None:
            api_key = os.environ.get('GOOGLE_API_KEY')
            if not api_key:
                raise ValueError("GOOGLE_API_KEY environment variable not set")
            genai.configure(api_key=api_key)
            cls._model = genai.GenerativeModel('gemini-pro')
        return cls._model
