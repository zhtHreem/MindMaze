from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.http import require_http_methods
from dataclasses import dataclass
from django.views.decorators.csrf import csrf_exempt  # Add this import

from ..config import ModelManager
from typing import Optional, Dict, List
import google.generativeai as genai
import os
import json
import random
from functools import lru_cache

@dataclass
class FunFactData:
    fun_fact: str
    explanation: str
    origin: str
    category: str
    emoji: str

    @classmethod
    def from_dict(cls, data: Dict) -> 'FunFactData':
        return cls(
            fun_fact=data['funFact'],
            explanation=data['explanation'],
            origin=data['origin'],
            category=data['category'],
            emoji=data['emoji'],
        )

    def to_presentation(self) -> str:
        return f"""{self.emoji} Random Fun Fact Time!

🌟 DID YOU KNOW? 
{self.fun_fact}

🤔 WHY IS THIS TRUE? 
{self.explanation}

📚 THE STORY BEHIND IT:
{self.origin}

Category: {self.category.title()} ✨

Click 'Generate' for another mind-blowing fact!"""

class FunFactGenerator:
    def __init__(self):
        self.model = ModelManager.get_model()
        self.categories = self._get_categories()

    
    @staticmethod
    @lru_cache(maxsize=1)  # Cache categories since they don't change
    def _get_categories() -> List[str]:
        return [
            "ancient history", "space", "human body", "animal kingdom", 
            "science", "technology", "food", "culture", "nature", 
            "psychology", "inventions", "ocean life", "weather",
            "art history", "geography"
        ]

    def _generate_prompt(self, category: str) -> str:
        return f"""
        Generate an interesting fun fact about {category} with its explanation and origin.
        Format your response exactly as this JSON:
        {{
            "funFact": "A surprising and engaging fun fact",
            "explanation": "A clear, fascinating explanation of why this fact is true",
            "origin": "Where this knowledge comes from or how it was discovered",
            "category": "{category}",
            "emoji": "2-3 relevant emojis for this topic"
        }}
        Make it engaging and mind-expanding!
        """

    def _parse_response(self, response_text: str) -> Dict:
        # Clean up potential markdown formatting
        cleaned_text = response_text.strip()
        if cleaned_text.startswith('```json'):
            cleaned_text = cleaned_text.replace('```json', '').replace('```', '').strip()
        return json.loads(cleaned_text)

    def generate(self) -> FunFactData:
        try:
            category = random.choice(self.categories)
            prompt = self._generate_prompt(category)
            response = self.model.generate_content(prompt)
            fact_data = self._parse_response(response.text)
 
            return FunFactData.from_dict(fact_data)
        except Exception as e:
            print(f"Error generating fun fact: {str(e)}")
            return self._get_fallback_fact(category)

    def _get_fallback_fact(self, category: str) -> FunFactData:
        return FunFactData(
            fun_fact="The human brain can process images in as little as 13 milliseconds!",
            explanation="Our visual processing system is incredibly fast and efficient, allowing us to quickly recognize patterns and make split-second decisions.",
            origin="This was discovered through research at MIT's Brain and Cognitive Sciences department.",
            category=category,
            emoji="🧠 ⚡ 👁️"
        )

# Initialize generator once for reuse
fun_fact_generator = FunFactGenerator()
@csrf_exempt  # Only for development! Add proper CSRF protection in production
@require_http_methods(["GET", "POST"])
def funfact_view(request):
    try:
        fact_data = fun_fact_generator.generate()
        
        return JsonResponse({
            'fun_fact': fact_data.fun_fact,
            'explanation': fact_data.explanation,
            'origin': fact_data.origin,
            'category': fact_data.category,
            'emoji': fact_data.emoji
        })
        
    except Exception as e:
        return JsonResponse({
            'error': str(e)
        }, status=500)