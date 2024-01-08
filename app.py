from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, url_for
from flask_wtf import CSRFProtect
from constants import APP_SECRET
from file import File
from forms import CreateSnippetForm, EditSnippetForm
from snippets import Snippets
from lang_convert import convert_to_lang_logo, convert_to_prism_lang, langs
import json

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = APP_SECRET

json_file = File('data.json')

data = json.loads(json_file.read_file())
snippets = Snippets(data)


@app.route("/", methods=['GET'])
def index():
  global snippets
  tags = snippets.group_by_tags()
  langs = snippets.group_by_langs()

  current_tag = request.args.get('tag', default='')
  current_lang = request.args.get('lang', default='')
  snippet_id = request.args.get('snippet_id', default='')

  filtered_snippets = [*snippets.get_snippets_by_tag(current_tag),
                       *snippets.get_snippets_by_lang(current_lang)]

  snippet, _ = snippets.find_snippet_by_id(snippet_id)

  return render_template("index.html",
                         tags=tags,
                         langs=langs,
                         snippets=filtered_snippets,
                         snippet_id=snippet_id,
                         current_tag=current_tag,
                         current_lang=current_lang,
                         snippet=snippet,
                         convert_to_prism_lang=convert_to_prism_lang,
                         convert_to_lang_logo=convert_to_lang_logo,
                         datetime=datetime)


@app.route('/snippet/create', methods=['GET', 'POST'])
@csrf.exempt
def create_snippet():
  form = CreateSnippetForm()
  payload = {
      "title": form.title.data,
      "content": form.content.data,
      "description": form.description.data,
      "lang": form.lang.data,
      "tags": form.tags.data
  }
  if request.method == 'POST' and form.validate_on_submit():
    snippet = snippets.add_snippet(payload)
    json_file.write_to_file(json.dumps(snippets.snippets))
    flash('Snippet created successfully', category='success')
    return redirect(url_for('index', lang=snippet['lang'], snippet_id=snippet['id']))
  return render_template('create.html', langs=langs, form=form)


@app.route('/snippet/edit/<id>', methods=('GET', 'POST'))
def edit_snippet(id):
  form = EditSnippetForm()
  snippet, index = snippets.find_snippet_by_id(id)
  payload = {
      "title": form.title.data,
      "content": form.content.data,
      "description": form.description.data,
      "lang": form.lang.data,
      "tags": form.tags.data
  }
  if not snippet:
    return redirect('/404')
  if request.method == 'GET':
    form.lang.data = snippet['lang']
    form.description.data = snippet['description']
    form.content.data = snippet['content']
  if request.method == 'POST' and form.validate_on_submit():
    updated_snippet = snippets.edit_snippet(snippet, index, payload)
    json_file.write_to_file(json.dumps(snippets.snippets))
    flash('Snippet updated successfully', category='success')
    return redirect(url_for('index', lang=updated_snippet['lang'], snippet_id=updated_snippet['id']))
  return render_template('edit.html', snippet=snippet, langs=langs, form=form)


@app.route('/snippet/remove/<id>', methods=['POST'])
@csrf.exempt
def remove_snippet(id):
  _, index = snippets.find_snippet_by_id(id)
  if index > -1:
    snippets.remove_snippet(index)
    flash('Snippet removed successfully', category='success')
    json_file.write_to_file(json.dumps(snippets.snippets))
    return redirect(url_for('index'))
  flash('Failed to remove snippet because it is not found', category='error')


@app.route('/snippets/search', methods=['GET'])
def search_snippets():
  keyword = request.args.get('q')
  found_snippets = snippets.search_snippets(keyword.lower()) if keyword else []
  return render_template('search.html', keyword=keyword, datetime=datetime, snippets=found_snippets, convert_to_lang_logo=convert_to_lang_logo, convert_to_prism_lang=convert_to_prism_lang)


if __name__ == '__main__':
  app.run(debug=True)
