from datetime import datetime
from pydantic import BaseModel


class User(BaseModel):
    name: str
    phone_number: str
    email: str
    password: str
#   puc_expiry_date: datetime

    class Config:
        orm_mode = True
