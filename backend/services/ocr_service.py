import json
from typing import Never
from entities.ocr_result import OCRResult
import requests


class OCRService:
    
    def ocr_space_file(self, filename, api_key='helloworld', language='eng'):
        """ OCR.space API request with local file.
            Python3.5 - not tested on 2.7
        :param filename: Your file path & name.
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
        with open(filename, 'rb') as f:
            r = requests.post('https://api.ocr.space/parse/image',
                            files={filename: f},
                            data=payload,
                            )
        return OCRResult(r.content.decode())


# Use examples:
# test_file = ocr_space_file(filename='example_image.png', language='pol')