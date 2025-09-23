import os
import datetime
from dataclasses import dataclass, field

from flask import render_template

@dataclass
class Page:
    htmlFilePath: str = ''
    values: dict[str, any] = field(default=dict)

    TITLE_KEYWORD: str = '__TITLE__'
    DESCRIPTION_KEYWORD: str = '__DESCRIPTION__'
    KEYWORDS_KEYWORD: str = '__KEYWORDS__'
    DATE_KEYWORD: str = '__DATE__'

    def __init__(self, htmlFilePath: str, title: str = 'Title'):
        self.htmlFilePath = htmlFilePath
        self.values = {
            self.TITLE_KEYWORD: title,
            self.DESCRIPTION_KEYWORD: '',
            self.KEYWORDS_KEYWORD: [],
            self.DATE_KEYWORD: datetime.date.today()
        }

    @property
    def asset_directory(self) -> str:
        return f'static/assets/pages/{ os.path.basename(os.path.dirname(self.htmlFilePath)) }/'

    @property
    def data_directory(self) -> str:
        return f'static/data/pages/{ os.path.basename(os.path.dirname(self.htmlFilePath)) }/'

    @property
    def render_template(self) -> str:
        return render_template(self.htmlFilePath, **self.values)

    def add_value(self, name: str, value: any):
        self.values[name] = value

    def remove_value(self, name: str):
        self.values.pop(name)

    def get_value(self, name: str) -> any:
        return self.values.get(name)