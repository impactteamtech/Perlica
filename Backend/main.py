#importing fastApi, os and dependencies
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv
from router.convert_route import router

#loading our environment variables from our .env file so python can see them
load_dotenv()

app = FastAPI()  #initializing our fastApi app

#include our route in our app
app.include_router(router, prefix='/converter', tags=['converter'])

#FIXED CORS CONFIG (Render-safe)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

#our router route
@app.get("/")
async def read_root():
    return {"message": "SERVER is up and running"}  #our root route

#our main function to run our fastApi app
# if __name__ == "__main__":
#     uvicorn.run("main:app", host=str(host), port=int(port), reload=True)

