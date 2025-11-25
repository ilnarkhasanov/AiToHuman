from entities.ocr_result import OCRResult
import requests
from fastapi import UploadFile


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

        # payload = [('isOverlayRequired', False),
        #         ('apikey', api_key),
        #         ('language', language),
        #         ('filetype', file.content_type)
        #         ]
        payload = {'isOverlayRequired': False,
                'apikey': api_key,
                'language': language,
                'filetype': file.content_type.split("/", 1)[1].upper(),
        }
        file_content = file.file
        files = {'file': file_content}

        r = requests.post('https://api.ocr.space/parse/image',
                        files=files,
                        data=payload,
                        ).json()

        if 'ParsedResults' in r and r['ParsedResults']:
            parsed_text = '\n'.join([result['ParsedText'] for result in r['ParsedResults'] if result['ParsedText']])
            return OCRResult(parsed_text)
        else:
            return OCRResult("No text found or error in processing")