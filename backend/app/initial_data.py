#!/usr/bin/env python3

from app.db.session import get_db
from app.db.crud import create_user
from app.db.schemas import UserCreate
from app.db.session import SessionLocal


def init() -> None:
    db = SessionLocal()

    create_user(
        db,
        UserCreate(
            email="tarek@gmail.com",
            full_name="tarek",
            age=28,
            contact="0543181163",
            nationality="syrian",
            role="admin",
            password="admin",
            is_active=True,
            is_superuser=True,
        ),
    )


if __name__ == "__main__":
    print("Creating superuser tarek@gmail.com")
    init()
    print("Superuser created")
