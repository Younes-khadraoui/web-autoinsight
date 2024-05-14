from fastapi import FastAPI, HTTPException, UploadFile, Request, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

import pandas as pd
import os
import io
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
    prompt: str = Form(...),
    uploadedFile: UploadFile = Form(...),
):
    try:
        contents = await uploadedFile.read()
        file_like = io.BytesIO(contents)

        data = pd.read_csv(file_like)

        print(data.head())

        column_description = {
            "gender": "gender of the student,",
            "race/ethnicity": "the racial or ethnic background of the student",
            "parental level of education": "the highest level of education attained by the student's parents or guardians",
            "lunch": "type of lunch received by the student",
            "test preparation course": "Specifies whether the student completed a test preparation course",
            "math score": "the score achieved by the student on a math exam",
            "reading score": "the score achieved by the student on a reading exam",
            "writing score": " the score achieved by the student on a writing exam",
        }
        data_description = """This data set consists of the marks secured by the students in various subjects.
                       a Alongside academic scores, the dataset includes additional attributes that offer
                        insights into the students' backgrounds and potential influencing factors."""

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

        operation = DescriptiveStatistics(data=data)
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
