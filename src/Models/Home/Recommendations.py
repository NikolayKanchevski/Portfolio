from typing import List
from dataclasses import dataclass, field

@dataclass
class Recommendation:
    name: str
    occupation: str
    image: str
    text: str
    star_count: int = 5

@dataclass
class RecommendationManager:
    recommendations: List[Recommendation] = field(default_factory=list)

    def add_recommendation(self, recommendation: Recommendation):
        self.recommendations.append(recommendation)

    def add_recommendations(self, *recommendations: Recommendation):
        self.recommendations.extend(recommendations)