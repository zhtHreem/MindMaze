from django.urls import path
from .views import funfact, riddle

# urlpatterns = [
#     path('', views.chatbot_view, name='chatbot_view'),
# ]
urlpatterns = [
  #  path('', views.funfact_view, name='funfact'),
    path('generate-fact/', funfact.funfact_view, name='generate_fact'),
    path('generate-riddle/', riddle.riddle_view, name='generate_riddle'),

    # path('test/', views.test_view, name='test'),
]
