import os

import yaml
from flask import Blueprint
from datetime import date

from src.Core.Page import *
from src.Models.Home.Skills import *
from src.Models.Home.Items import *
from src.Models.Home.Recommendations import *

homeBlueprint: Blueprint = Blueprint('Home', __name__)

def create_skill_collection_from_yaml_file(filePath: str) -> SkillCollection:
    with open(filePath, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)

    skills: list[Skill] = [
        Skill(
            name=skill['name'],
            icon=skill['icon'],
            percentage=skill['percentage'],
            tooltip=skill['tooltip'],
            website=skill['website'],
        )
        for skill in data['skills']
    ]

    collection: SkillCollection = SkillCollection(data['name'], skills=skills)
    return collection

def create_skill_manager(skills_directory_path: str) -> SkillManager:
    files: list[str] = [
        'LanguageCollection.yaml',
        'OperatingSystemCollection.yaml',
        'ProgrammingLanguageCollection.yaml',
        'APICollection.yaml',
        'SoftwareCollection.yaml',
        'WebTechnologyCollection.yaml',
        'ToolCollection.yaml'
    ]

    manager = SkillManager()
    for file in files:
        manager.add_collection(create_skill_collection_from_yaml_file(os.path.join(skills_directory_path, file)))

    return manager

def create_item_collection_from_yaml_file(filePath: str) -> ItemCollection:
    with open(filePath, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)

    items: list[Item] = [
        Item(
            title=item['title'],
            description=item['description'],
            image=item['image']
        )
        for item in data['items']
    ]

    collection: ItemCollection = ItemCollection(data['name'], items=items)
    return collection

def create_item_manager(items_directory_path: str) -> ItemManager:
    files: list[str] = [
        'SierraEngineCollection.yaml',
        'CloudyMathCollection.yaml',
        'DungeonGenerator.yaml',
        'CookingAppCollection.yaml',
    ]

    manager = ItemManager()
    for file in files:
        manager.add_collection(create_item_collection_from_yaml_file(os.path.join(items_directory_path, file)))

    return manager

def create_recommendations_from_yaml_file(filePath: str) -> list[Recommendation]:
    with open(filePath, 'r', encoding='utf-8') as file:
        data = yaml.safe_load(file)

    recommendations: list[Recommendation] = [
        Recommendation(
            name=recommendation['name'],
            occupation=recommendation['occupation'],
            image=recommendation['image'],
            text=recommendation['text'],
            star_count=recommendation['star_count']
        )
        for recommendation in data['recommendations']
    ]

    return recommendations

def create_recommendation_manager(recommendations_directory_path: str) -> RecommendationManager:
    recommendations: list[Recommendation] = create_recommendations_from_yaml_file(f'{ recommendations_directory_path }/Recommendations.yaml')
    recommendationManager: RecommendationManager = RecommendationManager(recommendations=recommendations)

    return recommendationManager

@homeBlueprint.route('/')
@homeBlueprint.route('/Home/')
def home() -> str:
    page: Page = Page('pages/Home/home.html', 'Portfolio - Home')

    age: int = datetime.date.today().year - 2007 - ((date.today().day, date.today().month) < (8, 7))
    page.add_value('age', age)

    skillManager: SkillManager = create_skill_manager(f'{ page.data_directory_path }/Skills/')
    page.add_value('skillManager', skillManager)

    itemManager: ItemManager = create_item_manager(f'{ page.data_directory_path }/Items/')
    page.add_value('itemManager', itemManager)

    recommendationManager: RecommendationManager = create_recommendation_manager(f'{ page.data_directory_path }/Recommendations/')
    page.add_value('recommendationManager', recommendationManager)

    return page.render_template