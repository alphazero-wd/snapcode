class File:
  def __init__(self, filename):
    self.__filename = filename

  def write_to_file(self, data):
    with open(self.__filename, 'w') as f:
      f.write(data)
      f.close()

  def read_file(self):
    with open(self.__filename, 'r') as f:
      return f.read()
