from datetime import datetime


def relative_time(date):
  def formatn(n, s):
    """Add "s" if it's plural"""

    if n == 1:
      return "1 %s" % s
    elif n > 1:
      return "%d %ss" % (n, s)

  def qnr(a, b):
    """Return quotient and remaining"""

    return a / b, a % b

  class FormatDelta:

    def __init__(self, dt):
      now = datetime.now()
      delta = now - dt
      self.day = delta.days
      self.second = delta.seconds
      self.year, self.day = qnr(self.day, 365)
      self.month, self.day = qnr(self.day, 30)
      self.hour, self.second = qnr(self.second, 3600)
      self.minute, self.second = qnr(self.second, 60)

    def format(self):
      for period in ['year', 'month', 'day', 'hour', 'minute', 'second']:
        n = getattr(self, period)
        if n >= 1:
          return '{0} ago'.format(formatn(n, period))
      return "just now"

  return FormatDelta(date).format()
