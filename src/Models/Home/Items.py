from dataclasses import dataclass, field
from typing import List, Tuple
import random

@dataclass
class Item:
    title: str
    description: str
    image: str

@dataclass
class ItemCollection:
    name: str
    items: List[Item] = field(default_factory=list)

    def add_item(self, item: Item) -> None:
        self.items.append(item)

    def add_items(self, *items: Item) -> None:
        self.items.extend(items)

    @property
    def filter(self) -> str:
        return f'Collection{ id(self) }'

@dataclass
class ItemManager:
    collections: List[ItemCollection] = field(default_factory=list)

    def add_collection(self, collection: ItemCollection) -> None:
        self.collections.append(collection)

    def add_collections(self, *collections: ItemCollection) -> None:
        self.collections.extend(collections)

    def get_items(self) -> List[Tuple[str, Item]]:
        return [(collection.filter, item) for collection in self.collections for item in collection.items]
