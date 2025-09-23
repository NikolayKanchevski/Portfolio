from dataclasses import dataclass, field
from typing import List

@dataclass
class Skill:
    name: str
    icon: str
    percentage: int
    tooltip: str = ''
    website: str = ''

@dataclass
class SkillCollection:
    name: str
    skills: List[Skill] = field(default_factory=list)

    def add_skill(self, skill: Skill) -> None:
        self.skills.append(skill)

    def add_skills(self, *skills: Skill) -> None:
        self.skills.extend(skills)

@dataclass
class SkillManager:
    collections: List[SkillCollection] = field(default_factory=list)
    
    def add_collection(self, collection: SkillCollection) -> None:
        self.collections.append(collection)

    def add_collections(self, *collections: SkillCollection) -> None:
        self.collections.extend(collections)