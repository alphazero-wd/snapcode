langs = (
    'Text File',
    'HTML5',
    'CSS3',
    'C++',
    'Javascript React',
    "Typescript React",
    'C#',
    'C',
    'Python',
    'Elixir',
    'PHP',
    'Go',
    'Javascript',
    'Typescript',
    'Java'
)


def convert_to_prism_lang(lang: str):
  langs_map = {
    'HTML5': 'html',
    'CSS3': 'css',
    'C++': 'cpp',
    'Javascript React': "jsx",
    "Typescript React": 'tsx',
    'C#': 'cs',
  }
  return langs_map.get(lang, lang.lower())


def convert_to_lang_logo(lang: str):
  """
    Images of languages are taken from https://devicon.dev

    Every image has the format:
    ```html
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{{lang}}/{{lang}}-original.svg" />
    ```
    E.g. if language name is Elixir, then lang is the lowercase version i.e. elixir

    However there are some cases that have to be handled specially such as:
    - C++ -> cplusplus
    - Javascript/Typescript React -> react
    - C# -> csharp
  """
  if 'React' in lang:
    return 'react'
  return lang.replace('+', 'plus').replace('#', 'sharp').lower()
