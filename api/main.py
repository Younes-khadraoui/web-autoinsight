from fastapi import FastAPI, HTTPException, UploadFile, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import pandas as pd
import os
from autoinsight.dataset.basic import BaseDataset
from langchain_openai import ChatOpenAI
from autoinsight.analysis.operation_analysis import (
    analyze_single_operation,
    conclusion_generation,
)
from pydantic import BaseModel, ValidationError
from dotenv import load_dotenv
from autoinsight.operations.eda import DescriptiveStatistics

app = FastAPI()


@app.post("/generate-conclusion")
async def generate_conclusion(
    req: Request,
    operation: str = Form(...),
    prompt: str = Form(...),
    uploadedFile: UploadFile = Form(...),
):
    try:
        print("Operation:", operation)
        print("Prompt:", prompt)
        print("Uploaded File Name:", uploadedFile.filename)
        # Save the uploaded file
        contents = await uploadedFile.read()
        with open(uploadedFile.filename, "wb") as f:
            f.write(contents)

        data = pd.read_csv(uploadedFile.filename)
        operation = DescriptiveStatistics(data=data)
        operation.run_operation()

        print(data)

        return JSONResponse(content={"conclusion": "Your conclusion goes here"})
    except ValidationError as e:
        return JSONResponse(content={"detail": str(e)}, status_code=422)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
