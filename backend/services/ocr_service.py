import json
from typing import Never
from entities.ocr_result import OCRResult
import requests
from fastapi import UploadFile
from io import BytesIO

from pathlib import Path
from dotenv import load_dotenv
import os
env_path = Path(__file__).parent / ".env"
load_dotenv(dotenv_path=env_path)

OCR_API_KEY = os.getenv("OCR_API_KEY")
if not OCR_API_KEY:
    raise RuntimeError("OCR_API_KEY not set. Add it to .env or env variables.")


class OCRService:
    
    def ocr_space_file(self, file: UploadFile, api_key='', language='eng'):
        """ OCR.space API request with local file.
            Python3.5 - not tested on 2.7
        :param file: Your file.
        :param api_key: OCR.space API key.
                        Defaults to 'helloworld'.
        :param language: Language code to be used in OCR.
                        List of available language codes can be found on https://ocr.space/OCRAPI
                        Defaults to 'en'.
        :return: Result in JSON format.
        """

        payload = {'isOverlayRequired': False,
                'apikey': api_key,
                'language': language,
                }
        
        file_content = file.file.read()
        files = {'file': file}

        r = requests.post('https://api.ocr.space/parse/image',
                        files={files},
                        data=payload,
                        )
        return OCRResult(r.json())