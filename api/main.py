from fastapi import FastAPI, HTTPException, UploadFile, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import Optional

import pandas as pd
import os
import io
import json
from autoinsight.dataset.basic import BaseDataset
from langchain_google_genai import ChatGoogleGenerativeAI
from autoinsight.analysis.operation_analysis import (
    analyze_single_operation,
    conclusion_generation,
)
from pydantic import ValidationError
from dotenv import load_dotenv

# importing operations
from autoinsight.operations.factorial_analysis import (
    Correspondence_Analysis,
    FAMD_analysis,
    MCAnalysis,
    MFAnalysis,
    PCAnalysis,
)
from autoinsight.operations.eda import (
    DescriptiveStatistics,
    CategoricalGroupBy,
    EmptyCells,
)
from autoinsight.operations.classification import Classification
from autoinsight.operations.regression import Regression
from autoinsight.operations.ml import CorrelationMatrix, SpearmanCorrelationMatrix
from autoinsight.operations.multivariate import CCAnalysis, Kmeans

app = FastAPI()

load_dotenv()


@app.post("/generate-conclusion")
async def generate_conclusion(
    req: Request,
    operation: str = Form(...),
    prompt: Optional[str] = Form(None),
    dataDescription: str = Form(...),
    columnDescriptions: str = Form(...),
    uploadedFile: UploadFile = Form(...),
):
    try:
        contents = await uploadedFile.read()
        file_like = io.BytesIO(contents)

        data = pd.read_csv(file_like)

        print(data.head())

        column_description = json.loads(columnDescriptions)

        data_description = dataDescription

        llm = ChatGoogleGenerativeAI(
            model="gemini-pro",
            google_api_key=os.getenv("GOOGLE_API_KEY"),
        )

        dataset_descr = BaseDataset(
            columns_description=column_description,
            data=data,
            description=data_description,
            name=uploadedFile.filename,
        )

        operation_classes = {
            "descreptif": DescriptiveStatistics,
            "PCAnalysis": PCAnalysis,
            "MCAnalysis": MCAnalysis,
            "CorrelationMatrix": CorrelationMatrix,
        }

        try:
            operation = operation_classes[operation](data=data)
        except KeyError:
            raise HTTPException(status_code=400, detail="Invalid operation type")

        operation.run_operation()

        response = analyze_single_operation(
            operation=operation,
            dataset=dataset_descr,
            llm=llm,
        )

        conclsion = conclusion_generation(
            operation_analysis=response,
            dataset=dataset_descr,
            llm=llm,
        )

        return JSONResponse(content={"conclusion": conclsion, "response": response})
    except ValidationError as e:
        return JSONResponse(content={"detail": str(e)}, status_code=422)
    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
