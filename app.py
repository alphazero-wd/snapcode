from datetime import datetime
from flask import Flask, flash, redirect, render_template, request, url_for
from flask_wtf import CSRFProtect
from file import File
from forms import CreateSnippetForm
from snippets import Snippets
from lang_convert import convert_to_lang_logo, convert_to_prism_lang, langs
import json

app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = 'afjalskdfjklq42348fmaklda,vmafj34lk409284'

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

  snippet = snippets.find_snippet_by_id(snippet_id)

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
  if form.validate_on_submit():
    snippets.add_snippet(payload)
    json_file.write_to_file(json.dumps(snippets.snippets))
    flash(f'Snippet created successfully')
    return redirect(url_for('index'))
  print(form.errors)
  return render_template('create.html', langs=langs, form=form)


if __name__ == '__main__':
  app.run(debug=True)
