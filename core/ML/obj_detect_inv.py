from PIL import ImageDraw, Image
from io import BytesIO
import pickle
import requests
import cloudinary
import cloudinary.api
import cloudinary.uploader
from decouple import config

cloudinary.config(
    cloud_name=config("cloud_name"),
    api_key=config("api_key"),
    api_secret=config("api_secret"),
    secure=True,
)
def detect_obj(url,list):
    with open("C://Users//Acer//Desktop//pipInstallNpm_LOC_6.0//core//ML//model//detector_mod.pkl", "rb") as file:
        loaded_detector = pickle.load(file)
    # local_image_path = '/content/WhatsApp Image 2024-03-09 at 17.26.57_ed9bb91a.jpg'
    image = Image.open(requests.get(url, stream=True).raw)
    loaded_predictions = loaded_detector(
        image,
        candidate_labels=list,
    )
    # print(loaded_predictions)
    margin = 25
    draw = ImageDraw.Draw(image)
    cropped_images = []
    labels = []
    for prediction in loaded_predictions:
        if prediction['score'] >= 0.15:    
            box = prediction["box"]
            label = prediction["label"]
            labels.append(label)
            xmin, ymin, xmax, ymax = [int(x) for x in box.values()]
            xmin = max(0, xmin - margin)
            ymin = max(0, ymin - margin)
            xmax = min(image.width, xmax + margin)
            ymax = min(image.height, ymax + margin)
            image_stream = BytesIO()
            cropped_image = image.crop((xmin, ymin, xmax, ymax))
            print(cropped_image)
            cropped_image.save(image_stream, format="jpeg")
            image_stream.seek(0)
            img = cloudinary.uploader.upload(image_stream)["secure_url"]
            print(label)
            cropped_images.append([label,img])
    # for img in cropped_images:
    #     print(img[2])
    #     print(img[1])
    #     print(img[0])
    return  cropped_images
# detect("https://res.cloudinary.com/dcbnv0eyo/image/upload/v1709994354/aykcbamawsgqtwcxkhvp.jpg",[
#             "bed",
#             "laptop",
#             "cupboard",
#             "TV",
#             "pillow",
#             "blankets",
#             "human",
#             "lamp",
#         ])