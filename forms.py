from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, SelectField, SubmitField
from wtforms.validators import DataRequired, Length
from lang_convert import langs


class CreateSnippetForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(max=64)])
  description = TextAreaField('Description')
  lang = SelectField('Language', choices=langs, default="Text File")
  tags = StringField('Tags (separated by commas)')
  content = TextAreaField('Paste your snippet here')
  submit = SubmitField('Add snippet')

class EditSnippetForm(FlaskForm):
  title = StringField('Title', validators=[DataRequired(), Length(max=64)])
  description = TextAreaField('Description')
  lang = SelectField('Language', choices=langs)
  tags = StringField('Tags (separated by commas)')
  content = TextAreaField('Paste your snippet here')
  submit = SubmitField('Edit snippet')
