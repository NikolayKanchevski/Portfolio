import os
import datetime
from dataclasses import dataclass, field

from flask import render_template, url_for


@dataclass
class Page:
    htmlFilePath: str = ''
    values: dict[str, any] = field(default=dict)

    TITLE_KEYWORD: str = '__TITLE__'
    DESCRIPTION_KEYWORD: str = '__DESCRIPTION__'
    KEYWORDS_KEYWORD: str = '__KEYWORDS__'
    PAGE_DIRECTORY_KEYWORD: str = '__PAGE_DIRECTORY_PATH__'
    ASSET_DIRECTORY_KEYWORD: str = '__ASSET_DIRECTORY_PATH__'
    DATA_DIRECTORY_KEYWORD: str = '__DATA_DIRECTORY_PATH__'
    DATE_KEYWORD: str = '__DATE__'

    def __init__(self, htmlFilePath: str, title: str = 'Title'):
        self.htmlFilePath = htmlFilePath
        self.values = {
            self.TITLE_KEYWORD: title,
            self.DESCRIPTION_KEYWORD: '',
            self.KEYWORDS_KEYWORD: [],
            self.PAGE_DIRECTORY_KEYWORD: self.page_directory_path,
            self.ASSET_DIRECTORY_KEYWORD: self.asset_directory_path,
            self.DATA_DIRECTORY_KEYWORD: self.data_directory_path,
            self.DATE_KEYWORD: datetime.date.today()
        }

    @property
    def page_directory_path(self) -> str:
        return url_for('static', filename=f'pages/{ os.path.basename(os.path.dirname(self.htmlFilePath)) }')

    @property
    def asset_directory_path(self) -> str:
        return url_for('static', filename=f'assets/pages/{ os.path.basename(os.path.dirname(self.htmlFilePath)) }')

    @property
    def data_directory_path(self) -> str:
        return f'static/data/pages/{ os.path.basename(os.path.dirname(self.htmlFilePath)) }'

    @property
    def render_template(self) -> str:
        return render_template(self.htmlFilePath, **self.values)

    def add_value(self, name: str, value: any):
        self.values[name] = value

    def remove_value(self, name: str):
        self.values.pop(name)

    def get_value(self, name: str) -> any:
        return self.values.get(name)