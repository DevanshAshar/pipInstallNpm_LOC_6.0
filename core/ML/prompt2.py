import google.generativeai as genai
import requests
from PIL import Image
from decouple import config


def generate_reports(url,prompt):
    genai.configure(api_key="AIzaSyCiX2lf1KNcJ94zLCjxD4OpG0jGlEbubDw")

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
      prompt,
      image_parts[0],
      "\n\n",
    ]

    response = model.generate_content(prompt_parts)
    return response.text


# url = "http://res.cloudinary.com/dpfxl2odl/image/upload/v1710021098/gcmwyt9pnp8navphoszq.jpg"
# output = generate_reports(url)
# print(output)
