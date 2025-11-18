from fastapi import UploadFile
from pydantic import BaseModel

class OCRDTO(BaseModel):
    image: UploadFile  # Image field