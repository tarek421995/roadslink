#!/usr/bin/env python3

from app.db.session import get_db
from app.db.crud import delete_user
from app.db.schemas import UserCreate
from app.db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    delete_user(db, 1)


if __name__ == "__main__":
    print("Creating superuser tarek@gmail.com")
    init()
    print("Superuser created")
