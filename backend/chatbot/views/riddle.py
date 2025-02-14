from dataclasses import dataclass
from typing import Dict
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import random
from ..config import ModelManager
import json 
@dataclass
class RiddleData:
    question: str
    answer: str
    category: str

    @classmethod
    def from_dict(cls, data: Dict) -> 'RiddleData':
        return cls(
            question=data['question'],
            answer=data['answer'],
            category=data['category'],
        )

class RiddleGenerator:
    def __init__(self):
        self.model = ModelManager.get_model()  
        self.categories = [
            "logic", "wordplay", "math", "nature", "everyday objects",
            "food", "animals", "geography", "space", "technology"
        ]

    def _generate_prompt(self, category: str) -> str:
        return f"""
        Generate an engaging riddle about {category}.
        Format your response exactly as this JSON:
        {{
            "question": "The riddle question",
            "answer": "The riddle answer",
            "category": "{category}"
        }}
        Make it clever and fun, but not too difficult!
        """

    def generate(self) -> RiddleData:
        try:
            category = random.choice(self.categories)
            prompt = self._generate_prompt(category)
            response = self.model.generate_content(prompt)
            riddle_data = json.loads(response.text)
            return RiddleData.from_dict(riddle_data)
        except Exception as e:
            print(f"Error generating riddle: {str(e)}")
            return self._get_fallback_riddle()

    def _get_fallback_riddle(self) -> RiddleData:
        return RiddleData(
            question="What has keys, but no locks; space, but no room; and you can enter, but not go in?",
            answer="A keyboard!",
            category="technology"
        )

riddle_generator = RiddleGenerator()

@csrf_exempt
@require_http_methods(["GET", "POST"])
def riddle_view(request):
    try:
        riddle_data = riddle_generator.generate()
        return JsonResponse({
            'question': riddle_data.question,
            'answer': riddle_data.answer,
            'category': riddle_data.category
        })
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)