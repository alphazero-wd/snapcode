from collections import defaultdict
from uuid import uuid4
from time import time


class Snippets:
  def __init__(self, data):
    self.__snippets = data

  @property
  def snippets(self):
    return self.__snippets

  def add_snippet(self, payload):
    tags = [tag.strip() for tag in payload['tags'].split(',')
            ] if len(payload['tags']) > 0 else []
    self.__snippets.append({
      **payload,
      "content": payload['content'].strip(),
      "id": str(uuid4()),
      "tags": tags,
      "createdAt": round(time())
    })
    return self.snippets[-1]

  def edit_snippet(self, snippet, index, payload):
    tags = [tag.strip().lower() for tag in payload['tags'].split(',')
            ] if len(payload['tags']) > 0 else []
    if snippet and index > -1:
      self.snippets[index] = {**snippet, **payload,
                              "content": payload['content'].strip(),
                              "tags": tags, "updatedAt": round(time())}
      return snippet

  def remove_snippet(self, index):
    snippet = self.snippets.pop(index)
    return snippet

  def group_by_tags(self):
    tags = defaultdict(int)
    for snippet in self.snippets:
      snippet_tags = snippet['tags']
      for tag in snippet_tags:
        tags[tag] += 1
    return tags

  def group_by_langs(self):
    langs = defaultdict(int)
    for snippet in self.snippets:
      langs[snippet['lang']] += 1
    return langs

  def get_snippets_by_tag(self, tag):
    return [] if not tag else [
      snippet for snippet in self.snippets if tag in snippet['tags']]

  def get_snippets_by_lang(self, lang):
    return [] if not lang else [
      snippet for snippet in self.snippets if snippet['lang'] == lang]

  def find_snippet_by_id(self, id):
    for index, snippet in enumerate(self.snippets):
      if snippet['id'] == id:
        return snippet, index
    return None, -1

  def search_snippets(self, keyword):
    snippets = [
      snippet for snippet in self.snippets
      if keyword in snippet['title'].lower()
        or keyword in snippet['description'].lower()
        or keyword in snippet['lang'].lower()
        or keyword in snippet['tags']
        or keyword in snippet['content'].lower()
    ]
    return snippets

  def sort_snippets(self, found_snippets, sort_by):
    field, order = sort_by.split(':')
    return sorted(found_snippets, key=lambda s: s[field], reverse=bool(int(order)))
