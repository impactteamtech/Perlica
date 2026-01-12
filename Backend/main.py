#importing fastApi, os and dependencies
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from router.convert_route import router
from router.email_route import router as email_router
import uvicorn


 # Import your translate router
from router.translate import router as translate_router

# import currency converter
from router.currency_route import router as currency_router

#loading our environment variables from our .env file so python can see them
load_dotenv()
#getting our port and host from our .env file
port = os.getenv("APP_PORT")
host = os.getenv("APP_HOST")
backend_url = os.getenv("BACKEND_URL")
frontend_url = os.getenv("FRONTEND_URL")
app = FastAPI() #initializing our fastApi app
app.include_router(email_router)
#our cors middleware url options
cors_option = [v for v in [backend_url, frontend_url] if v]
#include our route in our app
app.include_router(router, prefix='/converter', tags=['converter'])

#FIXED CORS CONFIG (Render-safe)
app.add_middleware(
        CORSMiddleware,
    allow_origins=[
        'https://www.perlicatoursandtravel.com',
        'https://perlica-backend.onrender.com',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ],
        allow_credentials=True, 
        allow_methods=["*"],     
        allow_headers=["*"],     
    )

# # Include router in FastAPI app for translation --Miracle
app.include_router(translate_router, prefix="", tags=["translate"])  # endpoint = /translate

# # currency converter --yp
app.include_router(currency_router, prefix='/currency', tags=['currency'])

#email router ---yassine
app.include_router(email_router, prefix='/email', tags=['email'])

#our router route
@app.get("/")
async def read_root():
    return {"message": "SERVER is up and running"}  #our root route

if __name__ == "__main__":
    # print(f"Starting server on http://{host}:{port}")
    uvicorn.run("main:app", host=host, port=int(port), reload=True)

