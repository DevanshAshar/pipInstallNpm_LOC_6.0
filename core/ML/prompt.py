import google.generativeai as genai
import requests
from decouple import config

def damage_check(url):
  genai.configure(api_key=config("gemini_key"))
  generation_config = {
    "temperature": 0.4,
    "top_p": 1,
    "top_k": 32,
    "max_output_tokens": 4096,
  }

  safety_settings = [
    {
      "category": "HARM_CATEGORY_HARASSMENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_HATE_SPEECH",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
    {
      "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
      "threshold": "BLOCK_MEDIUM_AND_ABOVE"
    },
  ]

  model = genai.GenerativeModel(model_name="gemini-1.0-pro-vision-latest",
                                generation_config=generation_config,
                                safety_settings=safety_settings)
  img = requests.get(url, stream=True)
  image_parts = [
    {
      "mime_type": "image/jpeg",
      "data": img.content
    },
  ]

  prompt_parts = [
    "give whether the given accessories in the image are damaged or not and return only true or false",
    image_parts[0],
    "\n\n",
  ]

  response = model.generate_content(prompt_parts)
  return response.text