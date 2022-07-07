from modulefinder import IMPORT_NAME
from typing import Text
from numpy import save
import streamlit as st
import pandas as pd
import base64, random
import time, datetime
from pyresparser import ResumeParser
from pdfminer3.layout import LAParams, LTTextBox
from pdfminer3.pdfpage import PDFPage
from pdfminer3.pdfinterp import PDFResourceManager
from pdfminer3.pdfinterp import PDFPageInterpreter
from pdfminer3.converter import TextConverter
import io, random
from streamlit_tags import st_tags
from PIL import Image
import pymysql
import plotly.express as px

connection = pymysql(host = "localhost", user="root", password = "Erw9jujw5er69rt!!", db = 'sra')
cursor = connection.cursor()

def pdf_reader(file):
    resource_manager = PDFResourceManager()
    fake_file_handle = io.StringIO()
    converter = TextConverter(resource_manager, fake_file_handle, laparams=LAParams())
    page_interpreter = PDFPageInterpreter(resource_manager, converter)
    with open(file, 'rb') as fh:
        for page in PDFPage.get_pages(fh,
        cachning=True,
        check_extractable=True):
            page_interpreter.process_page(page)
            print(page)
        text = fake_file_handle.getvalue()

    converter.close()
    fake_file_handle.close()
    return text

def show_pdf(file_path):
    with open(file_path, "rb") as f:
        base64_pdf = base64.b64encode(f.read()).decode('utf-8')

    pdf_display = F'<iframe src="data:application/pdf;base64,{base64_pdf}" width="700" height="1000" type="application/pdf"></iframe>'
    st.markdown(pdf_display, unsafe_allow_html=True)

def insert_date(name, email, skills):
    DB_table_name = 'user_data'
    insert_sql = "insert into" + DB_table_name + """
    values (0, %s, %s, %s)"""
    rec_values = (name, email, skills)
    cursor.execute(insert_sql, rec_values)
    connection.commit()



sbt.set_page_config(
    page_title = "Test",
)

def run():
    st.title("test")
    st.sidebar.markdown("# Choose User")
    activities = ["Normal User", "Recruiter"]
    choice = st.sidebar.selectbox("Choose among the given options:", activities)

    db_sql = """CREATE DATABASE IF NOT EXISTS SRA;"""
    cursor.execute(db_sql)
    DB_table_name = 'user_data'
    table_sql = "CREATE TABLE IF NOT EXISTS" + DB_table_name + """
    (ID INT NOT NULL AUTO_INCREMENT, 
    NAME varchar(100) NOT NULL,
    EMAIL_ID VARCHAR(50) NOT NULL, 
    Skills VARCHAR(300) NOT NULL
    PRIMARY KEY (ID))
    """

    cursor.execute(table_sql)

    if choice == 'Normal User':
        pdf_file = st.file_uploader("Choose your Resume", type=["pdf"])
        if pdf_file is not None:
            save_image_path = './parsed_resumes/' + pdf_file.name
            with open(save_image_path, "wb") as f:
                f.write(pdf_file.getbuffer())
            
            show_pdf(save_image_path)
            resume_data = ResumeParser(save_image_path).get_extracted_data()
            
            if resume_data:
                resume_text = pdf_reader(save_image_path)