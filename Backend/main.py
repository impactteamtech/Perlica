import uvicorn
#importing fastApi, os and dependencies
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os 
from dotenv import load_dotenv
from router.convert_route import router

# Import your translate router
from router.translate import router as translate_router

#loading our environment variables from our .env file so python can see them
load_dotenv()
#getting our port and host from our .env file
port = os.getenv("APP_PORT")
host = os.getenv("APP_HOST")
backend_url = os.getenv("BACKEND_URL")
frontend_url = os.getenv("FRONTEND_URL")
app = FastAPI() #initializing our fastApi app
#our cors middleware url options
cors_option = [backend_url, frontend_url]


#include our route in our app
app.include_router(router, prefix='/converter', tags=['converter'])
app.add_middleware(
        CORSMiddleware,
        allow_origins=cors_option,
        allow_credentials=True, 
        allow_methods=["*"],     
        allow_headers=["*"],     
    )

# Include router in FastAPI app
app.include_router(translate_router, prefix="", tags=["translate"])  # endpoint = /translate
#our router route
@app.get("/")
async def read_root():
    return{"message": "SERVER is up and running"} #our root route

#our main function to run our fastApi app
if __name__ == "__main__":
    uvicorn.run("main:app", host=str(host), port=int(port), reload=True)

